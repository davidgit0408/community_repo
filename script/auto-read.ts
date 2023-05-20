import { keystoneContext as context } from './context'
import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
dayjs.extend(advancedFormat)

async function walk(dir: string) {
  let filesInfo = await fs.readdir(dir)
  const files = await Promise.all(
    filesInfo.map(async (name) => {
      const filePath = path.join(dir, name)
      const stats = await fs.stat(filePath)
      if (stats.isDirectory()) {
        return walk(filePath)
      } else if (stats.isFile()) {
        if (path.extname(filePath) !== '.md') {
          return false
        }
        const rawContent = await fs.readFile(filePath, { encoding: 'utf8' })
        const destination = path.resolve(__dirname, '../_posts_archive', name)
        filePaths.push([filePath, destination])
        const data = matter(rawContent)
        const { created_date, updated_date, tags, category, title, slug } = data.data
        let ctime = 0
        let date = ''
        if (created_date) {
          const day = dayjs(created_date, 'YYYY-MM-DD HH:mm')
          ctime = day.valueOf()
          date = day.format('MMM DD')
        }
        return {
          title,
          tags,
          category,
          slug,
          content: data.content,
          ctime,
          date
        }
      }
    })
  )

  return files.flat()
}

let filePaths: Array<[string, string]> = []

async function main() {
  filePaths = []
  let files = await walk(path.resolve(__dirname, '../_posts'))
  files = files.filter(Boolean)
  console.log(`${files.length} files are precessing...`)
  let tags: string[] = []
  files.forEach((file) => {
    file.tags && file.tags.length && tags.push(...file.tags)
  })
  tags = [...new Set(tags)]
  const tagMap: Record<string, string> = {}
  for (let i = 0; i < tags.length; ++i) {
    const existId = await context.query.Tag.findMany({
      where: { name: { equals: tags[i] } },
      query: 'id',
    })
    if (existId.length === 1) {
      tagMap[tags[i]] = existId[0].id
    } else {
      const { id } = await context.query.Tag.createOne({
        data: { name: tags[i] },
        query: 'id',
      })
      tagMap[tags[i]] = id
    }
  }
  let categories: string[] = []
  files.forEach((file) => {
    file.category && categories.push(file.category)
  })
  categories = [...new Set(categories)]
  const categoryMap: Record<string, string> = {}
  for (let i = 0; i < categories.length; ++i) {
    const existId = await context.query.Category.findMany({
      where: { name: { equals: categories[i] } },
      query: 'id',
    })
    if (existId.length === 1) {
      categoryMap[categories[i]] = existId[0].id
    } else {
      const { id } = await context.query.Category.createOne({
        data: { name: categories[i] },
        query: 'id',
      })

      categoryMap[categories[i]] = id
    }
  }
  await Promise.all(
    files.map(async (file) => {
      const { tags, category } = file
      file.tags = {}
      tags.forEach((tag) => {
        if (!file.tags.connect) {
          file.tags.connect = []
        }
        file.tags.connect.push({
          id: tagMap[tag],
        })
      })
      if (category) {
        file.category = { connect: { id: categoryMap[category] } }
      }
    })
  )
  await context.query.Post.createMany({ data: files })
  await Promise.all(
    filePaths.map(([origin, destination]) => {
      return fs.rename(origin, destination)
    })
  )
  console.log(`All Done!`)
}

main()
