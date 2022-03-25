import { FunctionComponent } from "react";
import styles from "../../styles/UnAuthPage.module.scss";
import { Button } from "@mui/material";
import NextLink from "next/link";

interface Props {}

export const UnAuthPage: FunctionComponent<Props> = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        아고라는 대학 인증을 완료한 유저만 사용 가능합니다.
        <br />
        아래 버튼을 눌러 인증을 완료해주세요.
      </div>
      <NextLink href={"auth"} passHref>
        <Button className={styles.button} variant="contained">인증하기</Button>
      </NextLink>
    </div>
  );
};
