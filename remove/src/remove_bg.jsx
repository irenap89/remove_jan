import { useState, useRef } from 'react'
import './remove_bg.css'
import close from './assets/close.png'
import logo from './assets/logo.png'
import banner from './assets/banner.png'
import Download_img from './Download_img'
import close_1 from './assets/close1.png'
import close_img from './assets/close.png'
import download_folder from './assets/DownloadsFolder.png'
import not_robot_img from './assets/not_robot.png'
import Tab_img from './tab_img'
import axios from 'axios';

function Remove_bg() {

    const [tab_selected, settab_selected] = useState(1);

    const [show_eula_popup, set_show_eula_popup] = useState(false);
    const [show_download_popup, set_show_download_popup] = useState(false);
    const [file_err, set_file_err] = useState('');

    const [no_bg_file, set_no_bg_file] = useState('');
    const [selected_color, set_selected_color] = useState('');

    const [show_loading, set_show_loading] = useState(false);

    const [not_robot, set_not_robot] = useState(false);
    const [not_robot_err, set_not_robot_err] = useState('');
    

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

                set_show_loading(true);
                var bodyFormData = new FormData();
       
                bodyFormData.append('img_data', file);
                bodyFormData.append('color', selected_color);
                
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
                    }  else  if (response.data.status && response.data.status==200){
                        set_show_loading(false);
                        set_no_bg_file(response.data.file_name);
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


    function download_final_img(){

        if (not_robot ){

            fetch('http://localhost:5000/no_bg_'+no_bg_file)
                .then(response => {
                    response.blob().then(blob => {
                        let url = window.URL.createObjectURL(blob);
                        let a = document.createElement('a');
                        a.href = url;
                        a.download = 'no_bg_'+no_bg_file;
                        a.click();
                    });
                    //window.location.href = response.url;

                    set_show_download_popup(false);
            });

        } else {
            set_not_robot_err('יש לסמן אני לא רובוט');    

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

                        <Download_img img_to_download={no_bg_file} show_popup={show_popup} top_div="top_div" title="תמונה חינם" sub_title=" 612x408 תצוגה מקדימה של תמונה" btn_text="הורד" small_text="איכות טובה עד 0.25 מגה פיקסל"></Download_img>

                        <Download_img img_to_download={no_bg_file}  show_popup={show_popup} top_div="bottom_div" title="Pro" sub_title=" 1280x1920  תמונה מלאה" btn_text="HD הורד" small_text="האיכות הטובה ביותר עד 25 מגה פיקסל"></Download_img>

                    </div>

                </div>

                <div className='left_div'>

                    <div className='tabs_cont'>
                        <div className={'tabs_1 ' + (tab_selected==1? 'tab_selected': '') } onClick={()=>settab_selected(1)}>ללא רקע</div>
                        <div className={'tabs_2 ' + (tab_selected==2? 'tab_selected': '') } onClick={()=>settab_selected(2)}>מקורי</div>
                    </div>

                    <div className='left_div_inner'>
                        {tab_selected==1?<Tab_img tab_name="no_bg" file_img={no_bg_file} set_selected_color={set_selected_color} show_loading={show_loading}/>:

                        <Tab_img  tab_name="original" file_img={no_bg_file}  set_selected_color={set_selected_color} show_loading={show_loading}/>}


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

                <div className='close_eula_popup' onClick={()=>set_show_eula_popup(false)}><img src={close_img} className='close_img'/></div>
                לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית הועניב היושבב שערש שמחויט - שלושע ותלברו חשלו שעותלשך וחאית נובש ערששף. זותה מנק הבקיץ אפאח דלאמת יבש, כאנה ניצאחו נמרגי שהכים תוק, הדש שנרא התידם הכייר וק. הועניב היושבב שערש שמחויט - שלושע ותלברו חשלו שעותלשך וחאית נובש ערששף. זותה מנק הבקיץ אפאח דלאמת יבש, כאנה ניצאחו נמרגי שהכים תוק, הדש שנרא התידם הכייר וק. קוואזי במר מודוף. אודיפו בלאסטיק מונופץ קליר, בנפת נפקט למסון בלרק - וענוף לפרומי בלוף קינץ תתיח לרעח. לת צשחמי צש בליא, מנסוטו צמלח לביקו ננבי, צמוקו בלוקריה שיצמה ברורק. גולר מונפרר סוברט לורם שבצק יהול, לכנוץ בעריר גק ליץ, ושבעגט ליבם סולגק. בראיט ולחת צורק מונחף, בגורמי מגמש. תרבנך וסתעד לכנו סתשם השמה - לתכי מורגם בורק? לתיג ישבעס.
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
                    <input type='checkbox' onChange={()=>set_not_robot(true)}/>
                    <div  className='not_robot_subtitle'> אני לא רובוט </div>
                    <img src={not_robot_img} className='not_robot'/>

                    <div className='err_msg'> {not_robot_err} </div>

                </div>

                <div className='btn_cont'>
                    <button className='cancel_btn' onClick={()=>set_show_download_popup(false)}>ביטול</button>
                    <button className='approve_btn' onClick={()=>download_final_img()}>אישור</button>
                </div>
             
            </div>


        </>:<></>}

       </>
    )
}

export default Remove_bg
