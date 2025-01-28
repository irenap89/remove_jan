import { useState } from 'react'

import './Download_img.css'
import new_icon from './assets/new.png'
import check_icon from './assets/check.png'

function Download_img(props) {

    // const [show_download_popup, set_show_download_popup] = useState(false);

  return (
    <div className={'download_img_cont ' + (props.top_div=="top_div" ? "border_bottom_line" : "") }>
        <div className={'download_img_title ' + (props.top_div=="bottom_div" ? "move_title": "")}> {props.title}</div>
        {props.top_div=="bottom_div" ? <img src={new_icon} className='new_icon'/> : <></>}
        <div className='download_img_subtitle '> {props.sub_title}</div>

        <button className={(props.img_to_download? 'btn_text ' : 'btn_text_disabled') } onClick={()=>{props.img_to_download?props.show_popup():''}}>{props.btn_text}</button>
        
        <div className='small_text'>{props.small_text}</div>

        <img src={check_icon}  className='check_icon'/>

    </div>
  )
}

export default Download_img
