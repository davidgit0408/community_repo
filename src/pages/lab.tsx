import { getAllPosts, getTags, getYears } from '@script/api'
import Card from '@/components/Card'
import { NextSeo } from 'next-seo'

export type PageProps = {
  allPosts: Post[]
  years: number[]
  tags: Array<{ name: string; postsCount: number }>
}

const Lab: React.FC<PageProps> = ({ allPosts, years, tags }) => {
  return (
    <>
      <NextSeo
        title={process.env.BLOG.title}
        description="尝试新技术，新功能"
        canonical={`${process.env.BLOG.site}/posts/lab`}
      />
      <Card>lab</Card>
    </>
  )
}

export default Lab

export const getStaticProps = async ({ params = {} }) => {
  const { year = 'latest' } = params
  const [allPosts, tags, years] = await Promise.all([
    getAllPosts({ range: year }),
    getTags(),
    getYears(),
  ])

  return {
    props: { allPosts, tags, years },
  }
}
