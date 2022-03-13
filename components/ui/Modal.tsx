import * as React from "react";
import Dialog from "@mui/material/Dialog";

interface Props {
  isOpen: boolean;
  handleClose(): void;
}

const Modal: React.FC<Props> = ({ isOpen, handleClose, children }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {children}
    </Dialog>
  );
};

export default Modal;
