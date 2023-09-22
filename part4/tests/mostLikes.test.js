const mostLikes = require('../utils/mostLikes')

describe('mostLikes function', () => {
  test('should return the author with the largest amount of likes', () => {
    const blogs = [
      {
        author: 'Ramesh',
        likes: 3,
      },
      {
        author: 'Anamika',
        likes: 5,
      },
      {
        author: 'Shyam',
        likes: 1,
      },
      {
        author: 'Hari',
        likes: 30,
      },
      {
        author: 'Anamika',
        likes: 10,
      },
    ]
    const result = mostLikes.mostLikes(blogs)
    expect(result).toEqual('Hari has 30 total likes')
  })

  test('should return empty string when array is empty', () => {
    const blogs = []
    const result = mostLikes.mostLikes(blogs)
    expect(result).toEqual('empty array')
  })
})
