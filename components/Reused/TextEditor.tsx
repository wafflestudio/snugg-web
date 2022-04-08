import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";

import styles from "../../styles/TextEditor.module.scss";

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

interface Props {}

const TextEditor = (props: Props) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"]
      }),
      Highlight
    ],
    content: "질문을 입력하세요."
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
        <button onClick={() => editor.chain().focus().setTextAlign("left").run()}>
          <FormatAlignLeftIcon />
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign("center").run()}>
          <FormatAlignCenterIcon />
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign("right").run()}>
          <FormatAlignRightIcon />
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign("justify").run()}>
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

export default TextEditor;
