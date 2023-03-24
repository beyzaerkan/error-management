import React, { useState, useImperativeHandle, forwardRef } from 'react';
import './Toast.css'

const Toast = forwardRef(({background}, ref) => {
  const [show, setShow] = useState(false);
  const [toastMsg, setToastMsg] = useState("beyza is here");

  useImperativeHandle(ref, () => {
    return {
      showToast(msg = "") {
        setShow(true)
        setToastMsg(msg)
        setTimeout(() => {
          setShow(false)
        }, 3000);
      },
    };
  })

  return (
    show && 
    <div className={`toast-container ${show ? "show" : ""} ${background ? background : "info"}`}>
      {toastMsg}
    </div>
  )
});

export default Toast;
