import fs from 'node:fs/promises'
import { join } from 'path'
import matter from 'gray-matter'
import dayjs from 'dayjs'
import rt from 'reading-time'
import { keystoneContext as context } from './context'

// TODO: 区分 blog 和 lab

const query = context.query

const postsDirectory = join(process.cwd(), '_posts')
export const pageSize = 2

/**
 * @description 获取文章文件名
 */
export async function getPostSlugs() {
  return await fs.readdir(postsDirectory)
}

export async function getPostBySlug(slug: string) {
  const post = await query.Post.findOne({
    where: { slug },
    query:
      'slug title tags { name } category { name } ctime date content prev next readingTime brief',
  })
  return post
}

export async function getRelatedTag(tags: string[]) {
  const relatedTags = await query.Tag.findMany({
    where: { name: { in: tags } },
    query: 'name posts { slug }',
  })
  return relatedTags
}
type Mutable<T> = {
  -readonly [K in keyof T]: T[K]
}
export async function getAllPosts(options?: { range: string }) {
  const filter: Mutable<Parameters<typeof query.Post.findMany>[0]> = {}

  if (options) {
    if (options.range === 'latest') {
      filter.take = 20
    } else {
      const gte = new Date(`${options.range}-01-01 00:00:00`).getTime()
      const lte = new Date(`${options.range}-12-31 23:59:59`).getTime()
      filter.where = { ctime: { gte, lte } }
    }
  }
  const posts = await query.Post.findMany({
    ...filter,
    orderBy: [{ ctime: 'desc' }],
    query: 'slug title tags { name } ctime date brief readingTime',
  })
  return posts
}
// FIXME: 无法使用外层变量，https://github.com/vercel/next.js/issues/10933
export const common = {}

export async function getAllTags() {
  const tags = await query.Tag.findMany({
    query: 'name posts { title slug }',
  })
  return tags
}

export async function getTags() {
  const _tags = await query.Tag.findMany({
    query: 'name postsCount',
  })
  return Array.from(_tags).sort((a, b) => a.postCount - b.postCount)
}

export async function getCategories() {
  const _categories = await query.Category.findMany({
    query: 'name posts { title slug } postsCount',
  })
  const categories = _categories.map(({ name, posts }) => ({
    name,
    posts,
    count: posts.length,
  }))
  return categories
}

export async function getYears() {
  const ctimeArray = await query.Post.findMany({
    query: 'ctime',
  })
  let years: number[] = []
  ctimeArray.map(({ ctime }) => {
    years.push(new Date(+ctime).getFullYear())
  })
  years = [...new Set(years)]
  years.sort((a, b) => a - b)
  return years
}
