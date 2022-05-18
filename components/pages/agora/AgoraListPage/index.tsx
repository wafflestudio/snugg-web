import { FC, useState } from "react";
import styles from "./styles.module.scss";
import ClassPostPreview from "../../../reused/agora/ClassPostPreview";
import { MenuItem, Pagination, Select } from "@mui/material";

export interface Props {
  className: string;
  onSearch: (condition: string, query: string) => void;
}

export const AgoraListPage: FC<Props> = ({ className, onSearch }) => {
  const [searchCondition, setSearchCondition] = useState("content");
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className={styles.container}>
      <div className={styles.className}>강의 제목</div>
      {[0,1,2,3,4,5,6,7,8,9].map((item) => {
        return <ClassPostPreview key={item} className={className} author={"작성자"} />;
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
        <form onSubmit={(e) => {
          e.preventDefault();
          onSearch(searchCondition, searchQuery);
        }}>
          <Select value={searchCondition} className={styles.searchCondition} onChange={(e) => setSearchCondition(e.target.value)}>
            <MenuItem value={"content"}>제목 + 내용</MenuItem>
            <MenuItem value={"title"}>제목</MenuItem>
            <MenuItem value={"writer"}>작성자</MenuItem>
          </Select>
          <input className={styles.search} onChange={(e) => setSearchQuery(e.target.value)} />
          <input hidden type="submit"/>
        </form>
      </div>
    </div>
  );
};
