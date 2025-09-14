import { useEffect } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom'
import { SignedOut, SignIn, SignInButton, UserButton, useUser } from '@clerk/clerk-react'

function App() {
  const { user } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if(user) {
      if(user.username === 'admin') {
        navigate('/dash')
        return;
      }
      navigate('/user')
    }
  }, [user])
  
  

  return (
    <header>
      <SignedOut>
        {/* <SignInButton /> */}
      </SignedOut>
      {/* <SignIn> */}
        {/* <UserButton /> */}
      {/* </SignIn> */}
    </header>
  )
}

export default App
