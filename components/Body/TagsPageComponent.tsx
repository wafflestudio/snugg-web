import React from "react";
import styles from "../../styles/TagsPageComponent.module.scss";
import { Button, OutlinedInput, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TagBoxComponent from "../Reused/TagBoxComponent";

const TagsPageComponent = () => {
  const a = [];
  for (let i = 0; i < 5; i++) {
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
      <div className={styles.tagsPageBody}>
        <ul className={styles.tagLine}>{a}</ul>
        <ul className={styles.tagLine}>{a}</ul>
        <ul className={styles.tagLine}>{a}</ul>
        <ul className={styles.tagLine}>{a}</ul>
        <ul className={styles.tagLine}>{a}</ul>
        <ul className={styles.tagLine}>{a}</ul>
        <ul className={styles.tagLine}>{a}</ul>
        <ul className={styles.tagLine}>{a}</ul>
        <ul className={styles.tagLine}>{a}</ul>
      </div>
    </div>
  );
};

export default TagsPageComponent;
