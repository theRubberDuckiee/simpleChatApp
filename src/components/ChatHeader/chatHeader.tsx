import './chatHeader.css'
import React, { useEffect } from 'react'
import { Room } from '../../models'
import axios from 'axios'

export type Props = {
    username: string,
    selectedRoom: Room,
    users: string[],
    setUsers: React.Dispatch<React.SetStateAction<string[]>>,
}

// Displays the title of chat and all users that are active in chat.
export const ChatHeader = (props: Props): React.ReactElement => {
  let allUsersString = '' // A string for all users in a room that will display on hover.

  const renderUsers = () => {
    const usersElementsList: React.ReactElement[] = []
    const allUsers = [...props.users]
    const indexOfUser = allUsers.indexOf(props.username)

    // If current user is in the user list, move it to front of array so it renders first.
    if (indexOfUser !== -1) {
      allUsers.splice(indexOfUser, 1)
      allUsers.unshift(props.username)
    }
    allUsers.forEach((user, index) => {
      const isMe = props.username === user
      const isLastUser = user === allUsers[allUsers.length-1]
      usersElementsList.push(
          <span key={ `room_${ index }` }>
            { renderUser(isMe, isLastUser, user) }
          </span>,
      )
    })
    return <div> { usersElementsList } </div>
  }

  const renderUser = (isMe: boolean, isLastUser: boolean, user: string) => {
    const userString = isLastUser ? `${ user }` : `${ user }, `
    allUsersString = allUsersString.concat(userString)
    return (
      <span style ={ { color: isMe ? 'red' : 'grey' } }>
        { userString }
      </span>
    )
  }

  useEffect(() => {
    async function getAndSetUsers(): Promise<void> {
      const rooms = await axios.get(`http://localhost:8080/api/rooms/${ props.selectedRoom.id }`)
      const usersResult = rooms.data.users
      if (usersResult !== undefined &&
          JSON.stringify(props.users) !== JSON.stringify(usersResult)) {
        props.setUsers(usersResult)
      }
    }
    getAndSetUsers().catch()
  }, [props.selectedRoom, props.users])

  const usernameSection = renderUsers()
  return (
    <div className='header'>
      <div className='roomName'>
        { props.selectedRoom.name }
      </div>
      <div title={ allUsersString } className='users'>
        { usernameSection }
      </div>
    </div>
  )
}
