import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { FC } from "react";

import styles from "../../styles/AnswerEditor.module.scss";

import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatStrikethroughIcon from "@mui/icons-material/FormatStrikethrough";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Highlight from "@tiptap/extension-highlight";

interface Props {
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

const AnswerEditor: FC<Props> = ({ setContent }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
    ],
    content: "답변을 입력하세요.",
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }
  return (
    <div className={styles.editor}>
      <div className={styles.menubar}>
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
      </div>
      <EditorContent editor={editor} className={styles.writer} />
    </div>
  );
};

export default AnswerEditor;
