const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.get('/:id', async  (request, response, next) => {
    const blog = await Blog.findById(request.params.id).catch(error => next(error))
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

blogsRouter.post('/', async  (request, response, next) => {
  const body = request.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })
  if (body.title == null && body.url == null)
  {
    response.status(400).end()
    return
  }
  await blog.save().catch(error => next(error))
  response.json(blog)
})

blogsRouter.delete('/:id', async  (request, response, next) => {
  await Blog.findByIdAndRemove(request.params.id).catch(error => next(error))
    response.status(204).end()
})

blogsRouter.put('/:id', async  (request, response, next) => {
  const body = request.body
  const blog = {
    author: body.author,
    likes: body.likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).catch(error => next(error))
  response.json(updatedBlog)
})

module.exports = blogsRouter