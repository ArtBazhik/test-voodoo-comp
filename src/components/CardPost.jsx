import React, {useEffect, useState} from 'react'

export const CardPost = (props) => {
  let postInfo = props.dataPost // Получение данных от родителського компонента
  const [post, setPost] = useState({id: '', name: '', text: '', title: ''})
  useEffect(() => {
    setPost(
        {
          ...post,
          id: postInfo.id,
          title: postInfo.title,
          text: postInfo.body,
          name: postInfo.name
        }
        )
  }, [])
  return (
    <>
      <li className='posts-block__list-item'>
          <p className='list-item__title'>{post.title}</p>
          <p className='list-item__text'>{post.text}</p>
          <p className='list-item__author'>{post.name}</p>
      </li>
    </>
  )
}
