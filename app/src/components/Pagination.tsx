import React, { useEffect, useState, ChangeEvent } from 'react'
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import { EmotionComponentProps } from 'styles/theme'
import styled from '@emotion/styled'
import { Select } from '@chakra-ui/select'

type paginationProps = {
  total: number
  setPaginationInputs: (inputs: { page: number; itemsPerPage: number }) => void
  searchText: string
  filterClicked: boolean
}

type pageNumberProps = {
  active: boolean
} & EmotionComponentProps

export const PaginationContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;

  svg {
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
  border: ${(props) => (props.active ? `1px solid` : '')};
  border-color: ${({ theme }) => theme.text};
  margin-top: 0.7rem;
  font-size: 1rem;
  text-align: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 100%;

  &:hover {
    cursor: pointer;
  }
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
    if (total === 0) {
      setPageNumbers([1])
    }
  }, [total])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchText])

  useEffect(() => {
    if (filterClicked) {
      setCurrentPage(1)
    }
  }, [filterClicked])

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
        <HiChevronDoubleLeft size={20} />
      </ArrowButton>
      <ArrowButton
        disabled={currentPage === 1}
        onClick={() => pageChange(currentPage - 1)}
      >
        <RiArrowLeftSLine size={24} />
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
        <RiArrowRightSLine size={24} />
      </ArrowButton>
      <ArrowButton
        disabled={currentPage === pageNumbers.length}
        onClick={() => pageChange(pageNumbers.length)}
      >
        <HiChevronDoubleRight size={20} />
      </ArrowButton>
      <Select
        w="auto"
        size="sm"
        m={[2]}
        iconSize={'16'}
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
      </Select>
    </PaginationContainer>
  )
}
