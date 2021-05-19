import React, { useEffect, useState } from 'react'
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

type displayProps = {
  displayed: boolean
  direction?: string
}

type paginationProps = {
  total: number
  setPaginationInputs: (inputs: { page: number; itemsPerPage: number }) => void
}

type pageNumberProps = {
  active: boolean
}

const isDisplayed = ({ displayed }: displayProps) => css`
  display: ${displayed ? 'flex' : 'none'};
`

export const PaginationContainer = styled.div<displayProps>`
  ${isDisplayed};
  position: relative;
  display: flex;
  justify-content: center;

  svg {
    margin-top: 0.4rem;

    &:hover {
      cursor: pointer;
    }
  }
`

export const Arrow = styled.div`
  font-size: 1.5rem;
  padding: 0.3rem;
  border: 1px solid black;

  &:hover {
    cursor: pointer;
  }
`

export const PageNumber = styled.div<pageNumberProps>`
  border: ${(props) => (props.active ? '1px solid black' : '')};
  margin-top: 0.3rem;
  font-size: 1.2rem;
  padding-top: 0.1rem;
  text-align: center;
  width: 2rem;
  height: 2rem;
  border-radius: 100%;

  &:hover {
    cursor: pointer;
  }
`

export const Pagination = ({ total, setPaginationInputs }: paginationProps) => {
  console.log('TOTAL: ', total)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [totalItems, setTotalItems] = useState()
  const [pageNumbers, setPageNumbers] = useState<number[]>()

  useEffect(() => {
    if (total >= 5) {
      const totalPages = Math.ceil(total / itemsPerPage)
      let pageNumberArr = []
      for (let i = 1; i <= totalPages; i++) {
        pageNumberArr.push(i)
      }
      setPageNumbers(pageNumberArr)
    }
  }, [total])

  const pageChange = (page: number) => {
    // setCurrentPage((prev: any) => prev - 1)
    setCurrentPage(page)
    // setCurrentPage((prev: any) => prev + 1)
  }

  useEffect(() => {
    setPaginationInputs({ page: currentPage, itemsPerPage: itemsPerPage })
  }, [currentPage])

  return (
    <PaginationContainer displayed={total >= 5}>
      <RiArrowLeftSLine onClick={() => pageChange(currentPage - 1)} size={30} />
      {pageNumbers?.map((page: number) => (
        <PageNumber
          active={page === currentPage}
          onClick={() => pageChange(page)}
        >
          {page}
        </PageNumber>
      ))}
      <RiArrowRightSLine
        onClick={() => pageChange(currentPage + 1)}
        size={30}
      />
    </PaginationContainer>
  )
}
