import React, { useState } from 'react'
import { cx, css } from '@emotion/css'
import type { ReactNode } from 'react'

type CardProps = Partial<{
  className: string
  title: ReactNode
}>

const Card: React.FC<CardProps> = ({ title, children, className }) => {
  const haveTitle = Boolean(title)
  return (
    <section
      className={cx(
        'rounded shadow-[0px_0px_20px_0px_#e2e8f0] border-opacity-10 bg-[#fefefe]',
        'dark:bg-[#1a1a1a] dark:shadow-stone-700',
        {
          'p-4': !haveTitle,
        },
        className
      )}
    >
      {haveTitle && (
        <header className="border-b p-3 text-xl font-bold">{title}</header>
      )}
      {children}
    </section>
  )
}

export default Card
