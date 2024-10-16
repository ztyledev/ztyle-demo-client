import React from "react";
import { Link } from 'react-router-dom';

const Footer = () => {
  var d = new Date();
  return (
    <div className="footer">
      <div className="copyright">
        <p>
          Copyright © Designed &amp; Developed by{" "}
          <a href="http://exianttech.com/" target="_blank" rel="noreferrer">
            Exiant Tech Private Limited
          </a>{" "}
          {d.getFullYear()}
        </p>
      </div>
      <div className="footer-link">
        <Link to="/page-privacy-policy">privacy policy</Link>
        <Link to="/page-terms-of-use">terms of use</Link>
        <Link to="/page-refund-policy">refund policy</Link>
        <Link to="/page-contact">contact </Link>
      </div>
    </div>
  );
};

export default Footer;