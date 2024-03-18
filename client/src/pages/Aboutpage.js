import React from "react";
import Layout from "../components/Layout/Layout";
import "../styles/About.css";

const AboutPage = () => {
  return (
    <Layout title={"About us - Ecommer app"}>
      <div className="about-section">
        <h1>About Us</h1>
        <p>We Are Students of Btech 6th Semester and This is Our Project Ecommerce App Using MERN.</p>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-3">
          <div className="card mb-3">
            <img className="card-img-top mx-auto" src="/images/shreema.jpg" alt="Rohan Kumar Gupta" />
            <div className="card-body text-center">
              <h5 className="card-title">Shreema dey Purba</h5>
              <p className="card-text"></p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card mb-3">
            <img className="card-img-top mx-auto" src="/images/jyoti.png" alt="Jyoti Kumari" />
            <div className="card-body text-center">
              <h5 className="card-title">Jyoti Kumari</h5>
              <p className="card-text"></p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card mb-3">
            <img className="card-img-top mx-auto" src="/images/me.jpg" alt="Shreema Dey Purba" />
            <div className="card-body text-center">
              <h5 className="card-title">Rohan gupta</h5>
              <p className="card-text"></p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
