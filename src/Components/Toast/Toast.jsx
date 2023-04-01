import React, { useState, useImperativeHandle, forwardRef } from 'react';
import './Toast.css'

const Toast = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [type, setType] = useState("");

  useImperativeHandle(ref, () => {
    return {
      showToast(msg = "", type = "") {
        setShow(true)
        setToastMsg(msg)
        setType(type);
        setTimeout(() => {
          setShow(false)
        }, 5000);
      },
    };
  })

  return (
    show && 
    <div className={`toast-container ${show ? "show" : ""} ${type ? type : "info"}`}>
      {toastMsg}
    </div>
  )
});

export default Toast;
