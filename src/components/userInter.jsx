import React, { useState } from 'react'
import QrReader from 'react-qr-scanner'

const userInterface = () => {
    const [file, setfile] = useState(null)
    const [loading, setloading] = useState(false)

    const handleChange = async (data) => {
      if(data) {
        setloading(data.sessionId)
      }
      console.log("data ", data);
    }

    const error = (err) => {
      setloading(err)
    }
  return (
    <div>
        {/* <label htmlFor="fileInput">
        <img className='w-1/2 h-1/2 m-auto' src="camera.avif" alt="" />
        </label>
        <input id='fileInput' className='hidden' type="file" accept="image/*" capture="environment" /> */}
        <QrReader 
        onError={error}
        onScan={handleChange}
        />
        {loading && <div className='bg-black/50 fixed left-0 top-0 w-full min-h-screen flex justify-center items-center text-white font-bold text-3xl'>
            <p>{loading}</p>
        </div>}
    </div>
  )
}

export default userInterface
