const favouriteBlog = (blogs) => {
  const mostLiked = blogs.reduce((acc, blog) => {
    return blog.likes > acc.likes ? blog : acc
  }, blogs[0])

  return mostLiked
}

module.exports = { favouriteBlog }
