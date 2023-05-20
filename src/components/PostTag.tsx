import React, { useState } from 'react'
import Link from 'next/link'
import { cx } from '@emotion/css'
import { IconTag } from '@tabler/icons-react'

type PostTagProps = {
  tag: string
}
const PostTag: React.FC<PostTagProps> = ({ tag }) => {
  return (
    <Link href={`/tags#${tag}`} >
      <div className="text-xs flex items-center gap-0.5 cursor-pointer">
        <IconTag size={12} />
        {tag}
      </div>
    </Link>
  )
}

export default PostTag
