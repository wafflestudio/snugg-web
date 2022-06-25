import React, { FC } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import testImg from "../../../Image/magnifier.svg";
import EditIcon from "../../../Image/edit_icon_151377.svg";
import TagStatBox from "../question/QuestionTagsPage/TagStatBox";
import SimplifiedPreview from "../../reused/question/SimplifiedPreview";
import PlusIcon from "../../../Image/plus.svg";

interface props {
  id: number;
}

const ProfilePage: FC<props> = () => {
  return (
    <div className={styles.profile}>
      <div className={styles.profileLeft}>
        <div className={styles.basicProfile}>basicProfile</div>
        <div className={styles.schoolInfo}>schoolInfo</div>
        <div className={styles.accountManager}>accountManager</div>
      </div>
      <div className={styles.profileRight}>
        <div className={styles.statistics}>statistics</div>
        <div className={styles.myQuestion}>myQuestion</div>
      </div>
    </div>
  );
};

export default ProfilePage;
