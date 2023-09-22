const mostBlogs = require('../utils/mostBlogs')

describe('author', () => {
  test('who has the largest amount of blogs including the number of blogs author has', () => {
    const blogs = [
      {
        author: 'Ramesh',
        blogs: 3,
      },
      {
        author: 'Anamika',
        blogs: 5,
      },
      {
        author: 'Shyam',
        blogs: 1,
      },
      { author: 'Hari', blogs: 3 },
    ]
    const result = mostBlogs.mostBlogs(blogs)
    expect(result).toBe('Anamika has 5 blogs')
  })
})
