import React from 'react';

import './Navbar.css'

const Navbar = ({ assyNo, bodyNo, rgbColor, extCode, bgColor, user, departmentCode, background }) => {
  return (
    <div className='top-screen' style={{ background: background }}>
      <div className='montaj'>
        MONTAJ NO
        <br />
        <span>{assyNo}</span>
      </div>
      <div className='body' style={{ background: rgbColor }}>
        BODY NO
        <br />
        <span>{bodyNo}</span>
      </div>
      <div className='navbar-title'> HATA GİRİŞ EKRANI</div>
      <div className='rgb-color' style={{ background: bgColor }}>
        Renk
        <br />
        <span>{extCode}</span>
      </div>
      <div className='user'>{user} ({departmentCode})</div>
    </div>
  );
};

export default Navbar;
