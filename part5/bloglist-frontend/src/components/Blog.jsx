import { useState } from 'react'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const [showView, setshowView] = useState(false)
  const handleShow = () => {
    setshowView(!showView)
    setbuttonName('hide')
  }

  return (
    <div style={blogStyle}>
      {blog.title}{' '}
      <button onClick={handleShow}>{showView ? 'hide' : 'view'}</button>
      <br />
      {showView ? (
        <div>
          {' '}
          {blog.url} <br />
          {blog.likes} <button>like</button>
          <br />
          {blog.author}
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
export default Blog
