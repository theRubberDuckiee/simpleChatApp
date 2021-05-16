import './myMessage.css'
import { Message } from '../../models'
import React from 'react'

export type Props = {
  message: Message,
}

// Displays message if you (current user) send it in chat.
export const MyMessage = (props: Props): React.ReactElement => {
  return (
    <div className='myMessage'>
      <span>{ props.message.message }</span>
    </div>
  )
}
