import React from 'react'
import PropTypes from 'prop-types'
import { Accordion, Card, Button } from 'react-bootstrap'

const Blog = ({ blog, addLike, removeBlog, user }) => {
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
    if (user.username === id) {
      return (
        <Button
          className='float-right mr-1 mb-4'
          variant='danger'
          id='remove-button'
          onClick={handleRemove}
        >
          Remove
        </Button>
      )
    }
  }

  return (
    <Accordion>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey='0'>
          {blog.title} - {blog.author}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey='0'>
          <Card.Body>
            <div className='container'>
              <div className='row'>
                <div className='col-2'>Title:</div>
                <div className='col-2'>{blog.title}</div>
              </div>
              <div className='row'>
                <div className='col-2'>Author:</div>
                <div className='col-2'>{blog.author}</div>
              </div>
              <div className='row'>
                <div className='col-2'>Url:</div>
                <div className='col-2'>{blog.url}</div>
              </div>
              <div className='row'>
                <div className='col-2'>Likes:</div>
                <div className='col-2'>{blog.likes}</div>
                <div className='col-sm'>
                  {' '}
                  <Button id='like-button' onClick={handleAddLike}>
                    Like
                  </Button>
                </div>
              </div>
              <div className='row'>
                <div className='col-2'>Creator:</div>
                <div className='col-2'>{blog.user.username}</div>
              </div>
            </div>
            {showIfCreator(blog.user.username)}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog
