import React from 'react'
import { range } from 'lodash'
import clsx from 'clsx'

interface Props {
  handleSubmit(page?: any): any
  currentPage: number
  total: number
  limitPagination: number
  rangeNumb: number
}

const Pagination = ({ currentPage, total, limitPagination, handleSubmit, rangeNumb }: Props) => {
  const calculatePagination = () => {
    let start = 1
    let end = rangeNumb
    const totalPage = Math.ceil(total / limitPagination)
    if (currentPage > 0 && currentPage <= 2) {
      start = 1
    } else if (currentPage > 2 && currentPage < totalPage - 2) {
      start = currentPage - 2
    } else {
      start = totalPage - 4
    }
    end = start + rangeNumb <= totalPage ? start + rangeNumb : totalPage
    start = start < 1 ? 1 : start
    return {
      start,
      end,
      totalPage
    }
  }

  const { start, end, totalPage } = calculatePagination()

  const handleClickPage = (page: number) => (e: any) => {
    e.preventDefault()
    handleSubmit(page)
  }

  if (totalPage === 1) {
    return null
  }

  return (
    <ul className={clsx("datatable__pager-nav")}>
      {currentPage > 1 &&
        <li className="nav-first">
          <a onClick={handleClickPage(currentPage - 1)} href="/">&nbsp;</a>
        </li>
      }
      {start > 1 &&
        <li ><a onClick={handleClickPage(1)} href="/">1</a></li>
      }
      {start > 2 &&
        <li><a onClick={e => e.preventDefault()} href="/">...</a></li>
      }
      {range(start, end + 1).map(numb =>
        numb === currentPage ? <li key={numb}>{numb}</li> : <li key={numb}><a onClick={handleClickPage(numb)} href="/">{numb}</a></li>
      )}
      {end < totalPage - 1 &&
          <li><a onClick={e => e.preventDefault()} href="/">...</a></li>
      }
      {end < totalPage &&
        <li ><a onClick={handleClickPage(totalPage)} href="/">{totalPage}</a></li>
      }
      {currentPage < totalPage &&
        <li className="nav-end">
           <a onClick={handleClickPage(currentPage + 1)} href="/">&nbsp;</a>
        </li>
      }
    </ul>
  )
}

export default Pagination
