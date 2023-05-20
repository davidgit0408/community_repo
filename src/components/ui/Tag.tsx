import { cx } from '@emotion/css'
import Link from 'next/link'
import React from 'react'

type TagProps = {
  sup: string | number
  name: string
}
const Tag: React.FC<TagProps> = ({ sup, name }) => {
  return (
    <Link href={`/tags#${name}`} legacyBehavior passHref>
      <a
        className={cx(
          'text-xs rounded-full py-1.5 px-3 font-medium ',
          'bg-stone-50 dark:bg-stone-900',
          'hover:bg-stone-200, dark:hover:bg-stone-700'
        )}
      >
        {name}
        <sup className="ml-1">{sup}</sup>
      </a>
    </Link>
  )
}

export default Tag
