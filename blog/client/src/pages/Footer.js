import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';

const Footer = () => {
  return (
    <footer className="bg-body-tertiary text-center text-lg-start" style={{ marginTop: "30px"}}>
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-4 col-md-4 mb-4 mb-md-0">
            <p>
            Lorem ipsum dolor sit amet, <br />consectetur adipisicing elit<br />
            Lorem ipsum dolor sit amet, <br />consectetur adipisicing elit<br/>
            Lorem ipsum dolor sit amet, <br />consectetur adipisicing elit
            </p>
          </div>
          <div className="col-lg-4 col-md-4 mb-4 mb-md-0">
            <ul className="list-unstyled mb-0">
              <li><Link to='/' className="text-dark">BlogPosts</Link></li>
              <li><Link to='/' className="text-dark">Contact Us</Link></li>
              <li><Link to='/' className="text-dark">About Us</Link></li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-4 mb-4 mb-md-0">
          <img src={logo} alt="logo" style={{ borderRadius: "50%", width: "100px", height: "100px"}} />
          <h5>Contact</h5>
          <ul className="list-unstyled mb-0">
            <li><Link className="text-dark">info@wittymuse.com</Link></li>
            <li><Link className="text-dark">+1 (234) ***-***</Link></li>
          </ul>
          </div>
        </div>
      </div>
      <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
        © {new Date().getFullYear()} Copyright:
        <Link className="text-dark" >WittyMuse.com</Link>
      </div>
    </footer>
  )
}

export default Footer
