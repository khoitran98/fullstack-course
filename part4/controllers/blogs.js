const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
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

// const getTokenFrom = request => {
//     const authorization = request.get('authorization')
//     if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//       return authorization.substring(7)
//     }
//     return null
// }
blogsRouter.post('/', async  (request, response, next) => {
  const body = request.body
  if (!request.token) {
    return response.status(401).json({ error: 'token missing or invalid' })
    }
const decodedToken = jwt.verify(request.token, process.env.SECRET)
if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
}
  const user = await User.findById(body.userId)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })
  if (body.title == null && body.url == null)
  {
    response.status(400).end()
    return
  }
  const savedBlog = await blog.save().catch(error => next(error))
  response.json(blog)
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
})

blogsRouter.delete('/:id', async  (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    let userid = decodedToken.id
    const blog = await Blog.findById(request.params.id).catch(error => next(error))
    if (!(blog.user.toString() === userid.toString()))
    {
        return response.status(401).json({ error: 'user is not the blog author' })
    }
    await Blog.findByIdAndDelete(request.params.id).catch(error => next(error))
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