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
  const [initContent, setInitContent] = useState<JSONContent>({});
  const [content, setContent] = useState<JSONContent>({});

  useEffect(() => {
    if (initialValue !== undefined) {
      setField(initialValue.field);
      setTags(initialValue.tags);
      setTitle(initialValue.title);
      try {
        setInitContent(JSON.parse(initialValue.content));
      } catch (e) {
        if (e instanceof SyntaxError) {
          const json = generateJSON(initialValue.content, editorExtensions);
          setInitContent(json);
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
            placeholder="????????? ???????????????."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            value={title}
          />
        </div>
        <QuestionEditor setContent={setContent} initialContent={initContent} />
        <Button
          className={styles.button}
          onClick={(e) => {
            e.preventDefault();
            onSubmit(field, title, content, tags);
          }}
        >
          {submitLabel}
        </Button>
      </div>
      <div className={styles.sideContainer}>
        <div className={styles.category}>
          <div className={styles.sideTitle}>????????????</div>
          <Select
            className={styles.categorySelect}
            defaultValue={""}
            onChange={(e) => setField(e.target.value)}
          >
            <MenuItem value={"???????????????"}>???????????????</MenuItem>
            <MenuItem value={"?????????"}>?????????</MenuItem>
            <MenuItem value={"?????????"}>?????????</MenuItem>
            <MenuItem value={"??????"}>??????</MenuItem>
          </Select>
        </div>
        <div className={styles.tag}>
          <div className={styles.sideTitle}># ??????</div>
          <Input
            className={styles.tagInput}
            value={tagInput}
            placeholder="?????? ?????? ??? Enter??? ????????????."
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
          <div>?????? ?????? ?????????</div>
        </div>
      </div>
    </div>
  );
};

export default QuestionEditTemplate;
