import React, { useState } from 'react'

type FooterProps = {}
const year = new Date().getFullYear()
const Footer: React.FC<FooterProps> = () => {
  return (
    <div className="text-center text-xs text-gray-400 my-4">
      © 2021 - {year} {process.env.BLOG.title}. Powered by Next.js. Hosted on GitHub.
    </div>
  )
}

export default Footer
