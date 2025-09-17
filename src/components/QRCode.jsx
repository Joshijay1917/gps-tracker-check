import { QRCodeSVG } from 'qrcode.react';
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

const QRCode = () => {
    const [token, settoken] = useState(null)
    const [counter, setcounter] = useState(20)

    useEffect(() => {
        const ws = new WebSocket("wss://check-ip-test-backend.onrender.com");

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.token) {
                console.log(data.token)
              settoken(data.token);
            }
          };

        setInterval(() => {
            setcounter(prev => {
                if(prev == 0) {
                    return 20;
                }
                return (prev - 1);
            });
        }, 1000);

        return () => ws.close();
    }, [])

    return (
        <div>
            {counter && <p>{counter}</p>}
            {token && <QRCodeSVG value={token} size={200} />}
        </div>
    )
}

export default QRCode
