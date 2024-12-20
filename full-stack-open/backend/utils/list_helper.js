// const logger = require('../utils/logger')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  // logger.info(blogs)
  const sum = (cur, acc) => {
    return cur + acc.likes
  }
  return blogs.length === 0 ? 0 : blogs.reduce(sum, 0)
}

const favoriteBlog = (blogs) => {
  const getMax = blogs.reduce((cur, acc) => {
    return Math.max(cur, acc.likes)
  }, 0)

  const myFavorite = blogs.filter(blog => blog.likes === getMax).map(blog => ({
    title: blog.title,
    author: blog.author,
    likes: blog.likes
  }))[0]

  return myFavorite
}

const mostBlogs = (blogs) => {
  const countBlogs = blogs.reduce((acc, cur) => {
    acc[cur.author] = (acc[cur.author] || 0) + 1
    return acc
  }, {})

  let nameAuthor = ''
  let maxCount = 0
  for(const [name, count] of Object.entries(countBlogs)) {
    if (count > maxCount) {
      maxCount = count
      nameAuthor = name
    }
  }

  return { author: nameAuthor, blogs: maxCount }
}

/**
 *
 * @param { Array } blogs
 */
const mostLikes = (blogs) => {
  const countLikes = blogs.reduce((acc, cur) => {
    acc[cur.author] = (acc[cur.author] || 0) + cur.likes
    return acc
  }, {})

  let nameAuthor = ''
  let maxCount = 0
  for(const [name, count] of Object.entries(countLikes)) {
    if (count > maxCount) {
      maxCount = count
      nameAuthor = name
    }
  }

  return { author: nameAuthor, likes: maxCount }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}