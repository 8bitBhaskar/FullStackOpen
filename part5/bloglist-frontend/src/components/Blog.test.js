import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
    const blog = {
        title: 'title',
        author: 'author',
        url: 'https://www.url.com',
        likes: 0,
        user: {
            username: 'username',
            name: 'name',
        },
    }

    let component
    const mockHandler = jest.fn()

    beforeEach(() => {
        component = render(
            <Blog key={blog.id} blog={blog} updateLikes={mockHandler} />
        )
    })

    test('renders title and author but not url or likes', () => {
        expect(component.container.querySelector('.title')).toHaveTextContent(
            blog.title
        )
        expect(component.container.querySelector('.author')).toHaveTextContent(
            blog.author
        )
        expect(component.queryByText(blog.url)).not.toBeInTheDocument()
        expect(component.queryByText('like')).not.toBeInTheDocument()
    })

    test('children are not displayed in the start', () => {
        const details = component.container.querySelector('.blog-details')

        expect(details).toEqual(null)
    })

    test('renders blog details when view button is clicked', () => {
        const button = component.container.querySelector('button')
        fireEvent.click(button)

        const blogDetails = component.container.querySelector('.blog-details')
        expect(blogDetails).toBeInTheDocument()
    })

    test('if the like button is called twice, the event handler is also called twice', () => {
        const viewButton = component.getByText('show')
        fireEvent.click(viewButton)

        const likeButton = component.getByText('like')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})
