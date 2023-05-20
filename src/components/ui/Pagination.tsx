import Link from 'next/link'
import React, { useState } from 'react'
import { cx } from '@emotion/css'
import styled from '@emotion/styled'

type CellProps = {
  isCurrent?: boolean
  page: number
  disabled?: boolean
}
const Cell: React.FC<CellProps> = ({ isCurrent, page, children, disabled }) => {
  const comp = (
    <div
      className={cx(
        'inline-flex w-8 h-8 items-center border justify-center rounded-full border-gray-200',
        {
          'border-blue-300': isCurrent,
          'bg-blue-100': isCurrent,
          'text-blue-700': isCurrent,
          'cursor-pointer': !isCurrent,
          'hover:bg-blue-300': isCurrent,
        },
        disabled ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-300'
      )}
    >
      {children}
    </div>
  )
  if (disabled) {
    return comp
  }
  return (
    <Link href={{ pathname: '/page/[page]', query: { page } }}>
      {comp}
    </Link>
  )
}

type PaginationProps = {
  pageNum: number
  totalPage: number
  pageSize?: number
}
const Pagination: React.FC<PaginationProps> = ({
  pageNum = 1,
  totalPage,
  pageSize = 1,
}) => {
  const list = new Array(totalPage).fill('')
  const page = +pageNum
  return (
    <div className="flex gap-1">
      <Cell disabled={page === 1} page={page - 1}>
        -
      </Cell>
      {list.map((l, index) => {
        const isCurrent = index + 1 === page
        return (
          <Cell key={index} isCurrent={isCurrent} page={index + 1}>
            {index + 1}
          </Cell>
        )
      })}
      <Cell disabled={page === totalPage} page={page + 1}>
        +
      </Cell>
    </div>
  )
}

export default Pagination
