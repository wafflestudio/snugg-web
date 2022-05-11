import React from "react";
import styles from "../../../styles/header/UpperHeader.module.scss";
import Magnifier from "../../../Image/magnifier.svg";
import Image from "next/image";

const UpperHeader = () => {
  return (
    <div className={styles.header1}>
      <span className={styles.headerText}>SNUGG</span>
      <div className={styles.searchLabel}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder={"검색어를 입력하세요."}
        />
        <Image src={Magnifier} />
      </div>
      <div className={styles.profileEclipse}>
        <Image src={Magnifier} />
      </div>
    </div>
  );
};

export default UpperHeader;
