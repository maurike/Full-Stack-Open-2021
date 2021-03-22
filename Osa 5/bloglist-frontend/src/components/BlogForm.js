import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleAddBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <form onSubmit={handleAddBlog}>
        Title: <input value={title} onChange={handleTitleChange} />
        <br />
        Author: <input value={author} onChange={handleAuthorChange} />
        <br />
        Url: <input value={url} onChange={handleUrlChange} />
        <br />
        <br />
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm
