import { QRCodeSVG } from 'qrcode.react';
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

const QRCode = () => {
    const [token, settoken] = useState(null)
    const [counter, setcounter] = useState(20)

    const generateToken = async () => {
        try {
            const strRes = await fetch('https://check-ip-test-backend.onrender.com/api/v1/qr/qr-code')
            const res = await strRes.json();

            console.log("Res",res.token);
            settoken(res.token);
            //if(res.token) {
                //settoken(res.token);
            //}
        }catch(err){
            console.log("err",err);
        }
    }
    useEffect(() => {
        //const ws = new WebSocket("wss://check-ip-test-backend.onrender.com");

        //ws.onmessage = (event) => {
            //const data = JSON.parse(event.data);
            //console.log(data)
            //if (data.token) {
                
             // settoken(data.token);
            //}
         // };
        generateToken();
        setInterval(() => {
            generateToken();
        }, 20000);
        setInterval(() => {
            setcounter(prev => {
                if(prev == 0) {
                    return 20;
                }
                return (prev - 1);
            });
        }, 1000);

        //return () => ws.close();
    }, [])

    console.log("TOKEN=",token)
    
    return (
        <div>
            {counter && <p>{counter}</p>}
{/*             {token && <QRCodeSVG value={"https://google.com"} size={200} />} */}
            {token && window.location.href = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${token}`}
        </div>
    )
}

export default QRCode
