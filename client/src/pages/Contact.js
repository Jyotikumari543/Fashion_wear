import React from "react";
import Layout from "./../components/Layout/Layout";
import "./../styles/Contact.css";
//import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout title={"Contact us"}>
   <div className="container">
  <div style={{textAlign: 'center'}}>
    <h2>Contact Us</h2>
    
  </div>
  <div className="row">
    <div className="column">
      <img src="/images/contact.jpg"
       style={{width: '100%'}} 

       />
    </div>
    <div className="column">
      <form action="/action_page.php">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" placeholder="Your name.." />
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" placeholder="Your EmailId" />
       
        
        <label htmlFor="subject">Subject</label>
        <textarea id="subject" name="subject" placeholder="Write something.." style={{height: 170}} defaultValue={""} />
        <input type="submit" defaultValue="Submit" />
      </form>
    </div>
  </div>
</div>

    </Layout>
  );
};

export default Contact;
