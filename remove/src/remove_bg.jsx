import { useState } from 'react'
import './remove_bg.css'
import close from './assets/close.png'
import logo from './assets/logo.png'
import banner from './assets/banner.png'

function Remove_bg() {

    const [tab_selected, settab_selected] = useState(1);

    const [show_eula_popup, set_show_eula_popup] = useState(false);
    
    return (
        <>
        <div className='remove_bg_main'>
            <div className='header_cont'>
                <img src={close} className='close'/> 

                <h1 className='main_title'>העלאת תמונה כדי להסיר את הרקע</h1>
            </div> 

            <button className='upload_btn'>העלאת תמונה</button>

            <div className='header_text'>פורמטים נתמכים png,jpeg</div>


            <div className='middle_cont'>
                <div className='right_div'>
                    <div className='right_div_inner'>


                    </div>

                </div>

                <div className='left_div'>

                    <div className='tabs_cont'>
                        <div className={'tabs_1 ' + (tab_selected==1? 'tab_selected': '') } onClick={()=>settab_selected(1)}>הוסר רקע</div>
                        <div className={'tabs_2 ' + (tab_selected==2? 'tab_selected': '') } onClick={()=>settab_selected(2)}>מקורי</div>
                    </div>

                    <div className='left_div_inner'>


                    </div>


                    <div className='left_div_footer'> 
                        <button className='upload_btn_takanon' onClick={()=>set_show_eula_popup(true)}>תקנון החברה</button>
                        <div className='takanon_text'>על ידי העלאת התמונה אתה מסכים לתנאים וההגבלות שלנו.</div>

                    </div>

                </div>


            </div>


            <div className='footer_cont'>
                <img src={logo} />
                <img src={banner} className='banner'/>
            </div>



        </div>



        {show_eula_popup?<>
            <div className='layout'></div>

            <div className='popup_eula'>

                <div className='close_eula_popup' onClick={()=>set_show_eula_popup(false)}>X</div>
                fdhjfghj 
                hgfj fghj 
                fdhjfghj 
                hgfj fghj 
                fdhjfghj 
                hgfj fghj 
                fdhjfghj 
                hgfj fghj 
            </div>


        </>:<></>}

       </>
    )
}

export default Remove_bg
