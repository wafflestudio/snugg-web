import { FC } from "react";
import styles from "./styles.module.scss";
import ClassPostPreview from "../../../reused/ClassPostPreview";
import { MenuItem, Pagination, Select } from "@mui/material";

export interface Props {
  className: string | null;
}

export const AgoraListPage: FC<Props> = ({ className }) => {
  return (
    <div className={styles.container}>
      <div className={styles.className}>강의 제목</div>
      {[...Array(10)].map((item) => {
        return <ClassPostPreview key={item} />;
      })}
      <div className={styles.bottom1}>
        <Pagination
          className={styles.pagination}
          count={10}
          siblingCount={10}
          size="small"
        />
        <button className={styles.writeButton}>글쓰기</button>
      </div>
      <div className={styles.bottom2}>
        <Select defaultValue={"content"} className={styles.searchCondition}>
          <MenuItem value={"content"}>제목 + 내용</MenuItem>
          <MenuItem value={"title"}>제목</MenuItem>
          <MenuItem value={"writer"}>작성자</MenuItem>
        </Select>
        <input className={styles.search} />
      </div>
    </div>
  );
};