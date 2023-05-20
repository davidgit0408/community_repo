import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { getPostBySlug, getAllPosts, getRelatedTag } from '../../../script/api'
import { useRemarkSync } from 'react-remark'
import remarkGfm from 'remark-gfm'
import rehypeExternalLinks from 'rehype-external-links'
import toc from 'markdown-toc'
import { IconCalendar, IconClock } from '@tabler/icons-react'
import { NextSeo, ArticleJsonLd } from 'next-seo'
import dayjs from 'dayjs'
import { useSetSider } from '@/layout/Sider'
import Card from '@/components/Card'
import Tag from '@/components/ui/Tag'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import Toc from '@/components/Toc'
import rehypeFigure from 'rehype-figure'

type Props = {
  post: Post
  morePosts: Post[]
  preview?: boolean
}
const PostContent: React.FC<Props> = ({ post, relatedTags }) => {
  const reactContent = useRemarkSync(post.content, {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [rehypeExternalLinks, { target: '_blank' }],
      rehypeSlug,
      rehypeAutolinkHeadings,
      [rehypeFigure, , { className: 'blog-image-figure' }],
    ],
  })

  useSetSider(() => (
    <>
      <Card className="flex flex-col gap-2 items-start">
        {relatedTags.map((tag) => {
          return (
            <Tag key={tag.name} sup={tag.posts.length} name={tag.name}></Tag>
          )
        })}
      </Card>
      <Card className="sticky top-4 hidden lg:block">
        <Toc content={post.toc} />
      </Card>
    </>
  ))

  return (
    <>
      <NextSeo
        title={`${post.title} | ${process.env.BLOG.title}`}
        description={post.brief}
        canonical={`${process.env.BLOG.site}/posts/${post.slug}`}
      />
      <ArticleJsonLd
        type="BlogPosting"
        url={`${process.env.BLOG.site}/posts/${post.slug}`}
        title={process.env.BLOG.title}
        images={[]}
        datePublished="2020-01-01T08:00:00+08:00"
        dateModified={dayjs(post.ctime).format('YYYY-MM-DDTHH:mm:ssZZ')}
        authorName="Marsk"
        description={post.brief || post.title}
      />
      <article className="p-2">
        <header className="mb-4">
          <p className="text-center font-medium text-4xl">{post.title}</p>
          <div className="mt-2 flex justify-center text-xs items-center gap-4">
            <div className="flex gap-0.5 items-center">
              <IconCalendar size={12} />
              {post.date}, {new Date(post.ctime).getFullYear()}
            </div>
            <div className="flex gap-0.5 items-center">
              <IconClock size={12} />
              <span>约 {post.readingTime} 分钟</span>
            </div>
          </div>
        </header>
        <section className="markdown-body max-w-none dark:bg-[#1a1a1a]">
          {reactContent}
        </section>
      </article>
    </>
  )
}

const Post = (props: Props) => {
  const router = useRouter()
  if (!router.isFallback && !props.post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return <PostContent {...props} />
}

export default Post

type TagCountType = Record<string, number>
type Params = {
  params: {
    slug: string
    relatedTags: TagCountType
  }
}

export async function getStaticProps({ params }: Params) {
  const post = await getPostBySlug(params.slug)
  const tocContent = toc(post.content).content
  const relatedTags = await getRelatedTag(post.tags.map((tag) => tag.name))
  return {
    props: {
      post: {
        ...post,
        toc: tocContent,
      },
      relatedTags,
    },
  }
}

export async function getStaticPaths() {
  const posts = await getAllPosts()
  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
