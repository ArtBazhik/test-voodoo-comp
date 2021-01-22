import React, {useEffect, useState} from 'react'

import {Input, FormControl, InputAdornment, InputLabel, makeStyles} from '@material-ui/core'
import {Search} from '@material-ui/icons'
import {CardPost} from './components/CardPost'
import {Preloader} from './components/Preloader'

const useStyle = makeStyles(() => ({
  titleSearch: {
    fontSize: '16px',
  },
  input: {
    maxWidth: '100% !important',
  },
})) // Создание кастомных стилей для Material UI компонент

export const App = () => {
  const [posts, setPosts] = useState([]) // Создание локального стора для posts
  const [users, setUsers] = useState([]) // Создание локального стора для users
  const [search, setSearch] = useState('')
  const newArrUsers = []
  const classes = useStyle() // Создание объекта класс с кастомными стилями

  // Получение постов с JSONPlaceholder, после чего записываем в локальный стор posts (10 постов)
  const fetchPosts = async () => {
    try {
      let response = await fetch('https://jsonplaceholder.typicode.com/posts')
      let getPosts = await response.json()
      setPosts(getPosts.slice(0, 10))
    } catch (e) {
      console.log(e.error)
    }
  }
  // Получение пользователей с JSONPlaceholder, после чего записываем в локальный стор posts (10 пользователей)
  const fetchUsers = async () => {
    try {
      let response = await fetch('https://jsonplaceholder.typicode.com/users')
      let getUsers = await response.json()
      setUsers(getUsers.slice(0, 10))
    } catch (e) {
      console.log(e.error)
    }
  }
  useEffect(() => {
    fetchUsers()
    fetchPosts()
  }, [])
  for (let i = 0; i < users.length; i++) {
    users.map(item => {
      return newArrUsers.push(item.name)
    })
  }

  // Вычленение пользователей из массива и запись имён в массив постов
  const uniqSet = new Set(newArrUsers)
  const allUsers = [...uniqSet]
  for (let i = 0; i < posts.length; i++) {
    posts[i].name = allUsers[i]
  }
  //-------------------------------------------------------------------

  // Работа компонента Preloader для отображения загрузки данных
  let isLoading = true
  if (posts.length) {
    isLoading = !isLoading
  }

  // Функция для инпута поиска
  let filteredContacts = posts.filter(post => {
    return post.name.toLowerCase().includes(search.toLowerCase())
  })
  //-------------------------------------------------------------------
  return (
      <div className='container'>
        <div className='search-block'>
          <FormControl className={classes.input}>
            <InputLabel className={classes.titleSearch} htmlFor="input-with-icon-adornment">Поиск по имени
              автора </InputLabel>
            <Input
                onChange={(e) => setSearch(e.target.value)}
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <Search/>
                  </InputAdornment>
                }
            />
          </FormControl>
        </div>
        <div className='posts-block'>
          <ul className='posts-block__list'>
            {
              isLoading ? <Preloader/> :
                  filteredContacts.length ?
                      filteredContacts.map(post => <CardPost key={post.id} dataPost={post}/>) :
                      <p style={{marginTop: '30px', textAlign: 'center'}}>Такого автора нет...</p>
            }
          </ul>
        </div>
      </div>
  )
}

