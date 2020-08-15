import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import Togglable from './Togglable'
import NewBlog from './NewBlog'
import '@testing-library/jest-dom/extend-expect'
// test('renders content', () => {
// const test1 = blogComponent.container.querySelector('.author')
// expect(test1).toBeDefined()
// const test2 = blogComponent.container.querySelector('.title')
// expect(test2).toBeDefined()
// //   const test3 = component.container.querySelector('.uri')
// //   expect(test3).toBeNull()
// //   const test4 = component.container.querySelector('.likes')
// //   expect(test4).toBeNull()
// })
// test('after clicking the button, children are displayed', () => {
//     const blog = {
//         author: 'Khoi',
//         title: 'dkmm',
//         uri: 'dfdfd',
//         likes: 4,
//         userId: "5f3351d9845bc685208daf61"
//     }
//     const component = render(
//         <Togglable buttonLabel="reveal">
//         </Togglable>
//     )
//     const blogComponent = render(
//         <Blog blog={blog}/>
//     )
//     const button = component.getByText('reveal')
//     fireEvent.click(button)
//     const div = blogComponent.container.querySelector('.author')
//     expect(div).not.toHaveStyle('display: none')
//     const div2 = blogComponent.container.querySelector('.uri')
//     expect(div2).not.toHaveStyle('display: none')
// })

// test('after clicking the button, children are displayed', () => { // must change the eventHandler in Blog.js to Liked
//     const blog = {
//         author: 'Khoi',
//         title: 'dkmm',
//         uri: 'dfdfd',
//         likes: 4,
//         userId: "5f3351d9845bc685208daf61"
//     }
//     const component = render(
//         <Togglable buttonLabel="view">
//         </Togglable>
//     )
//     const mockHandler = jest.fn()
//     const blogComponent = render(
//         <Blog blog={blog} liked={mockHandler} />
//     )
//     const button = component.getByText('likes')
//     fireEvent.click(button)
//     fireEvent.click(button)
//     expect(mockHandler.mock.calls).toHaveLength(2)
// })
// test('after clicking the button, children are displayed', () => { // must change the eventHandler in Blog.js to Liked
//     const component = render(
//         <Togglable buttonLabel="view">
//         </Togglable>
//     )
//     const create = jest.fn()
//     const newBlog = render(
//         <NewBlog dummy = {create}/>
//     )
//     const input = newBlog.container.querySelector('.author')
//     const form = newBlog.container.querySelector('form')
//     fireEvent.change(input, { 
//     target: { value: 'testing of forms could be easier' } 
//     })
//     fireEvent.submit(form)
//     expect(create.mock.calls).toHaveLength(1)
//     expect(create.mock.calls[0][0].author).toBe('testing of forms could be easier' )
// })