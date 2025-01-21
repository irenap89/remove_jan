import { useState, useRef } from 'react'
import './remove_bg.css'
import close from './assets/close.png'
import logo from './assets/logo.png'
import banner from './assets/banner.png'
import Download_img from './Download_img'
import close_1 from './assets/close1.png'
import download_folder from './assets/DownloadsFolder.png'
import not_robot from './assets/not_robot.png'
import Tab_img from './tab_img'
import axios from 'axios';

function Remove_bg() {

    const [tab_selected, settab_selected] = useState(1);

    const [show_eula_popup, set_show_eula_popup] = useState(false);
    const [show_download_popup, set_show_download_popup] = useState(false);
    const [file_err, set_file_err] = useState('');


    function show_popup(){
        set_show_download_popup(true);
    }
    

    const inputElement = useRef();

    const focusInput = () => {
      inputElement.current.click();
    };

    function image_to_server(val){
        set_file_err('');
        let file= val.files[0]; 

        if(file.type=="image/png" || file.type=="image/jpg" || file.type=="image/jpeg"){

            if(file.size<=1000000){

                var bodyFormData = new FormData();
       
                bodyFormData.append('img_data', file);

                axios({
                    method: "post",
                    url: "http://localhost:5000/upload_img",
                    data: bodyFormData,
                    headers: { "Content-Type": "multipart/form-data" },
                })
                .then(function (response) {
                    //handle success
                    if (response.data.status && response.data.status==501){
                        set_file_err(response.data.msg);
                    } 
                  
                })
                .catch(function (response) {
                    //handle error
                    console.log(response);
                });
            } else {
                set_file_err('קובץ גדול מידי');
            }

        } else {
            set_file_err('סוג קובץ לא נתמך');
        }

    }


    return (
        <>
        <div className='remove_bg_main'>

            <div>   
                <div className='header_cont'>
                    <img src={close} className='close'/> 

                    <h1 className='main_title'>העלאת תמונה כדי להסיר את הרקע</h1>
                </div> 

                <button className='upload_btn' onClick={focusInput}>העלאת תמונה</button>

                <input type="file" ref={inputElement} className='file_input' onChange={(e)=>image_to_server(e.target)}/>    

                <div className='header_text'>פורמטים נתמכים png,jpeg</div>
                <div className='file_err'> {file_err} </div>
                
            </div>


            <div className='middle_cont'>
                <div className='right_div'>
                    <div className='right_div_inner'>

                        <Download_img show_popup={show_popup} top_div="top_div" title="תמונה חינם" sub_title=" 612x408 תצוגה מקדימה של תמונה" btn_text="הורד" small_text="איכות טובה עד 0.25 מגה פיקסל"></Download_img>

                        <Download_img show_popup={show_popup} top_div="bottom_div" title="Pro" sub_title=" 1280x1920  תמונה מלאה" btn_text="HD הורד" small_text="האיכות הטובה ביותר עד 25 מגה פיקסל"></Download_img>

                    </div>

                </div>

                <div className='left_div'>

                    <div className='tabs_cont'>
                        <div className={'tabs_1 ' + (tab_selected==1? 'tab_selected': '') } onClick={()=>settab_selected(1)}>הוסר רקע</div>
                        <div className={'tabs_2 ' + (tab_selected==2? 'tab_selected': '') } onClick={()=>settab_selected(2)}>מקורי</div>
                    </div>

                    <div className='left_div_inner'>
                        {tab_selected==1?<Tab_img tab_name="no_bg"/>:

                        <Tab_img  tab_name="original"/>}


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


        {show_download_popup?<>
            <div className='layout'></div>

            <div className='popup_dowbload'>
                <img src={close_1} className='close_1' onClick={()=>set_show_download_popup(false)}/>

                    <div className='top_div_download'>
                        <img src={download_folder}  className='download_folder'/>
                    </div>

                <div className='popup_download_title'>אישור להורדת תמונה</div>

                <div  className='popup_download_subtitle'> האם להוריד את התמונה? </div>

                <div className='not_robot_cont'>
                    <input type='checkbox' />
                    <div  className='not_robot_subtitle'> אני לא רובוט </div>
                    <img src={not_robot} className='not_robot'/>

                </div>

                <div className='btn_cont'>
                    <button className='cancel_btn' onClick={()=>set_show_download_popup(false)}>ביטול</button>
                    <button className='approve_btn'>אישור</button>
                </div>
             
            </div>


        </>:<></>}

       </>
    )
}

export default Remove_bg
