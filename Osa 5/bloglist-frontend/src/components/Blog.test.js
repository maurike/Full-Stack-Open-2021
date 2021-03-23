import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        addLike={mockAddLike}
        removeBlog={mockRemoveBlog}
        user={user}
      />
    )
  })

  const blog = {
    author: 'Test Author',
    title: 'Test Title',
    url: 'http://test.url',
    likes: 0,
    user: {
      username: 'Test Username'
    }
  }

  const user = {
    username: 'Test Username',
    name: 'Test Name'
  }

  const mockAddLike = jest.fn()
  const mockRemoveBlog = jest.fn()

  test('5.13 - Render blog title and author by default, hide url and likes', () => {
    const visibleBlogContent = component.container.querySelector('.visibleBlogContent')
    const hiddenBlogContent = component.container.querySelector('.hiddenBlogContent')

    expect(hiddenBlogContent).toHaveStyle('display: none')
    expect(visibleBlogContent).not.toHaveStyle('display: none')
    expect(visibleBlogContent).toHaveTextContent(blog.title)
    expect(visibleBlogContent).toHaveTextContent(blog.author)
    expect(visibleBlogContent).not.toHaveTextContent(blog.url)
    expect(visibleBlogContent).not.toHaveTextContent(blog.likes)
  })

  test('5.14 - Show url and likes when "View" clicked', () => {
    const button = component.getByText('View')
    fireEvent.click(button)

    const visibleBlogContent = component.container.querySelector('.visibleBlogContent')
    const hiddenBlogContent = component.container.querySelector('.hiddenBlogContent')

    expect(hiddenBlogContent).not.toHaveStyle('display: none')
    expect(visibleBlogContent).toHaveStyle('display: none')
    expect(hiddenBlogContent).toHaveTextContent(blog.url)
    expect(hiddenBlogContent).toHaveTextContent(blog.likes)
  })

  test('5.15 - Clicking like 2 times calls event handler twice', () => {
    const button = component.getByText('Like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockAddLike.mock.calls).toHaveLength(2)
  })
})
