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
<<<<<<< HEAD
      navigate('/user')
=======
      console.log("res : ", res);
      setloading(false)
    } catch (error) {
      console.log("Failed ", error);
>>>>>>> 7d506e633461a22037eb28ff6f1f362340610eb6
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
