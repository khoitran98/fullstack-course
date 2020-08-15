import React, { useEffect }  from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'
const Blog = ({ blog,user,remove,setBlogs}) => {
  const like = async (event) => {
    const newLike = {'likes': blog.likes + 1, 'author': blog.author, 'uri': blog.uri }
    const updated = await blogService.update(blog._id, newLike)
    const fetch = async() => {
      const blogs = await blogService.getAll()
      const sorted = [...blogs].sort((a,b) => b.likes - a.likes)
      setBlogs(sorted)
    }
    fetch()
  }
  const removeButton = () => (
    <button onClick = {() => remove(blog._id)}> remove </button>
  )
  return (
    <div className="blog">
      <div className="title"> {blog.title} </div>
      <Togglable buttonLabel="view">
      <div className="author"> author: {blog.author} </div> 
      <div className="likes"> likes: {blog.likes} <button onClick={like}> likes </button></div>
      <div className="uri"> uri: {blog.uri} </div>
      {user.username === blog.user.username ? removeButton() : <div></div> }
      </Togglable>
    </div>
  )
}

export default Blog
