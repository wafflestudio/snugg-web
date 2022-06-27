import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import HelpIcon from "@mui/icons-material/Help";

import styles from "./styles.module.scss";
import {
  Select,
  MenuItem,
  Chip,
  Input,
  SelectChangeEvent,
  Button,
} from "@mui/material";
import QuestionEditor from "../../../reused/QuestionEditor";
import React, { useState } from "react";
import { createPost } from "../../../../store/posts";
import { useAppDispatch, useAppSelector } from "../../../../store";
import axios from "axios";

const QuestionAskPage = () => {
  const [field, setField] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const [tagInput, setTagInput] = useState<string>("");
  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const [images, setImages] = useState<any[]>([]);
  const formData = new FormData();

  const token = useAppSelector((state) => state.users.data?.token.access);

  const dispatch = useAppDispatch();
  const handleCreatePost = (
    field: string,
    title: string,
    content: string,
    tags: string[],
    token: string
  ) => {
    const params = { field, title, content, tags };
    dispatch(createPost({ params, token }))
      .then((action) => {
        if (createPost.fulfilled.match(action)) {
          alert("질문 등록 완료");
          if (images.length > 0) {
            formData.append(
              "key",
              `${action.payload.presigned.fields.key}${images[0].name}`
            );
            formData.append("file", images[0]);
            axios
              .post(action.payload.presigned.url, formData)
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        } else if (createPost.rejected.match(action)) {
          alert("질문 등록 실패");
        }
      })
      .catch((reason) => {
        alert(`질문 등록 실패 ${reason}`);
      });
    console.log(field, title, content, tags);
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
        </div>
        <QuestionEditor
          setContent={setContent}
          content={"질문을 입력하세요."}
          setImages={setImages}
          images={images}
        />
        <Button
          className={styles.button}
          onClick={() => {
            if (token !== undefined) {
              handleCreatePost(field, title, content, tags, token);
            } else {
              alert("로그인하세요.");
            }
          }}
        >
          질문 등록하기
        </Button>
      </div>
      <div className={styles.sideContainer}>
        <div className={styles.category}>
          <div className={styles.sideTitle}>전공분야</div>
          <Select
            className={styles.categorySelect}
            defaultValue={""}
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

export default QuestionAskPage;
