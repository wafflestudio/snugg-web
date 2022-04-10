import { NextPage } from "next";

import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import HelpIcon from "@mui/icons-material/Help";

import styles from "../../styles/QuestionPage.module.scss";
import { Select, FormControl, MenuItem, Chip, Input } from "@mui/material";
import TextEditor from "../../components/Reused/TextEditor";
import React, { useState } from "react";

interface Props {}

const QuestionPage: NextPage<Props> = () => {
  const [tags, setTags] = useState<Array<string>>([]);
  const [tagInput, setTagInput] = useState("");
  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <div className={styles.title}>질문하기</div>
        <div className={styles.questionTitle}>
          <CreateOutlinedIcon className={styles.icon} />
          <Input className={styles.titleInput} placeholder="제목을 입력하세요." />
        </div>
        <TextEditor />
        <button className={styles.button}>질문 등록하기</button>
      </div>
      <div className={styles.sideContainer}>
        <div className={styles.category}>
          <div className={styles.sideTitle}>전공분야</div>
          <FormControl>
            <Select className={styles.categorySelect}>
              <MenuItem value={"컴퓨터공학"}>컴퓨터공학</MenuItem>
              <MenuItem value={"통계학"}>통계학</MenuItem>
              <MenuItem value={"기타"}>기타</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={styles.tag}>
          <div className={styles.sideTitle}># 태그</div>
          <Input
            className={styles.tagInput}
            value={tagInput}
            placeholder="태그 입력 후 Enter를 누르세요."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTagInput(e.target.value)}
            onKeyPress={addTag}
          />
          <div className={styles.tagList}>
            {tags.map((item) => {
              return <Chip className={styles.chip} label={item} key={item} variant="outlined" />;
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

QuestionPage.displayName = "QuestionPage";

export default QuestionPage;
