import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { css, cx } from '@emotion/css'
import { IconBrandReact } from '@tabler/icons-react'

type MenuProps = {
  className?: string
}
const Menu: React.FC<MenuProps> = ({ className }) => {
  const router = useRouter()
  const menuItems = [
    {
      icon: <IconBrandReact size={16} />,
      pathname: '/lab',
      label: '实验室',
    },
  ]
  return (
    <nav className={cx(className, 'flex flex-col gap-2')}>
      {menuItems.map((item) => {
        const isActive = router.pathname === item.pathname
        return (
          <Link
            legacyBehavior
            passHref
            key={item.pathname}
            href={{
              pathname: isActive ? 'javascript:void(0)' : item.pathname,
            }}
          >
            <a
              className={cx(
                'relative',
                'flex items-center gap-2',
                'py-2 px-4',
                'font-semibold text-slate-700 dark:text-slate-200',
                'hover:after:absolute hover:after:w-0.5 hover:after:bg-stone-400 hover:after:h-4/5 hover:after:right-0',
                isActive &&
                  'after:absolute after:w-0.5 after:bg-stone-400 after:h-4/5 after:right-0'
              )}
            >
              {item.icon}
              {item.label}
            </a>
          </Link>
        )
      })}
    </nav>
  )
}

export default Menu
