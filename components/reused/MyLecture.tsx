import React, { useEffect, useState } from "react";
import { Circle } from "@mui/icons-material";
import styles from "/styles/MyLecture.module.scss";
interface Props {
  name: string;
  alarmed: boolean;
}

const MyLecture = (props: Props) => {
  const [alarmed, setAlarmed] = useState<boolean>();
  useEffect(() => {
    setAlarmed(props.alarmed);
  }, []);
  return (
    <div className={styles.myLecture}>
      <span className={styles.nameWrapper}>{props.name}</span>
      {alarmed ? (
        <Circle sx={{ width: "6px", height: "6px", color: "#56C87C" }} />
      ) : null}
    </div>
  );
};

export default MyLecture;
