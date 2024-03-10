import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import theme from "../../theme/theme";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: theme.palette.background.paper,
  border: "2px solid black",
  boxShadow: 24,
  // p: 4,
};

const MainModal = (props) => {
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{props.children}</Box>
      </Modal>
    </div>
  );
};

export default MainModal;
