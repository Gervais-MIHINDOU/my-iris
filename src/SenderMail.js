import emailjs from '@emailjs/browser';
import{ init } from '@emailjs/browser';
require('dotenv').config()
console.log(process.env.YOUR_SERVICE_ID);

const SenderEmail = (email,message,user_name) => {

    init(process.env.YOUR_USER_ID);
    var form = new FormData();
    form.append('email',email)
    form.append('message',message)
    form.append('user_name',user_name)

    emailjs.sendForm(process.env.YOUR_SERVICE_ID, process.env.YOUR_TEMPLATE_ID, form, process.env.YOUR_USER_ID)
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      })
}

export {SenderEmail}