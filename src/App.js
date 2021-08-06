import React from 'react';
import * as emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import { Formik } from 'formik';
import 'react-toastify/dist/ReactToastify.css';

import * as Yup from "yup";
import './styles.css';

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().required("Required"),
  message: Yup.string().required("Required")

});

function App() {
  function sendEmail(values) {
    console.log(values)

    emailjs.send('service_ehlhj7p', 'template_27wo99c',
      values, 'user_cngQkoX5lh5GQbKeDeqMS')
      .then((result) => {
        toast.success('email sent successfully')

      }, (error) => {
        console.log(error.message)
        toast.error('error sending email')
        // alert('error sending email');
      });
    //clears the form after sending the email
    // e.target.reset();
  }
  return (

    <div className="userForm">
      <div className="header">
        <h2>Send Email</h2>
      </div>

      <Formik
        initialValues={{ username: "", email: "" ,message :""}}
        validationSchema={validationSchema}
        onSubmit={values => {
          console.log("validation ", values);
          sendEmail(values)
        }}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <form className = "form"onSubmit={handleSubmit}>
            <div className="form-control">
              <label htmlFor="username">Name</label>
              <input type="text"
                placeholder="name"
                id="name"
                onChange={handleChange}
                name="name"
                value={values.name} />
              <span style={{ color: "red" }}> {errors.name}</span>
            </div>
            <div className="form-control">
              <label htmlFor="username">Email</label>
              <input type="email" placeholder="reach@gmail.com" id="email" onChange={handleChange}
                value={values.email} />
              <span style={{ color: "red" }}>{errors.email}</span>
            </div>
            <div className="form-control">
            <label htmlFor="username">Message</label>
              <textarea id='message' name='message'
                placeholder="Let's talk about it..."
                onChange={handleChange}
               value={values.message}
               rows="4" cols="50"/>

                   <span style={{ color: "red" }}>
                   {errors.message}</span>
            </div>
            <button type="submit">Send</button>
          </form>
        )}


      </Formik>
      <ToastContainer position="top-center" autoClose={1000} />
    </div>
  );
}

export default App;












