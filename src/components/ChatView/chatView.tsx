import './chatView.css'
import React, { useEffect, useState } from 'react'
import { ChatFeed } from '../ChatFeed/chatFeed'
import { ChatHeader } from '../ChatHeader/chatHeader'
import { EmptyPage } from '../EmptyPage/emptyPage'
import { RoomsPanel } from '../RoomsPanel/roomsPanel'
import axios from 'axios'

export type Props = {
    username: string,
}

// Displays the view after logging in user - rooms panel, chat header, chat messages, and chat input.
export const ChatView = (props: Props): React.ReactElement => {
  const [rooms, setRooms] = useState([])
  const [selectedRoom, setSelectedRoom] = useState({ name: '', id: '' })
  const [users, setUsers] = useState(new Array<string>())

  useEffect(() => {
    async function getAndSetRooms(): Promise<void> {
      const rooms = await axios.get('http://localhost:8080/api/rooms')
      setRooms(rooms.data)
    }
    getAndSetRooms().catch()
  }, [])

  const renderChatFeed = () => {
    if (selectedRoom.id === '') {
      return (
        <EmptyPage emptyMessage={`Hey ${ props.username }! Select a room to get started! 👈 😀`} />
      )
    } else {
      return (
        <div className='chatFeedWrapper'>
          <div className='chatHeader'>
            <ChatHeader
              username={ props.username }
              selectedRoom={ selectedRoom }
              users={ users }
              setUsers={ setUsers }/>
          </div>
          <div className='chatFeed'>
            <ChatFeed
              setUsers={ setUsers }
              username={ props.username }
              selectedRoom={ selectedRoom }/>
          </div>
        </div>
      )
    }
  }

  return (
    <div className='chatViewWrapper'>
      <div className='roomsPanelWrapper'>
        <RoomsPanel
          username={ props.username }
          rooms={ rooms }
          selectedRoom={ selectedRoom }
          setSelectedRoom={ setSelectedRoom }/>
      </div>
      { renderChatFeed() }
    </div>
  )
}
