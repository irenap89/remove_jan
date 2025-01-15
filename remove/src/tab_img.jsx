import { useState,useRef  } from 'react'

import './tab_img.css'
import React from 'react'
import img_1 from './assets/img_1.png'
import warning from './assets/warning.png'

function Tab_img(props) {

    const [color_selected, setcolor_selected] = useState();

    const inputElement = useRef();

    const focusInput = () => {
        inputElement.current.click();
    };

    function get_selected_color(color){

        setcolor_selected(color);
    }

  return (
    <div className='tab_img_cont'>
        {/* {props.tab_name} */}

        {props.tab_name=="no_bg"?<div className='header_tab_img'>
            <img src={warning} className='warning_img'/>
            <div className='warning_text'>אל תשכח להוריד את הקבצים, הם ימחקו אוטומטית כשתצא מהדף</div>

            <button onClick={focusInput} className='btn_choose_color'><span className='selected_color_span' style={{backgroundColor: color_selected}}></span> <span className='span_text'>צבע רקע</span></button>
            <input type="color" ref={inputElement} className='color_input' onChange={(e)=>get_selected_color(e.target.value)}/>
        </div>:<></>}


        <img src={img_1} className={'img_1 '+ (props.tab_name!="no_bg"?"original_tab_img":"")}/>

    </div>
  )
}

export default Tab_img
