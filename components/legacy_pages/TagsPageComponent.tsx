import React from "react";
import styles from "../../styles/TagsPageComponent.module.scss";
import { Button, OutlinedInput, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TagBoxComponent from "../reused/TagBoxComponent";

const TagsPageComponent = () => {
  const a = [];
  for (let i = 0; i < 100; i++) {
    a.push(<TagBoxComponent />);
  }
  return (
    <div className={styles.tagsPage}>
      <div className={styles.tagsPageHeader}>
        <OutlinedInput
          className={styles.headerInput}
          id="input-with-icon-adornment"
          placeholder="find your tags"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
        <div className={styles.buttonWrapper}>
          <Button className={styles.button} variant="contained">
            정렬 기준
          </Button>
          <Button className={styles.button} variant="contained">
            정렬 기준
          </Button>
          <Button className={styles.button} variant="contained">
            정렬 기준
          </Button>
        </div>
      </div>
      <div className={styles.tagsPageBody}>{a}</div>
      <footer></footer>
    </div>
  );
};

export default TagsPageComponent;
