import { FC } from "react";
import styles from "../../../styles/root/BookShape.module.scss";
import Image from "next/image";

interface Props {}

export const BookShape: FC<Props> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.page} ${styles.left}`}>
        <div className={styles.pageItem}>
          <div className={styles.iconsContainer}>
            <Image
              src={"/images/dna.svg"}
              width={100}
              height={100}
              alt={"DNA"}
            />
            <Image
              src={"/images/atom.svg"}
              width={100}
              height={100}
              alt={"atom"}
            />
            <Image
              src={"/images/chemistry.svg"}
              width={100}
              height={100}
              alt={"chemistry"}
            />
            <Image
              src={"/images/flask.svg"}
              width={100}
              height={100}
              alt={"flask"}
            />
          </div>
          <div className={styles.snugg}>SNUGG</div>
        </div>
        <div>
          <hr />
        </div>
        <div className={styles.pageItem}>
          <div className={styles.description}>SNUGG에 질문하세요!</div>
          <div className={styles.iconsContainer}>
            <Image
              src={"/images/statistics.svg"}
              width={100}
              height={100}
              alt={"statistics"}
            />
            <Image
              src={"/images/book.svg"}
              width={100}
              height={100}
              alt={"book"}
            />
            <Image
              src={"/images/book.svg"}
              width={100}
              height={100}
              alt={"book"}
            />
            <Image
              src={"/images/book.svg"}
              width={100}
              height={100}
              alt={"book"}
            />
          </div>
        </div>
      </div>
      <div className={`${styles.page} ${styles.right}`}>
        <div className={styles.logoContainer}>SNUGG</div>
        {children}
      </div>
    </div>
  );
};

export const PageItem: FC = ({ children }) => {
  return <div className={styles.pageItem}>{children}</div>;
};

export const inputStyle = styles.input;
export const bottomTextStyle = styles.bottomText;
