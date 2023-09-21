const totalLikes = (blogs) => {
  const totalLikes = blogs.reduce((acc, obj) => {
    return acc + obj.likes
  }, 0)
  return totalLikes
}
module.exports = { totalLikes }
