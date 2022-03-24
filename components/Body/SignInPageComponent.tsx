import { FC, useState } from "react";
import {
  BookShapeComponent,
  bottomTextStyle,
  inputStyle,
  PageItem,
} from "../Reused/BookShapeComponent";
import styles from "../../styles/SignInPage.module.scss";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { EmailOutlined, LockOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import GoogleLogin from "react-google-login";
import Image from "next/image";
import KakaoLogin from "../../public/images/kakaoLogin.png";
import NaverLogin from "../../public/images/naverLogin.png";
import NextLink from "next/link";
import Link from "@mui/material/Link";

interface Props {
  onFormSubmit: (email: string, password: string) => void;
}

export const SignInPage: FC<Props> = ({ onFormSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <BookShapeComponent>
      <PageItem>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            onFormSubmit(email, password);
          }}
        >
          <div className={styles.inputContainer}>
            <OutlinedInput
              className={inputStyle}
              placeholder={"이메일을 입력하세요"}
              startAdornment={
                <InputAdornment position="start">
                  <EmailOutlined />
                </InputAdornment>
              }
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type={"email"}
              fullWidth
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <OutlinedInput
              className={inputStyle}
              placeholder={"비밀번호를 입력하세요"}
              startAdornment={
                <InputAdornment position="start">
                  <LockOutlined />
                </InputAdornment>
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={"password"}
              fullWidth
              required
            />
          </div>
          <div className={styles.signInContainer}>
            <Button
              variant="outlined"
              className={styles.signInButton}
              type="submit"
            >
              이메일로 로그인
            </Button>
          </div>
        </form>
      </PageItem>
      <div>
        <Divider>또는</Divider>
      </div>
      <PageItem>
        <ul className={styles.signInContainer}>
          <li className={styles.signInButton}>
            <GoogleLogin clientId={""} className={styles.google} />
          </li>
          <li className={styles.signInButton}>
            <a href="https://www.kakaocorp.com">
              <Image src={KakaoLogin} alt={"카카오 로그인"} />
            </a>
          </li>
          <li className={styles.signInButton}>
            <a href="https://www.naver.com">
              <Image src={NaverLogin} alt={"네이버 로그인"} />
            </a>
          </li>
        </ul>
      </PageItem>
      <div className={bottomTextStyle}>
        아직 회원이 아니신가요?{" "}
        <NextLink href={"signup"} passHref>
          <Link>회원가입하기</Link>
        </NextLink>
      </div>
    </BookShapeComponent>
  );
};
