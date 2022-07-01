import { FunctionComponent } from "react";
import { SchoolMajorInfo } from "./AuthModal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, IconButton } from "@mui/material";
import styles from "/styles/profile/EditMajorModal.module.scss";

interface Props {
  majors: SchoolMajorInfo[];
}

const EditMajorModal: FunctionComponent<Props> = ({majors}) => {
  return <div className={styles.editMajorModal}>
    <ul className={styles.majorList}>
      {majors.map((major) => (
          <MajorItem majorInfo={major} key={JSON.stringify(major)}/>
        )
      )}
    </ul>
    <div className={styles.buttonContainer}>
      <Button className={styles.textButton}>추가</Button>
      <Button className={styles.textButton}>완료</Button>
    </div>
  </div>
};

const MajorItem: FunctionComponent<{majorInfo: SchoolMajorInfo}> = ({ majorInfo: {major,school,degree,admissionYear} }) => {
  return <li className={styles.majorItem}>
    <ul>
      <li>{school}</li>
      <li>전공: {major}</li>
      <li>과정: {degree}</li>
      <li>입학년도: {admissionYear}</li>
    </ul>
    <div className={styles.iconButtonContainer}>
      <IconButton>
        <DeleteIcon className={styles.iconButton}/>
      </IconButton>
      <IconButton>
        <EditIcon className={styles.iconButton}/>
      </IconButton>
    </div>
  </li>
}

export default EditMajorModal;