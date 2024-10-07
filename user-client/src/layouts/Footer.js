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
        <Link to="">privacy policy</Link>
        <Link to="">terms of use</Link>
        <Link to="">refund policy</Link>
        <Link to="">contact </Link>
      </div>
    </div>
  );
};

export default Footer;