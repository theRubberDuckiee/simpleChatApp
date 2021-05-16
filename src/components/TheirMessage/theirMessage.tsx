import './theirMessage.css'
import { Message } from '../../models'
import React from 'react'

export type Props = {
  message: Message,
}

// Displays messages that are sent by users that are not you.
export const TheirMessage = (props: Props): React.ReactElement => {
  return (
    <div>
      <div className='theirMessage'>
        { props.message.message }
      </div>
      <div className='messageSender'>
        { props.message.name }
      </div>
    </div>
  )
}
