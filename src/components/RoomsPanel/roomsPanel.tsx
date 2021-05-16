import './roomsPanel.css'
import React, { Dispatch, SetStateAction } from 'react'
import { AccountPanel } from '../AccountPanel/accountPanel'
import { Room } from '../../models'

export type Props = {
  username: string,
  rooms: Room[],
  selectedRoom: Room,
  setSelectedRoom: Dispatch<SetStateAction<Room>>,
}

// Displays a list of rooms as a panel on the left column that the user can join.
export const RoomsPanel = (props: Props): React.ReactElement => {
  const listItems = props.rooms?.map((room) => {
    const isSelected = props.selectedRoom.id === room.id
    return (
      <div key={`room_${ room.id }`}>
        <button className={isSelected ? 'roomButtonSelected' : 'roomButton'} onClick={(e) => props.setSelectedRoom(room)}>
          <span className='roomText'>
            { room.name }
          </span>
        </button>
      </div>
    )
  })
  return (
    <div className='roomsPanel'>
      <div className='accountPanelWrapper'><AccountPanel username={ props.username }/></div>
      <div className='roomsList'>{ listItems }</div>
    </div>
  )
}
