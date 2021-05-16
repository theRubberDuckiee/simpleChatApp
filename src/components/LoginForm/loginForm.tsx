import './loginForm.css'
import React from 'react'

export type Props = {
  username: string,
  setUsername: React.Dispatch<React.SetStateAction<string>>,
}

// Displays login page where use can input their desired username.
export const LoginForm = (props: Props): React.ReactElement => {
  const [inputtedUsername, setInputtedUsername] = React.useState('')

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    localStorage.setItem('loginTime', Date.now().toString())
    props.setUsername(inputtedUsername)
  }

  return (
    <div className='wrapper'>
      <div className='form'>
        <form onSubmit={ handleSubmit }>
          <input type='text'
            value={ inputtedUsername }
            onChange={(e) => setInputtedUsername(e.target.value)}
            maxLength={ 50 }
            className='input'
            placeholder='Type your username...'
            required />
          <div align-content='center'>
            <button type='submit' className='loginButton'>
              <span>Join the Chat!</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
