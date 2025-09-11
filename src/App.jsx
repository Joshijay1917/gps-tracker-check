import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [status, setstatus] = useState({ type: "bg-yellow-200", msg: "Click on set location of room" })
  const [updateIn, setupdateIn] = useState(5)
  const [distance, setDistance] = useState(0)
  const [room, setroom] = useState({
    accurecy: '',
    logitude: '',
    latitude: ''
  })
  const [track, settrack] = useState({
    accurecy: '',
    logitude: '',
    latitude: ''
  })

  function toRad(x) {
      return (x * Math.PI) / 180;
  }

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    lat1 = parseFloat(lat1);
      lon1 = parseFloat(lon1);
      lat2 = parseFloat(lat2);
      lon2 = parseFloat(lon2);

      const R = 6371e3; // metres
      const φ1 = toRad(lat1);
      const φ2 = toRad(lat2);
      const Δφ = toRad(lat2 - lat1);
      const Δλ = toRad(lon2 - lon1);

      const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      return R * c;
  }

  const counter = () => {
    const timer = setInterval(() => {
      setupdateIn(prev => {
        if(prev === 0) {
          return 5;
        }
        return prev - 1;
      })
    }, 1000);
  }

  const startTrack = () => {
    counter()
    setInterval(() => {
      navigator.geolocation.getCurrentPosition(updatePostion)
    }, 5000);
  }

  const updatePostion = (position) => {
    const accu = position.coords.accuracy
    const leti = position.coords.latitude
    const long = position.coords.longitude
    const dis = calculateDistance(room.latitude, room.longitude, leti, long)
    setDistance(dis)
    settrack({
      accurecy: accu,
      logitude: long,
      latitude: leti
    })
  }

  const getPosition = (position) => {
    setstatus({
      type: 'bg-green-200',
      msg: "User allowed to access GPS"
    })
    const accu = position.coords.accuracy
    const leti = position.coords.latitude
    const long = position.coords.longitude
    setroom({
      accurecy: accu,
      logitude: long,
      latitude: leti
    })
  }

  const setRoomPosition = () => {
    if (!navigator.geolocation.getCurrentPosition(getPosition)) {
      setstatus({
        type: "bg-red-200",
        msg: "User not allowed to access GPS"
      })
      return;
    }
  }

  return (
    <div className='min-h-screen'>
      <div className='shadow-xl p-3 rounded-2xl shadow-gray-600'>
        <h1>Live Gps Tracking</h1>
        <div className={`flex my-3 ${status.type} p-3 rounded-2xl text-[13px]`}>
          <p>Status:</p>
          <p>{status.msg}</p>
        </div>
        <div className='flex gap-3 text-[10px]'>
          <button onClick={setRoomPosition} className='bg-blue-400 p-3 rounded-2xl text-white'>click to set location of room</button>
          <button onClick={startTrack} className='bg-blue-400 p-3 rounded-2xl text-white'>Click to Start Tracking</button>
        </div>
        <div className='my-3'>
          <h3 className='text-xl'>Room data</h3>
          <div className='flex justify-center my-2 gap-3'>
            <p>Accurecy:</p>
            <p>{room.accurecy}</p>
          </div>
          <div className='flex justify-center my-2 gap-3'>
            <p>Longitude:</p>
            <p>{room.logitude}</p>
          </div>
          <div className='flex justify-center my-2 gap-3'>
            <p>Loatitude:</p>
            <p>{room.latitude}</p>
          </div>
        </div>
        <div className='my-5'>
          <h3 className='text-2xl'>Live data Update In {updateIn}</h3>
          <div className='flex justify-center my-2 gap-3'>
            <p>Accurecy:</p>
            <p>{track.accurecy}</p>
          </div>
          <div className='flex justify-center my-2 gap-3'>
            <p>Longitude:</p>
            <p>{track.logitude}</p>
          </div>
          <div className='flex justify-center my-2 gap-3'>
            <p>Loatitude:</p>
            <p>{track.latitude}</p>
          </div>
        </div>
        <div className='flex justify-center my-5 text-xl'>
          <p>Distance=</p>
          <p>{distance}</p>
          <p>meters</p>
        </div>
      </div>
    </div>
  )
}

export default App
