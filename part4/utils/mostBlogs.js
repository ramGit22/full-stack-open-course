const mostBlogs = (blogs) => {
  const maxBlogs = blogs.reduce((acc, blog) => {
    return acc.blogs > blog.blogs ? acc : blog
  }, blogs[0])
  return `${maxBlogs.author} has ${maxBlogs.blogs} blogs`
}
module.exports = { mostBlogs }
