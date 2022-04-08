import { NextPage } from "next";

import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import HelpIcon from "@mui/icons-material/Help";

import styles from "../../styles/QuestionPage.module.scss";
import { Select, FormControl, MenuItem } from "@mui/material";
import TextEditor from "../../components/Reused/TextEditor";

interface Props {}

const QuestionPage: NextPage<Props> = () => {
  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <div className={styles.title}>질문하기</div>
        <div className={styles.questionTitle}>
          <CreateOutlinedIcon className={styles.icon} />
          <input placeholder="제목을 입력하세요." />
        </div>
        <TextEditor />
        <button className={styles.button}>질문 등록하기</button>
      </div>
      <div className={styles.sideContainer}>
        <div className={styles.category}>
          <div className={styles.sideTitle}>전공분야</div>
          <FormControl>
            <Select className={styles.categorySelect}>
              <MenuItem>컴퓨터공학</MenuItem>
              <MenuItem>통계학</MenuItem>
              <MenuItem>기타</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={styles.tag}>
          <div className={styles.sideTitle}># 태그</div>
          <input placeholder="질문과 관련된 태그를 입력하세요." />
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
