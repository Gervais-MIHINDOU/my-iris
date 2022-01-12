import emailjs from '@emailjs/browser';
import{ init } from '@emailjs/browser';
require('dotenv').config();

const SenderEmail = (email,message,user_name) => {
    console.log(process.env.REACT_APP_YOUR_USER_ID);
    init(process.env.REACT_APP_YOUR_USER_ID);
    var form ={}; 
    form['user_email']= email;
    form['message']= message;
    form['user_name']= user_name;

    emailjs.send(process.env.REACT_APP_YOUR_SERVICE_ID, process.env.REACT_APP_YOUR_TEMPLATE_ID, form, process.env.REACT_APP_YOUR_USER_ID)
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      })
}

export {SenderEmail}