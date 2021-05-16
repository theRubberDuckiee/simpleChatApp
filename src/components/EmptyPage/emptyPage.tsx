import './emptyPage.css'
import React from 'react'

export type Props = {
  emptyMessage: string,
}

// Displays page when no chat room has been selected yet.
export const EmptyPage = (props: Props): React.ReactElement => {
  return (
    <div className='emptyPage'>
      <span className='emptyPageText'>{ props.emptyMessage }</span>
    </div>
  )
}
