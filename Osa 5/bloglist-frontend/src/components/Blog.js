import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLike, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleAddLike = () => {
    addLike({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    })
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title}?`)) {
      removeBlog({
        id: blog.id
      })
    }
  }

  const showIfCreator = (id) => {
    //const user = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))

    if (user.username === id) {
      return <button onClick={handleRemove}>Remove</button>
    }
  }

  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    background: '#F2F2F2'
  }

  return (
    <div style={blogStyle} className='blog'>
      <div style={hideWhenVisible} className='visibleBlogContent'>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>View</button>
      </div>
      <div style={showWhenVisible} className='hiddenBlogContent'>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>Hide</button>
        <br />
        {blog.url}
        <br />
        likes {blog.likes} <button onClick={handleAddLike}>Like</button>
        <br />
        {blog.user.username}
        <br />
        {showIfCreator(blog.user.username)}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog
