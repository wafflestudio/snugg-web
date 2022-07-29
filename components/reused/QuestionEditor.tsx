import {
  EditorContent,
  JSONContent,
  PureEditorContent,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import {
  ChangeEventHandler,
  FC,
  MouseEventHandler,
  useEffect,
  useRef,
} from "react";

import styles from "../../styles/QuestionEditor.module.scss";

import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatStrikethroughIcon from "@mui/icons-material/FormatStrikethrough";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ImageIcon from "@mui/icons-material/Image";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";

interface Props {
  setContent: (newValue: JSONContent) => void;
  initialContent: JSONContent;
}

export const editorExtensions = [
  StarterKit,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Highlight,
  Image,
];

const QuestionEditor: FC<Props> = ({ setContent, initialContent }) => {
  const editor = useEditor({
    content: initialContent,
    extensions: editorExtensions,
    onUpdate({ editor }) {
      setContent(editor.getJSON());
    },
  });

  useEffect(() => {
    editor?.chain().setContent(initialContent).run();
  }, [editor, initialContent]);

  const imageInput = useRef<HTMLInputElement>(null);
  const editorContent = useRef<PureEditorContent>(null);

  const addImage: MouseEventHandler = (e) => {
    e.preventDefault();
    imageInput.current?.click();
  };

  const convertImage: ChangeEventHandler<HTMLInputElement> = (e) => {
    const imageReader = new FileReader();
    const file = e.target.files ? e.target.files[0] : null;
    if (file === null) return;
    imageReader.readAsDataURL(file);
    imageReader.onload = () => {
      if (typeof imageReader.result == "string") {
        editor?.chain().focus().setImage({ src: imageReader.result }).run();
      }
    };
  };

  if (!editor) {
    return null;
  }
  return (
    <div
      className={styles.editor}
      onClick={() => {
        editor?.chain().focus().run();
      }}
    >
      <div className={styles.menubar} onClick={(e) => e.stopPropagation()}>
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          <FormatBoldIcon />
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          <FormatItalicIcon />
        </button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()}>
          <FormatStrikethroughIcon />
        </button>
        <button onClick={() => editor.chain().focus().toggleHighlight().run()}>
          <BorderColorIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          <FormatAlignLeftIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          <FormatAlignCenterIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          <FormatAlignRightIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        >
          <FormatAlignJustifyIcon />
        </button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <FormatListBulletedIcon />
        </button>
        <button onClick={addImage}>
          <ImageIcon />
        </button>
        <input
          ref={imageInput}
          className={styles.imageInput}
          type="file"
          accept="image/jpg, image/png, image/jpeg"
          onChange={convertImage}
        />
      </div>
      <EditorContent
        editor={editor}
        className={styles.writer}
        ref={editorContent}
      />
    </div>
  );
};

export default QuestionEditor;
