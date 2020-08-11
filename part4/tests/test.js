// const listHelper = require('../utils/list_helper')
// test('dummy returns one', () => {
//   const blogs = []

//   const result = listHelper.dummy(blogs)
//   expect(result).toBe(1)
// })

// describe('total likes', () => {
//     const listWithOneBlog = [
//       {
//         _id: '5a422aa71b54a676234d17f8',
//         title: 'Go To Statement Considered Harmful',
//         author: 'Edsger W. Dijkstra',
//         url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//         likes: 5,
//         __v: 0
//       }
//     ]
  
//     test('when list has only one blog equals the likes of that', () => {
//       const result = listHelper.totalLikes(listWithOneBlog)
//       expect(result).toBe(5)
//     })
//   })
//   describe('favoriteBlog', () => {
//     const list = [
//       {
//         _id: '5a422aa71b54a676234d17f8',
//         title: 'Go To Statement Considered Harmful',
//         author: 'Edsger W. Dijkstra',
//         url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//         likes: 5,
//         __v: 0
//       },
//       {
//         title: "Canonical string reduction",
//         author: "Edsger W. Dijkstra",
//         likes: 12
//       }
//     ]
//     const blog = {
//         title: "Canonical string reduction",
//         author: "Edsger W. Dijkstra",
//         likes: 12
//     }
//     test('when list has only one blog equals the likes of that', () => {
//       const result = listHelper.favoriteBlog(list)
//       expect(result).toEqual(blog)
//     })
//   })
//   describe('mostBlogs', () => {
//     const list = [
//       {
//         _id: '5a422aa71b54a676234d17f8',
//         title: 'Go To Statement Considered Harmful',
//         author: 'Robert C. Martin',
//         url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//         likes: 5,
//         __v: 0
//       },
//       {
//         title: "Canonical string reduction",
//         author: "Edsger W. Dijkstra",
//         likes: 12
//       },
//       {
//         title: "Canonical string reduction",
//         author: "Robert C. Martin",
//         likes: 12
//       }
//     ]
//     const result = {
//         author: "Robert C. Martin",
//         blogs: 2
//     }
//     test('', () => {
//       const res = listHelper.mostBlogs(list)
//       expect(res).toEqual(result)
//     })
//   })
//   describe('mostLikes', () => {
//     const list = [
//       {
//         _id: '5a422aa71b54a676234d17f8',
//         title: 'Go To Statement Considered Harmful',
//         author: 'Robert C. Martin',
//         url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
//         likes: 10,
//         __v: 0
//       },
//       {
//         title: "Canonical string reduction",
//         author: "Edsger W. Dijkstra",
//         likes: 8
//       },
//       {
//         title: "Canonical string reduction",
//         author: "Edsger W. Dijkstra",
//         likes: 9
//       }
//     ]
//     const result = {
//         author: "Edsger W. Dijkstra",
//         likes: 17
//     }
//     test('', () => {
//       const res = listHelper.mostLikes(list)
//       expect(res).toEqual(result)
//     })
//   })

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
test('blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    expect(response.body).toHaveLength(25)
})
test('blogs are returned as json', async () => {
    const res = await api.get('/api/blogs')
    const length = res.body.length
    const blog = {
        "title": 'wth',
        "author": 'wth',
        "url": 'dd',
        "likes": 4
    }
    await api
      .post('/api/blogs').send(blog)
    const response = await api
        .get('/api/blogs')
    expect(response.body).toHaveLength(length + 1)
})
test('blogs are returned as json', async () => {
    const blog = {
        "title": 'wth',
        "author": 'wth',
        "url": 'wth',
    }
    const response = await api.post('/api/blogs').send(blog)
    expect(response.body.likes).toBe(0)
})
test('blogs are returned as json', async () => {
    const blog = {
        "author": 'wth',
    }
    const response = await api.post('/api/blogs').send(blog)
    expect(response.status).toBe(400)
})
test('blogs are returned as json', async () => {
    const blog = {
        "title": 'wth',
        "author": 'wth',
        "url": 'vl'
    }
    const response = await api.post('/api/blogs').send(blog)
    expect(response.body._id).toBeDefined();    
})

afterAll(() => {
  mongoose.connection.close()
})