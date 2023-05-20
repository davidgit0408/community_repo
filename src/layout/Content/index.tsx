import React, { useState } from 'react'
import Card from '@/components/Card'

type ContentProps = {}
const Content: React.FC<ContentProps> = ({ children }) => {
  return <section>{children}</section>
}

export default Content
