import emailjs from '@emailjs/browser';
import{ init } from '@emailjs/browser';

import {REACT_APP_YOUR_SERVICE_ID, REACT_APP_YOUR_TEMPLATE_ID,REACT_APP_YOUR_USER_ID} from "@env"


const SenderEmail = (email,message,user_name) => {
   /// require('dotenv').config()
    console.log('Le user id variable d environnement ==>');
    console.log(REACT_APP_YOUR_USER_ID);
    init(REACT_APP_YOUR_USER_ID);
    var form ={}; 
    /*****form.append('email',email)
    form.append('message',message)
    form.append('user_name',user_name)****/

    form['email']= email;
    form['message']= message;
    form['user_name']= user_name;

    emailjs.send(REACT_APP_YOUR_SERVICE_ID, REACT_APP_YOUR_TEMPLATE_ID, form, REACT_APP_YOUR_USER_ID)
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      })
}

export {SenderEmail}