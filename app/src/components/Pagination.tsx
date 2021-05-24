import React, { useEffect, useState, ChangeEvent } from 'react'
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import styled from '@emotion/styled'

type paginationProps = {
  total: number
  setPaginationInputs: (inputs: { page: number; itemsPerPage: number }) => void
  searchText: string
  filterClicked: boolean
}

type pageNumberProps = {
  active: boolean
}

export const PaginationContainer = styled.div`
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

export const ArrowButton = styled.button`
  background: none;
  border: none;
  padding: 0;

  &:hover {
    cursor: pointer;
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

const ItemsPerPageSelect = styled.select`
  width: 2.5rem;
  margin: 0.5rem;
`

export const Pagination = ({
  total,
  setPaginationInputs,
  searchText,
  filterClicked,
}: paginationProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const itemsPerPageNumbers = [10, 20, 30]
  const [pageNumbers, setPageNumbers] = useState<number[]>([1])

  useEffect(() => {
    if (total) {
      const totalPages = Math.ceil(total / itemsPerPage)
      let pageNumberArr: any = []
      for (let i = 1; i <= totalPages; i++) {
        pageNumberArr.push(i)
      }
      setPageNumbers(pageNumberArr)
    }
  }, [total])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchText, filterClicked])

  const pageChange = (page: number) => {
    setCurrentPage(page)
  }

  const itemsPerPageChange = (limit: any) => {
    const limitNumber = parseInt(limit, 10)
    setCurrentPage(1)
    setItemsPerPage(limitNumber)
  }

  useEffect(() => {
    setPaginationInputs({ page: currentPage, itemsPerPage: itemsPerPage })
  }, [currentPage, itemsPerPage])

  return (
    <PaginationContainer>
      <ArrowButton disabled={currentPage === 1} onClick={() => pageChange(1)}>
        <HiChevronDoubleLeft size={25} />
      </ArrowButton>
      <ArrowButton
        disabled={currentPage === 1}
        onClick={() => pageChange(currentPage - 1)}
      >
        <RiArrowLeftSLine size={30} />
      </ArrowButton>
      {pageNumbers?.map((page: number) => (
        <PageNumber
          key={page}
          active={page === currentPage}
          onClick={() => pageChange(page)}
        >
          {page}
        </PageNumber>
      ))}
      <ArrowButton
        disabled={currentPage === pageNumbers.length}
        onClick={() => pageChange(currentPage + 1)}
      >
        <RiArrowRightSLine size={30} />
      </ArrowButton>
      <ArrowButton
        disabled={currentPage === pageNumbers.length}
        onClick={() => pageChange(pageNumbers.length)}
      >
        <HiChevronDoubleRight size={25} />
      </ArrowButton>
      <ItemsPerPageSelect
        value={itemsPerPage}
        aria-label="items per page"
        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
          itemsPerPageChange(event.target.value)
        }
      >
        {itemsPerPageNumbers.map((num: number) => {
          return (
            <option key={num} value={num}>
              {num}
            </option>
          )
        })}
      </ItemsPerPageSelect>
    </PaginationContainer>
  )
}
