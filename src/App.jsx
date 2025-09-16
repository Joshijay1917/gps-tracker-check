import { useEffect, useState } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom'

function App() {
  const [user, setuser] = useState(null)
  const navigate = useNavigate()
  
  const handleChange = (e) => {
    setuser(e.target.value)
  }

  const login = () => {
    if(user) {
      if(user === 'admin') {
        navigate('/dash')
        return;
      }
      navigate(`/user/${user}`)
    }
  }

  return (
    <div className='shadow-2xl p-5 rounded-2xl'>
      <h1>Login</h1>
      <input className='bg-gray-200 p-3 rounded-2xl m-3' onChange={handleChange}/>
      <button onClick={login} className='bg-blue-400 text-white text-xl'>Login</button>
    </div>
  )
}

export default App
