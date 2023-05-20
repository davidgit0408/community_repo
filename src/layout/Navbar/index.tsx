import React, { useState } from 'react'
import { css, cx } from '@emotion/css'
import Menu from '@/layout/Navbar/Menu'
import Link from 'next/link'
import { useDarkMode } from '@/hooks'
import { IconMoon, IconSun } from '@tabler/icons-react'

type HeaderProps = {
  className?: string
}

const Navbar: React.FC<HeaderProps> = ({ className }) => {
  const darkMode = useDarkMode()
  return (
    <header
      className={cx(
        'flex flex-shrink-0 p-4 sticky',
        'rounded',
        'shadow-[0px_0px_20px_0px_#e2e8f0]',
        'dark:shadow-stone-700',
        'lg:flex-col lg:w-44 lg:top-4'
      )}
    >
      <Link legacyBehavior passHref href={{ pathname: '/' }}>
        <a
          className={cx(
            'dark:text-slate-200 font-medium text-xl text-gray-800 cursor-pointer flex',
            'mr-auto items-center text-2xl',
            'lg:mx-auto lg:mb-6'
          )}
        >
          ✨Hea✨
        </a>
      </Link>
      <Menu />
      <div className="h-px my-4 bg-stone-200" />
      <div
        className="cursor-pointer px-4 flex items-center gap-2"
        onClick={darkMode.toggle}
      >
        {darkMode.isDark ? (
          <>
            <IconMoon size={14} /> 深色
          </>
        ) : (
          <>
            <IconSun size={14} /> 浅色
          </>
        )}
      </div>
    </header>
  )
}

export default Navbar
