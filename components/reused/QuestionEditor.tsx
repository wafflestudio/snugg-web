import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { FC } from "react";

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
  setContent: React.Dispatch<React.SetStateAction<string>>;
  content: string;
}

const QuestionEditor: FC<Props> = ({ setContent, content }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
      Image,
    ],
    content: content,
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
  });

  const addImage = (e: any) => {
    e.preventDefault();
    let imageInput = document.getElementById("image-input");
    imageInput?.click();
  };

  const convertImage = (e: any) => {
    const imageReader = new FileReader();
    imageReader.readAsDataURL(e.target.files[0]);
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
        <button onClick={addImage}>
          <ImageIcon />
        </button>
        <input
          className={styles.imageInput}
          type="file"
          id="image-input"
          accept="image/jpg, image/png, image/jpeg"
          onChange={convertImage}
        />
      </div>
      <EditorContent editor={editor} className={styles.writer} />
    </div>
  );
};

export default QuestionEditor;
