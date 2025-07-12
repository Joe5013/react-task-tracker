// Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer>
      <p>Copyright © 2024</p>
      <Link to="/about">About</Link>
    </footer>
  );
};

export default Footer;
