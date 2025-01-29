import { useState } from 'react'
import axios from 'axios';
import './Login.css'


function Login() {

  const [userName, settab_selected] = useState('');
  const [password, setpassword] = useState('');
  const [show_register, setshow_register] = useState(false);
  const [email, setemail] = useState('');
  const [phone, setphone] = useState('');
  const [err_msg, seterr_msg] = useState();
  
  function register_func(){


      if(userName!='' && password!='' && email!='' && phone!=''){
        seterr_msg('');

        let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        let mail = email;

        if (regex.test(mail)) {

          // debugger;

          var bodyFormData = new FormData();
       
          bodyFormData.append('userName', userName);
          bodyFormData.append('password', password);
          bodyFormData.append('email', email);
          bodyFormData.append('phone', phone);
          
          axios({
              method: "post",
              url: "http://localhost:5000/register",
              data: bodyFormData,
              headers: { "Content-Type": "multipart/form-data" },
          })
          .then(function (response) {
            setshow_register(false);
          })
          .catch(function (response) {
              //handle error
              console.log(response);
          });

        

        } else {
          seterr_msg("אימייל לא תקין");
        }

      } else {
        seterr_msg('יש למלא את כל השדות');
      }

  }


  return (
   
   <div className='remove_bg_main'>

      {!show_register?<>
        <div className='login_title'>התחברות</div>

        <div className='login_fields_cont'>

            <div className='login_input_cont'>
              <div>שם משתמש</div>
              <input type="text" placeholder='שם משתמש' value={userName} onChange={(e)=>settab_selected(e.target.value)}/>
            </div>

            <div  className='login_input_cont'>
              <div>סיסמא</div>
              <input type="password" value={password} onChange={(e)=>setpassword(e.target.value)}/>
            </div>

            <button className='login_btn'>התחבר</button>

            <div className='register_text' onClick={()=>setshow_register(true)}>הרשם</div>

        </div>

        </>: <>
        
        <div className='login_title'>הרשמה</div>

        <div className='login_fields_cont'>

            <div className='login_input_cont'>
              <div>שם משתמש</div>
              <input type="text" placeholder='שם משתמש' value={userName} onChange={(e)=>settab_selected(e.target.value)}/>
            </div>

            <div  className='login_input_cont'>
              <div>סיסמא</div>
              <input type="password" value={password} onChange={(e)=>setpassword(e.target.value)}/>
            </div>

            
            <div className='login_input_cont'>
              <div>אימייל</div>
              <input type="text" value={email} onChange={(e)=>setemail(e.target.value)}/>
            </div>

                
            <div className='login_input_cont'>
              <div>טלפון</div>
              <input type="number" value={phone} onChange={(e)=>setphone(e.target.value)}/>
            </div>


            <button className='login_btn' onClick={register_func}>הרשם</button>

            {err_msg?<div className='err_msg_register'>{err_msg}</div>:<></>}

            <div className='register_text' onClick={()=>setshow_register(false)}>כבר רשום? התחבר</div>

        </div>
        
        
        </> }




   

    </div>


  )
}

export default Login
