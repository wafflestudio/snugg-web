import React, { useEffect, useState } from "react";
import styles from "/styles/AgoraSearchHeader.module.scss";
import { InputAdornment, OutlinedInput } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  content: string | null;
}

const AgoraSearchHeader = (props: Props) => {
  const [value, setValue] = useState<string | null>();
  useEffect(() => {
    setValue(props.content);
  }, []);
  return (
    <div className={styles.header}>
      <OutlinedInput
        className={styles.headerInput}
        id="input-with-icon-adornment"
        placeholder="강의를 검색하세요."
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        }
      />
    </div>
  );
};

export default AgoraSearchHeader;
