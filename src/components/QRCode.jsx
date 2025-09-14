import { QRCodeSVG } from 'qrcode.react';
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

var interval = null;

const QRCode = () => {
    const [sessionId, setsessionId] = useState(null)
    const [counter, setcounter] = useState(20)

    useEffect(() => {
        setInterval(() => {
            setcounter(prev => {
                if (prev === 0) {
                    return 20;
                }
                return prev - 1;
            })
        }, 1000);
        interval = setInterval(() => {
            setsessionId(uuidv4())
        }, 20000);
    }, [])

    return (
        <div>
            {counter && <p>{counter}</p>}
            {sessionId && <QRCodeSVG value={sessionId} />}
        </div>
    )
}

export default QRCode
