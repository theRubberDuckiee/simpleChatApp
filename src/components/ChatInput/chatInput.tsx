import './chatInput.css'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Message } from '../../models'
import axios from 'axios'

export type Props = {
  username: string,
  setMessages: Dispatch<SetStateAction<Message[]>>,
  roomId: number,
  setUsers: React.Dispatch<React.SetStateAction<string[]>>,
}

// Displays text input area where user can type and send messages.
export const ChatInput = (props: Props): React.ReactElement => {
  const [messageInput, setMessageInput] = useState('')

  const handleChange = (event: any) => {
    setMessageInput(event.target.value)
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    if (messageInput.trim().length > 0) {
      await axios.post(`http://localhost:8080/api/rooms/${ props.roomId }/messages`,
          { name: props.username, message: messageInput })
      const messages = await axios.get(`http://localhost:8080/api/rooms/${ props.roomId }/messages`)
      props.setMessages(messages.data)
      // Force a re-render of all users in chat header (to include current user)
      props.setUsers([])
    }
    setMessageInput('')

    // Scroll to bottom of feed once user presses submit, if needed.
    const chatFeed = document.getElementById('chatFeed')
    if (chatFeed !== null) {
      chatFeed.scrollTop = chatFeed.scrollHeight
    }
  }

  return (
    <form className='messageForm' onSubmit={ handleSubmit }>
      <input
        className='messageInput'
        placeholder='Send a message...'
        value={ messageInput }
        onChange={ handleChange }
      />
      <button type='submit' className='sendButton'>
        <span className='sendText'>Send</span>
      </button>
    </form>
  )
}
