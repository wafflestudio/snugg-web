import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import { ChangeEventHandler, FC } from "react";

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

import {v4 as uuid } from "uuid";

interface Props {
  setContent: (newValue: JSONContent) => void;
  content: JSONContent;
  setImages: (newValue: [string, File][]) => void;
  images: [string, File][];
}

const QuestionEditor: FC<Props> = ({
  setContent,
  content,
  setImages,
  images,
}) => {
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
      setContent(editor.getJSON());
    },
  });

  const addImage = (e: any) => {
    e.preventDefault();
    let imageInput = document.getElementById("file");
    imageInput?.click();
  };

  const convertImage: ChangeEventHandler<HTMLInputElement> = (e) => {
    const imageReader = new FileReader();
    const file = e.target.files ? e.target.files[0] : null;
    if (file === null) return;
    const ext = file.name.split('.').pop();
    imageReader.readAsDataURL(file);
    const replacedName = uuid() + '.' + ext;
    imageReader.onload = () => {
      if (typeof imageReader.result == "string") {
        editor?.chain().focus().setImage({ src: imageReader.result, alt: replacedName }).run();
      }
    };
    setImages([...images, [replacedName, file]]);
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
          id="file"
          accept="image/jpg, image/png, image/jpeg"
          onChange={convertImage}
        />
      </div>
      <EditorContent editor={editor} className={styles.writer} />
    </div>
  );
};

export default QuestionEditor;
