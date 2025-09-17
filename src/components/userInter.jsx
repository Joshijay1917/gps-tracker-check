import React, { useState } from 'react'
import { Scanner } from '@yudiel/react-qr-scanner'
import { useParams } from 'react-router-dom'

const userInterface = () => {
    const [file, setfile] = useState(null)
    const [loading, setloading] = useState(false)
    const { username } = useParams();

    const isTokenValid = async(token) => {
  if (!token) return false;
  
  try {
    const strRes = await fetch('https://check-ip-test-backend.onrender.com/api/v1/qr/scan', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token, userId: username})
    });
      const res = await strRes.json()

      console.log("Res:", res);
      if(res.success) {
          return true;
      }

      return false;
  } catch (error) {
    return false;
  }
};

    const handleChange = async (data) => {
      console.dir(data[0].rawValue);
      setloading("Loading...")
      if(data) {
        try {
          //const strRes = await fetch('https://check-ip-test-backend.onrender.com/api/v1/qr/scan', {
            //method: 'POST',
           // headers: {
            //  'Content-Type': 'application/json'
          //  },
           // body: JSON.stringify({ token: data[0].rawValue, userId: username})
        //  });

          //console.log("StrRes:", strRes);
          
          //const res = await strRes.json();

         // if(!res.success) {
           // setloading("Failed to mark attandance")
        //  }
          if(!(await isTokenValid(data[0].rawValue))) {
              console.log("Attendance Not marked")
              setloading("Failed to mark Attendance");
              return;
          }
          setloading("Attendance Marked")
          } catch (error) {
              setloading("Err")
              console.log("Err ", error);
          }
        } else {
            setloading("Data not found");
        }
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
        <Scanner 
        onScan={handleChange}
            onError={error}
        />
        {loading && <div className='bg-black/50 fixed left-0 top-0 w-full min-h-screen flex justify-center items-center text-white font-bold text-3xl'>
            <p>{loading}</p>
        </div>}
    </div>
  )
}

export default userInterface
