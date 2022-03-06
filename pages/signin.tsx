import { NextPage } from "next";
import NextLink from "next/link";
import Image from "next/image";
import Divider from "@mui/material/Divider";
import OutlinedInput from "@mui/material/OutlinedInput";
import Link from "@mui/material/Link";
import GoogleLogin from "react-google-login";

import InputAdornment from "@mui/material/InputAdornment";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import SnuggLogo from "../public/images/snuggLogo.png";
import KakaoLogin from "../public/images/kakaoLogin.png";
import NaverLogin from "../public/images/naverLogin.png";

import styles from "../styles/SignInPage.module.scss";
import { useState } from "react";

interface Props {}

const SignInPage: NextPage<Props> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onFormSubmit = () => alert(`${email}:${password}`);
  return (
    <div className={styles.container}>
      <div className={`${styles.page} ${styles.left}`}>
        <div className={styles.pageItem}>
          <div className={styles.iconsContainer}>
            <Image src={"/images/dna.svg"} width={100} height={100} />
            <Image src={"/images/atom.svg"} width={100} height={100} />
            <Image src={"/images/chemistry.svg"} width={100} height={100} />
            <Image src={"/images/flask.svg"} width={100} height={100} />
          </div>
          <div className={styles.snugg}>SNUGG</div>
        </div>
        <div>
          <hr />
        </div>
        <div className={styles.pageItem}>
          <div className={styles.description}>있어 보이는 멘트를 넣어요</div>
          <div className={styles.iconsContainer}>
            <Image src={"/images/statistics.svg"} width={100} height={100} />
            <Image src={"/images/book.svg"} width={100} height={100} />
            <Image src={"/images/book.svg"} width={100} height={100} />
            <Image src={"/images/book.svg"} width={100} height={100} />
          </div>
        </div>
      </div>
      <div className={`${styles.page} ${styles.right}`}>
        <div className={styles.pageItem}>
          <div className={styles.logoContainer}>
            <Image src={SnuggLogo} alt={"SNUGG"} />
          </div>
          <form>
            <h3>이메일로 로그인하기</h3>
            <div className={styles.inputContainer}>
              <OutlinedInput
                className={styles.input}
                placeholder={"이메일을 입력하세요"}
                startAdornment={
                  <InputAdornment position="start">
                    <EmailOutlinedIcon />
                  </InputAdornment>
                }
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                inputProps={{
                  onKeyDown(e) {
                    if (e.key === "Enter") onFormSubmit();
                  },
                }}
                type={"email"}
                fullWidth
              />
            </div>
            <div className={styles.inputContainer}>
              <OutlinedInput
                className={styles.input}
                placeholder={"비밀번호를 입력하세요"}
                startAdornment={
                  <InputAdornment position="start">
                    <PasswordOutlinedIcon />
                  </InputAdornment>
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                inputProps={{
                  onKeyDown(e) {
                    if (e.key === "Enter") onFormSubmit();
                  },
                }}
                type={"password"}
                fullWidth
              />
            </div>
          </form>
        </div>
        <div>
          <Divider>또는</Divider>
        </div>
        <div className={styles.pageItem}>
          <ul className={styles.socialContainer}>
            <li className={styles.social}>
              <GoogleLogin clientId={""} className={styles.google} />
            </li>
            <li className={styles.social}>
              <a href="https://www.kakaocorp.com">
                <Image src={KakaoLogin} alt={"카카오 로그인"} />
              </a>
            </li>
            <li className={styles.social}>
              <a href="https://www.naver.com">
                <Image src={NaverLogin} alt={"네이버 로그인"} />
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.registerContainer}>
          아직 회원이 아니신가요?{" "}
          <NextLink href={"signup"}>
            <Link>회원가입하기</Link>
          </NextLink>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
