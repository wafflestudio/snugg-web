import React, { Dispatch, SetStateAction, useState } from "react";
import { Box, Button, Modal, TextField } from "@mui/material";
import styles from "../../../../styles/profile/PasswordModal.module.scss";
import LockIcon from "@mui/icons-material/Lock";
interface passwordModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 500,
  bgcolor: "background.paper",
  border: "2px solid #588a69",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

function PasswordModal(props: passwordModalProps) {
  const [currentPW, setCurrentPW] = useState<string>("");
  const [newPW, setNewPW] = useState<string>("");
  const [renewPW, setRenewPW] = useState("");
  const handleChangePW = () => {};
  const handleClose = () => props.setOpen(false);
  return (
    <Modal open={props.open} onClose={handleClose}>
      <Box className={styles.insideBox} sx={style}>
        <div className={styles.top}>
          <LockIcon sx={{ color: "#588a69", width: 30, height: 30 }} />
          <span className={styles.text}>{"비밀번호 변경"}</span>
        </div>
        <div className={styles.middle}>
          <div className={styles.inputLine}>
            <span className={styles.text}>{"현재 비밀번호"}</span>
            <TextField
              sx={{ width: 300 }}
              size="small"
              id="outlined-password-input"
              type="password"
              value={currentPW}
              onChange={(
                e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
              ) => {
                setCurrentPW(e.target.value);
              }}
            />
          </div>
          <div className={styles.inputLine}>
            <span className={styles.text}>{"새 비밀번호"}</span>
            <TextField
              sx={{ width: 300 }}
              size="small"
              id="outlined-password-input"
              type="password"
              value={newPW}
              onChange={(
                e
              ) => {
                setNewPW(e.target.value);
              }}
            />
          </div>
          <div className={styles.inputLine}>
            <span className={styles.text}>{"새 비밀번호 확인"}</span>
            <TextField
              sx={{ width: 300 }}
              id="outlined-password-input"
              size="small"
              type="password"
              value={renewPW}
              onChange={(
                e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
              ) => {
                setRenewPW(e.target.value);
              }}
            />
          </div>
        </div>
        <div className={styles.bottom}>
          <Button
            sx={{
              background: "#588a69",
              width: 100,
              height: 40,
              ":hover": {
                bgcolor: "#588a69", // theme.palette.primary.main
              },
            }}
            onClick={handleChangePW}
            variant="contained"
          >
            변경하기
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

export default PasswordModal;
