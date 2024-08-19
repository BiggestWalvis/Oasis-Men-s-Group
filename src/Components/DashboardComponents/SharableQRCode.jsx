import React from "react";
import QRCode from "react-qr-code";


export default function SharableQRCode () {


    return(
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <QRCode value="https://oasis-mens-group.web.app/" size={128} style={{ margin: '20px' }} />
        </div>
    )
}