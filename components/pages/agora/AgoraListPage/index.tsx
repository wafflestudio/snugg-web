import { FC, useState } from "react";
import styles from "./styles.module.scss";
import ClassPostPreview from "../../../reused/agora/ClassPostPreview";
import { MenuItem, Pagination, Select } from "@mui/material";
import { useAgoraLecturesRetrieveQuery, useAgoraStorysListQuery } from "../../../../store/api/injected";

export interface Props {
  onSearch: (condition: string, query: string) => void;
  lectureId: number;
}

export const AgoraListPage: FC<Props> = ({ onSearch, lectureId }) => {
  const [searchCondition, setSearchCondition] = useState("content");
  const [searchQuery, setSearchQuery] = useState("");
  const { data: lecture, error: lectureError } = useAgoraLecturesRetrieveQuery({ id: lectureId})
  const { data: posts, error: postsError } = useAgoraStorysListQuery({ lecture: lectureId });
  if (lectureError || postsError) {
    return <span>error</span>
  } else if (!lecture || !posts) {
    return <span>loading...</span>
  } else
  return (
    <div className={styles.container}>
      <div className={styles.className}>{lecture.name}</div>
      {posts.results!!.map((item) => (
        <ClassPostPreview post={item} key={item.pk} />
      ))}
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSearch(searchCondition, searchQuery);
          }}
        >
          <Select
            value={searchCondition}
            className={styles.searchCondition}
            onChange={(e) => setSearchCondition(e.target.value)}
          >
            <MenuItem value={"content"}>제목 + 내용</MenuItem>
            <MenuItem value={"title"}>제목</MenuItem>
            <MenuItem value={"writer"}>작성자</MenuItem>
          </Select>
          <input
            className={styles.search}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <input hidden type="submit" />
        </form>
      </div>
    </div>
  );
};
