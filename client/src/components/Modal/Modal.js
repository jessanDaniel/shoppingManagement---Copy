import React from "react";
import { Button } from "@material-ui/core";
import ReactDom from "react-dom";
import "./Modal.css";

const Modal = ({ open, children, onClose }) => {
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div className="overlay"></div>
      <div className="modal">
        {children}
        <Button onClick={onClose} color="primary" variant="contained">
          Close
        </Button>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
