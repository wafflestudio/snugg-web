import React, { Dispatch, SetStateAction } from "react";
import { Box, Divider, Modal } from "@mui/material";
import styles from "../../../styles/profile/PointModal.module.scss";
import DiamondIcon from "@mui/icons-material/Diamond";
interface pointModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  height: 500,
  bgcolor: "background.paper",
  border: "2px solid #588a69",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

function PointModal(props: pointModalProps) {
  const handleClose = () => props.setOpen(false);
  return (
    <Modal open={props.open} onClose={handleClose}>
      <Box className={styles.insideBox} sx={style}>
        <div className={styles.top}>
          <DiamondIcon sx={{ color: "#588a69", width: 30, height: 30 }} />
          <span className={styles.text}>{"포인트 내역"}</span>
        </div>
        <div className={styles.header}>
          <div>내 포인트</div>
          <div>30p</div>
        </div>
        <Divider className={styles.divider} />
        {[1, 2, 3, 4, 5, 6, 7, 8].map((id) => (
          <PointHistory key={id} />
        ))}
      </Box>
    </Modal>
  );
}

function PointHistory() {
  return (
    <div className={styles.pointHistory}>
      <div className={styles.topLine}>
        <div>+10p</div>
        <div>답변 채택</div>
      </div>
      <div className={styles.bottomLine}>2022.06.29 20:26</div>
    </div>
  );
}

export default PointModal;
