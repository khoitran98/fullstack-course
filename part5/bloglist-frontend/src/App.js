import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'
import NewBlog from './components/NewBlog'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null) 
  const [user, setUser] = useState(null)
  const [logged, setLogged] = useState(false)

  useEffect(() => {
      const fetch = async() => {
        const blogs = await blogService.getAll()
        const sorted = [...blogs].sort((a,b) => b.likes - a.likes)
        setBlogs(sorted)
      }
      fetch()
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      setLogged(true)
    }
    else {
      const usr = {'name': 'unknown'}
      setUser(usr)
    }
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setLogged(true)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage(`wrong username or password`)
      setTimeout(() => {
        setErrorMessage(null)
    }, 5000)
      // ...
    }
  }
  const createBlog = async (event) => {
    event.preventDefault()
    try {
      const blog = await blogService.create({
        "title": title,
        "author": author,
        "url": url,
        "userId": "5f3351d9845bc685208daf61"
      })
      const blogs = await blogService.getAll()
      setAuthor('')
      setTitle('')
      setUrl('')
      setBlogs( blogs )
      setErrorMessage(`'${user.name}' added a new blog '${title}'`)
      setTimeout(() => {
        setErrorMessage(null)
    }, 5000)
    } catch (exception) {
      // ...
    }
  }
  const remove = async (id) => {
    if (!window.confirm("Delete this blog?"))
      return
    try{
    const response = await blogService.del(id)
    console.log(response)
    const blgs = await blogService.getAll()
    const sorted = [...blgs].sort((a,b) => b.likes - a.likes)
    console.log(sorted)
    setBlogs(sorted)
    }
    catch(exception) {
      console.log(exception.data)
    }

  }
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          id="username"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login" type="submit">login</button>
    </form>      
  )
  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload(true)
  }

  // const noteForm = () => (
  //   <form onSubmit={addNote}>
  //     <input
  //       value={newNote}
  //       onChange={handleNoteChange}
  //     />
  //     <button type="submit">save</button>
  //   </form>  
  // )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      {!logged ?
      loginForm() :
      <div>
        <p>{user.name} logged-in</p>
        <button onClick={logout}> logout </button>
        {/* {noteForm()} */}
        <Togglable buttonLabel="new blog">
          <NewBlog
            title={title}
            author={author}
            url={url}
            handleAuthorChange={({ target }) => setAuthor(target.value)}
            handleTitleChange={({ target }) => setTitle(target.value)}
            handleUrlChange={({ target }) => setUrl(target.value)}
            createBlog={createBlog}
          />
        </Togglable>
    </div>
    }
      {blogs.map(blog =>
        <Blog key={blog._id} blog={blog} remove={remove} user={user} setBlogs = {setBlogs} />
      )}
    </div>
  )
}

export default App