import './accountPanel.css'
import React from 'react'

const secondMS = 1000
const minuteMS = secondMS * 60
const hourMS = minuteMS * 60
const dayMS = hourMS * 24
const yearMS = dayMS * 365


export type Props = {
    username: string,
}

// Displays section at top of rooms panel that shows username & time user has been online.
export const AccountPanel = (props: Props): React.ReactElement => {
  // Given the amount of milliseconds passed, print out a user-readable time string.
  const convertSecondsToTimeString = (secondsOnline: number): string => {
    switch (true) {
      case (secondsOnline >= 0 && secondsOnline <= minuteMS):
        return `Online for 1 minute`
      case (secondsOnline < hourMS):
        return `Online for ${ Math.floor(secondsOnline/minuteMS)} minutes`
      case (secondsOnline >= hourMS && secondsOnline < dayMS):
        return `Online for ${ Math.floor(secondsOnline/hourMS)} hours`
      case (secondsOnline >= dayMS):
        return `Online for ${ Math.floor(secondsOnline/dayMS)} days`
      case (secondsOnline >= yearMS):
        return `Online for too long. You really need to close your tabs.`
      default:
        return 'Online'
    }
  }

  const loginTime = localStorage.getItem('loginTime')
  const secondsOnline = loginTime !== null ? Date.now() - parseInt(loginTime, 10) : 0
  const timeOnline = convertSecondsToTimeString(secondsOnline)

  return (
    <div className='accountPanel'>
      <span className='accountUsername'>{ props.username }</span>
      <div>
        <span className='online'> { timeOnline } </span>
      </div>
    </div>
  )
}
