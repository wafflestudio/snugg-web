import { Dispatch, FunctionComponent, SetStateAction } from "react";
import AuthModal, { SchoolMajorInfo } from "./AuthModal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, IconButton, Modal } from "@mui/material";
import styles from "/styles/profile/EditMajorModal.module.scss";

interface Props {
  majors: SchoolMajorInfo[];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #588a69",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

const EditMajorModal: FunctionComponent<Props> = (props) => {
  return (
    <Modal open={props.open} onClose={() => props.setOpen(false)}>
      <Box className={styles.editMajorModal} sx={style}>
        <ul className={styles.majorList}>
          {props.majors.map((major) => (
            <MajorItem majorInfo={major} key={JSON.stringify(major)} />
          ))}
        </ul>
        <div className={styles.buttonContainer}>
          <Button className={styles.textButton}>추가</Button>
          <Button className={styles.textButton}>완료</Button>
        </div>
      </Box>
    </Modal>
  );
};

const MajorItem: FunctionComponent<{ majorInfo: SchoolMajorInfo }> = ({
  majorInfo: { major, school, degree, admissionYear },
}) => {
  return (
    <li className={styles.majorItem}>
      <ul>
        <li>{school}</li>
        <li>전공: {major}</li>
        <li>과정: {degree}</li>
        <li>입학년도: {admissionYear}</li>
      </ul>
      <div className={styles.iconButtonContainer}>
        <IconButton>
          <DeleteIcon className={styles.iconButton} />
        </IconButton>
        <IconButton>
          <EditIcon className={styles.iconButton} />
        </IconButton>
      </div>
    </li>
  );
};

export default EditMajorModal;
