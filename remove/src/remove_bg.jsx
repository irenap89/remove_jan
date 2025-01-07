import { useState } from 'react'

import './remove_bg.css'
import close from './assets/close.png'

function Remove_bg() {

    return (
        <div className='remove_bg_main'>
            <div className='header_cont'>
                <img src={close} className='close'/> 

                <h1 className='main_title'>העלאת תמונה כדי להסיר את הרקע</h1>
            </div> 

            <button className='upload_btn'>העלאת תמונה</button>

        </div>
    )
}

export default Remove_bg
