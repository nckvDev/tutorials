const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    const blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('blogs', () => {
  test('blog are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('verifies that the unique identifier id', async () => {
    const  response = await api.get('/api/blogs')

    assert(response.body.every(blog => blog.id))
  })

  describe('addition of a new blogs', () => {
    test('successfully creates a new blog post', async () => {
      const newBlog = {
        title: 'String is easy',
        author: 'String Hello',
        url: 'String.com',
        likes: 9
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
      const blogLasted = blogsAtEnd.pop()
      // delete blogLasted.id
      // eslint-disable-next-line no-unused-vars
      const { id, ...blog } = blogLasted

      assert.deepStrictEqual(blog, newBlog)
    })

    test('the likes property is missing from the request, it will default to the value 0', async () => {
      const newBlog = {
        title: 'String likes property is missing',
        author: 'String Hello',
        url: 'likesIsMissing.com',
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      const lastBlog = blogsAtEnd.pop()

      assert.strictEqual(lastBlog.likes, 0)
    })

    test('that verify that if the title or url properties are missing from the request data', async () => {
      const newBlog = {
        author: 'String Hello',
        likes: 9
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
  })


  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

      const blogs = blogsAtEnd.map(r => r.title)
      assert(!blogs.includes(blogToDelete.title))
    })
  })

  describe('updated of a blog', () => {
    test('success with update data blog', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const blogUpdate = {
        title: 'React patterns update',
        author: 'Michael Chan Update',
        url: 'https://reactpatternsupdate.com/',
        likes: 10,
      }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogUpdate)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      const blogsFirst = blogsAtEnd[0]
      assert.deepStrictEqual(blogsFirst, { id: blogToUpdate.id, ...blogUpdate })
    })
  })

  after(async () => {
    await mongoose.connection.close()
  })
})