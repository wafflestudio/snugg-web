import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import HelpIcon from "@mui/icons-material/Help";

import styles from "../QuestionAskPage/styles.module.scss";
import {
  Select,
  MenuItem,
  Chip,
  Input,
  SelectChangeEvent,
} from "@mui/material";
import React, { useState } from "react";
import { updatePost } from "../../../../store/posts";
import { useAppDispatch } from "../../../../store";
import { PostId, QuestionPost } from "../../../../api";
import QuestionEditor from "../../../reused/QuestionEditor";

interface Props {
  postId: number | null;
  questionData: QuestionPost;
}
const QuestionEditPage = (props: Props) => {
  const [field, setField] = useState<string>(props.questionData?.field);
  const [title, setTitle] = useState<string>(props.questionData?.title);
  const [content, setContent] = useState<string>(props.questionData?.content);
  const [tags, setTags] = useState<string[]>(props.questionData?.tags);

  const [tagInput, setTagInput] = useState<string>("");
  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const dispatch = useAppDispatch();
  const handleUpdatePost = (
    id: PostId,
    field: string,
    title: string,
    content: string,
    accepted_answer: number,
    tags: string[]
  ) => {
    const params = { field, title, content, accepted_answer, tags };
    dispatch(updatePost({ id, params }))
      .then((action) => {
        if (updatePost.fulfilled.match(action)) {
          alert("질문 수정 완료");
        } else if (updatePost.rejected.match(action)) {
          alert("질문 수정 실패");
        }
      })
      .catch((reason) => {
        alert(`질문 수정 실패 ${reason}`);
      });
    console.log(field, title, content, accepted_answer, tags);
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <div className={styles.title}>질문하기</div>
        <div className={styles.questionTitle}>
          <CreateOutlinedIcon className={styles.icon} />
          <Input
            className={styles.titleInput}
            placeholder="제목을 입력하세요."
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
        </div>
        <QuestionEditor setContent={setContent} content={content} />
        <button
          className={styles.button}
          onClick={(e) => {
            e.preventDefault();
            if (typeof props.postId == "number") {
              handleUpdatePost(props.postId, field, title, content, 0, tags);
            }
          }}
        >
          질문 수정하기
        </button>
      </div>
      <div className={styles.sideContainer}>
        <div className={styles.category}>
          <div className={styles.sideTitle}>전공분야</div>
          <Select
            className={styles.categorySelect}
            value={field}
            onChange={(e: SelectChangeEvent<string>) =>
              setField(e.target.value)
            }
          >
            <MenuItem value={"컴퓨터공학"}>컴퓨터공학</MenuItem>
            <MenuItem value={"경제학"}>경제학</MenuItem>
            <MenuItem value={"인문학"}>인문학</MenuItem>
            <MenuItem value={"기타"}>기타</MenuItem>
          </Select>
        </div>
        <div className={styles.tag}>
          <div className={styles.sideTitle}># 태그</div>
          <Input
            className={styles.tagInput}
            value={tagInput}
            placeholder="태그 입력 후 Enter를 누르세요."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTagInput(e.target.value)
            }
            onKeyPress={addTag}
          />
          <div className={styles.tagList}>
            {tags.map((item) => {
              return (
                <Chip
                  className={styles.chip}
                  label={item}
                  key={item}
                  variant="outlined"
                />
              );
            })}
          </div>
        </div>
        <div className={styles.help}>
          <HelpIcon className={styles.helpIcon} />
          <div>질문 작성 도움말</div>
        </div>
      </div>
    </div>
  );
};

export default QuestionEditPage;
