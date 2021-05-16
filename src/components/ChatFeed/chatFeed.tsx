import './chatFeed.css'
import { Message, Room } from '../../models'
import React, { useEffect, useState } from 'react'
import { ChatInput } from '../ChatInput/chatInput'
import { EmptyPage } from '../EmptyPage/emptyPage'
import { MyMessage } from '../MyMessage/myMessage'
import { TheirMessage } from '../TheirMessage/theirMessage'
import axios from 'axios'

export type Props = {
  username: string,
  selectedRoom: Room,
  setUsers: React.Dispatch<React.SetStateAction<string[]>>,
}

// Displays message chat feed and input text box.
export const ChatFeed = (props: Props): React.ReactElement => {
  const roomId = parseInt(props.selectedRoom.id, 10)
  const [messages, setMessages] = useState(new Array<Message>())
  const [pollerFunction, setPollerFunction] = useState(setInterval(()=>{}))

  useEffect(() => {
    clearInterval(pollerFunction)
    async function getAndSetMessages(): Promise<void> {
      const messagesResult = await axios.get(`http://localhost:8080/api/rooms/${roomId}/messages`)
      if (JSON.stringify(messages) !== JSON.stringify(messagesResult.data)) {
        if (messagesResult.data.error === undefined) {
          setMessages(messagesResult.data)
        }
        // Scroll to bottom of feed if needed.
        const chatFeed = document.getElementById('chatFeed')
        if (chatFeed !== null) {
          chatFeed.scrollTop = chatFeed.scrollHeight
        }
      }
    }
    // TODO: Implement websocket (need to edit server.js) to avoid spamming API calls.
    // Constantly poll API for changes and update messages. This is what gives us real time updates across different sessions.
    setPollerFunction(setInterval(() => getAndSetMessages().catch(), 100))
  }, [roomId, messages])

  const renderMessages = () => {
    if (messages.length === 0) {
      return (
        <EmptyPage emptyMessage={'💬 Type a message to get this chat started! 💬 '} />
      )
    }
    return Object.keys(messages).map((_key: string, index: number) => {
      const message = messages[index]
      const isMyMessage = props.username === message?.name

      return (
        <div key={`msg_${ index }`} style={{ width: '100%' }}>
          <div className='messageBlock'>
            { isMyMessage ?
            <MyMessage message={ message } /> :
            <TheirMessage message={ message } />}
          </div>
        </div>
      )
    })
  }

  return (
    <div id='chatFeed' className='chatFeed'>
      { renderMessages() }
      <div className='messageFormContainer'>
        <ChatInput
          setUsers={ props.setUsers }
          username={ props.username }
          setMessages={ setMessages }
          roomId={ roomId } />
      </div>
    </div>
  )
}
