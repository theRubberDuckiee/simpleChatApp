import './App.css'
import React, { useState } from 'react'
import { ChatView } from './components/ChatView/chatView'
import { LoginForm } from './components/LoginForm/loginForm'

export const App = (): React.ReactElement => {
  const [username, setUsername] = useState('')
  if (username.length === 0) {
    return <LoginForm username={ username } setUsername={ setUsername }/>
  }
  return (
    <ChatView username={ username }/>
  )
}
