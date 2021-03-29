import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
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
    <Form onSubmit={handleAddBlog}>
      <Form.Group controlId='title'>
        <Form.Label>Title</Form.Label>
        <Form.Control type='text' value={title} onChange={handleTitleChange} />
      </Form.Group>
      <Form.Group controlId='author'>
        <Form.Label>Author</Form.Label>
        <Form.Control type='text' value={author} onChange={handleAuthorChange} />
      </Form.Group>
      <Form.Group controlId='url'>
        <Form.Label>Url</Form.Label>
        <Form.Control type='text' value={url} onChange={handleUrlChange} />
      </Form.Group>
      <Button variant='success' id='blog-button' type='submit'>
        Save
      </Button>
    </Form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm
