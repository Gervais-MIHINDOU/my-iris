import emailjs from '@emailjs/browser';
import{ init } from '@emailjs/browser';


const SenderEmail = (email,message,user_name) => {
    require('dotenv').config()
    console.log('Le user id variable d environnement ==>');
    console.log(process.env.YOUR_SERVICE_ID);
    init(process.env.YOUR_USER_ID);
    var form ={}; 
    /*****form.append('email',email)
    form.append('message',message)
    form.append('user_name',user_name)****/

    form['email']= email;
    form['message']= message;
    form['user_name']= user_name;

    emailjs.send(process.env.YOUR_SERVICE_ID, process.env.YOUR_TEMPLATE_ID, form, process.env.YOUR_USER_ID)
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      })
}

export {SenderEmail}