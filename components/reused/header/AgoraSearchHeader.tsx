import React, { useEffect, useState } from "react";
import styles from "/styles/header/AgoraSearchHeader.module.scss";
import { InputAdornment, OutlinedInput } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";

interface Props {
  query: string | null;
}

const AgoraSearchHeader = (props: Props) => {
  const [value, setValue] = useState<string | null>();
  useEffect(() => {
    setValue(props.query);
  }, [props.query]);
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/agora?q=${value}`);
      }}
      className={styles.header}
    >
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
            <button className={styles.button}>
              <SearchIcon />
            </button>
          </InputAdornment>
        }
      />
    </form>
  );
};

export default AgoraSearchHeader;
