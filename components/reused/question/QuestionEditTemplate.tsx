import styles from "/styles/quesiton/QuestionEditTemplate.module.scss";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { Button, Chip, Input, MenuItem, Select } from "@mui/material";
import React, {
  FunctionComponent,
  KeyboardEventHandler,
  useEffect,
  useState,
} from "react";
import QuestionEditor, { editorExtensions } from "../QuestionEditor";
import HelpIcon from "@mui/icons-material/Help";
import { QuestionPost } from "../../../api";
import { generateJSON, JSONContent } from "@tiptap/react";

interface Props {
  header: string;
  submitLabel: string;
  onSubmit: (
    field: string,
    title: string,
    content: JSONContent,
    tags: string[]
  ) => void;
  initialValue?: QuestionPost;
}

const QuestionEditTemplate: FunctionComponent<Props> = ({
  header,
  initialValue,
  onSubmit,
  submitLabel,
}) => {
  const [field, setField] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [content, setContent] = useState<JSONContent>({});

  useEffect(() => {
    console.log("initial value changed");
    if (initialValue !== undefined) {
      setField(initialValue.field);
      setTags(initialValue.tags);
      setTitle(initialValue.title);
      try {
        setContent(JSON.parse(initialValue.content));
      } catch (e) {
        if (e instanceof SyntaxError) {
          const json = generateJSON(initialValue.content, editorExtensions);
          setContent(json);
        } else {
          throw e;
        }
      }
    }
  }, [initialValue]);

  const [tagInput, setTagInput] = useState("");
  const addTag: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <div className={styles.title}>{header}</div>
        <div className={styles.questionTitle}>
          <CreateOutlinedIcon className={styles.icon} />
          <Input
            className={styles.titleInput}
            placeholder="제목을 입력하세요."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            value={title}
          />
        </div>
        <QuestionEditor setContent={setContent} content={content} />
        <Button
          className={styles.button}
          onClick={(e) => {
            e.preventDefault();
            onSubmit(field, title, content!!, tags);
          }}
        >
          {submitLabel}
        </Button>
      </div>
      <div className={styles.sideContainer}>
        <div className={styles.category}>
          <div className={styles.sideTitle}>전공분야</div>
          <Select
            className={styles.categorySelect}
            defaultValue={""}
            onChange={(e) => setField(e.target.value)}
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
            {tags.map((item) => (
              <Chip
                className={styles.chip}
                label={item}
                key={item}
                variant="outlined"
              />
            ))}
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

export default QuestionEditTemplate;
