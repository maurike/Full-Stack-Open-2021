import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState('')
  const [messageStatus, setMessageStatus] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      getBlogs()
    }
  }, [])

  const getBlogs = async () => {
    let blogs = await blogService.getAll()
    blogs.sort((a, b) => (a.likes >= b.likes ? -1 : 1))
    setBlogs(blogs)
  }

  const handleLogin = async (loginObject) => {
    try {
      const user = await loginService.login(loginObject)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      getBlogs()
      handleMessage('Login successful', 'success')
    } catch (exception) {
      handleMessage('Invalid username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setBlogs([])
    handleMessage('Logout successful', 'success')
  }

  const handleAddBlog = async (blogObject) => {
    await blogService.create(blogObject)
    getBlogs()
    blogFormRef.current.toggleVisibility()
    handleMessage(`Blog ${blogObject.title} created by ${user.username}`, 'success')
  }

  const handleAddLike = async (blogObject) => {
    await blogService.update(blogObject)
    getBlogs()
  }

  const handleRemove = async ({ id }) => {
    await blogService.deleteId(id)
    getBlogs()
  }

  const handleMessage = (message, status) => {
    setMessage(message)
    setMessageStatus(status)
    setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  const blogFormRef = useRef()

  return (
    <div>
      <h1>List of blogs</h1>
      <Notification message={message} status={messageStatus} />

      {user === null ? (
        <Togglable buttonLabel='Login'>
          <LoginForm login={handleLogin} />
        </Togglable>
      ) : (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>Logout</button>

          <h2>Blogs</h2>
          <Togglable buttonLabel='New blog' ref={blogFormRef}>
            <BlogForm createBlog={handleAddBlog} />
          </Togglable>
          <br />
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              addLike={handleAddLike}
              removeBlog={handleRemove}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
