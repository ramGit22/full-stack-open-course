const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return 'empty array'
  }
  let authorLikes = {}
  blogs.forEach((blog) => {
    if (authorLikes[blog.author]) {
      authorLikes[blog.author] += blog.likes
    } else {
      authorLikes[blog.author] = blog.likes
    }
  })

  const authorLikesArray = Object.entries(authorLikes)
  let maxLikes = 0
  let personWithMaxLikes = ''
  for (let i = 0; i < authorLikesArray.length; i++) {
    const [name, likes] = authorLikesArray[i]
    if (likes > maxLikes) {
      maxLikes = likes
      personWithMaxLikes = name
    }
  }
  return `${personWithMaxLikes} has ${maxLikes} total likes`
}

module.exports = { mostLikes }
