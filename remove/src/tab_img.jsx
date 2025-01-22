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
        props.set_selected_color(color)
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

        {props.file_img? <>
        {props.tab_name=="no_bg"? <img src={'http://localhost:5000/no_bg_'+props.file_img} className={'img_1 '+ (props.tab_name!="no_bg"?"original_tab_img":"")}/> :
        <img src={'http://localhost:5000/'+props.file_img} className={'img_1 '+ (props.tab_name!="no_bg"?"original_tab_img":"")}/>}</>: 
        <div className='select_file_msg'>יש לבחור תמונה</div>}

        
        {props.show_loading?
        <div className='loading_cont'>
            <div className='loading_cont_inner'>39%</div>
        </div> : <></>}
     

    </div>
  )
}

export default Tab_img
