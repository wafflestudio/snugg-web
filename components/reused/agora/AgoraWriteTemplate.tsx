import styles from "/styles/agora/AgoraWriteTemplate.module.scss";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { Button, Input } from "@mui/material";
import React, {
  FunctionComponent,
  KeyboardEventHandler,
  useEffect,
  useState,
} from "react";
import QuestionEditor, { editorExtensions } from "../QuestionEditor";
import { AgoraPostInfo, QuestionPost } from "../../../api";
import { generateJSON, JSONContent } from "@tiptap/react";

interface Props {
  header: string;
  submitLabel: string;
  onSubmit: (title: string, content: JSONContent) => void;
  initialValue?: AgoraPostInfo;
}

const AgoraWriteTemplate: FunctionComponent<Props> = ({
  header,
  initialValue,
  onSubmit,
  submitLabel,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<JSONContent>({});

  useEffect(() => {
    console.log("initial value changed");
    if (initialValue !== undefined) {
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
            onSubmit(title, content!!);
          }}
        >
          {submitLabel}
        </Button>
      </div>
    </div>
  );
};

export default AgoraWriteTemplate;
