import React from 'react'

const NewBlog = ({
  handleSubmit,
  handleAuthorChange,
  handleTitleChange,
  handleUrlChange,
  author,
  title,
  url,
  createBlog,
  // dummy
  }) => {
  // const dummyCreate = () => {
  //   dummy({
  //     author: author
  //   })
  // }
  return (
    <form onSubmit={createBlog}>
    <div>
      title
        <input
        id="title"
        type="text"
        value={title}
        name="Title"
        onChange={handleTitleChange}
      />
    </div>
    <div>
      author
        <input
        id ="author"
        type="text"
        value={author}
        name="Author"
        onChange={handleAuthorChange}
      />
    </div>
    <div>
      url
        <input
        id="url"
        type="text"
        value={url}
        name="Url"
        onChange={handleUrlChange}
      />
    </div>
  <button id="createBlog" type="submit">create</button>
</form>      
  )
}

export default NewBlog