import React, {
  ChangeEventHandler,
  FormEventHandler,
  useRef,
  useState,
} from "react";
import {
  BookShapeComponent,
  bottomTextStyle,
  inputStyle,
  PageItem,
} from "../Reused/BookShapeComponent";
import styles from "../../styles/SignupPage.module.scss";
import {
  Button,
  FormControl,
  FormHelperText,
  Link,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import {
  AccountCircleRounded,
  EmailOutlined,
  LockOutlined,
} from "@mui/icons-material";
import NextLink from "next/link";

const EMAIL_DOMAINS = ["snu.ac.kr", "gmail.com", "naver.com"];
const MESSAGE_ID_ALREADY_USED = "이미 사용되고 있는 아이디입니다";
const MESSAGE_PLEASE_VALIDATE_ID = "아이디 중복확인을 해주세요";
const PASSWORD_VALIDATION = {
  minLength: 3,
  maxLength: 10,
  pattern: "[0-9a-zA-Z]+",
};
const ID_VALIDATION = {
  minLength: 3,
  maxLength: 10,
  pattern: "[0-9a-zA-Z]+",
};

interface SignUpPageComponentParams {
  onFormSubmit: (
    email: string,
    id: string,
    name: string,
    password: string
  ) => void;
  validateId: (id: string) => boolean;
}

export function SignUpPage({
  onFormSubmit,
  validateId,
}: SignUpPageComponentParams) {
  const [emailUserName, setEmailUserName] = useState("");
  const [emailDomain, setEmailDomain] = useState(EMAIL_DOMAINS[0]);
  const [id, setId] = useState("");
  const [isIdValid, setIsIdValid] = useState<boolean | undefined>(undefined);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const idInput = useRef<HTMLInputElement>();

  const onIdChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (idInput.current) {
      idInput.current.setCustomValidity("");
    }
    setIsIdValid(undefined);
    setId(e.target.value);
  };
  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (isIdValid) {
      onFormSubmit(`${emailUserName}@${emailDomain}`, id, name, password);
    }

    if (idInput.current) {
      idInput.current.setCustomValidity(
        isIdValid
          ? ""
          : isIdValid === false
          ? MESSAGE_ID_ALREADY_USED
          : MESSAGE_PLEASE_VALIDATE_ID
      );
    }
  };
  const onIdValidate = () => {
    if (idInput.current && !idInput.current.checkValidity()) {
      idInput.current.reportValidity();
      return;
    }
    const valid = validateId(id);
    setIsIdValid(valid);
    alert(valid ? "valid!" : "invalid!");
    if (idInput.current) {
      idInput.current.setCustomValidity(valid ? "" : MESSAGE_ID_ALREADY_USED);
    }
  };
  return (
    <BookShapeComponent>
      <PageItem>
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.emailInputContainer}>
            <OutlinedInput
              className={`${styles.emailUserName} ${inputStyle}`}
              placeholder="이메일"
              startAdornment={
                <InputAdornment position="start">
                  <EmailOutlined fontSize="large" />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <span className={styles.at}>@</span>
                </InputAdornment>
              }
              required
              value={emailUserName}
              onChange={(e) => setEmailUserName(e.target.value)}
            />
            <Select
              className={`${styles.emailDomain} ${inputStyle}`}
              value={emailDomain}
              onChange={(e) => setEmailDomain(e.target.value)}
            >
              {EMAIL_DOMAINS.map((e) => (
                <MenuItem key={e} value={e}>
                  {e}
                </MenuItem>
              ))}
            </Select>
          </div>
          <FormControl fullWidth>
            <OutlinedInput
              className={inputStyle}
              placeholder="아이디"
              startAdornment={
                <InputAdornment position="start">
                  <div className={styles.idInputAdorn}>ID</div>
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <Button
                    className={styles.button}
                    variant="contained"
                    onClick={onIdValidate}
                    disabled={isIdValid !== undefined}
                  >
                    중복 확인
                  </Button>
                </InputAdornment>
              }
              fullWidth
              required
              value={id}
              onChange={onIdChange}
              inputRef={idInput}
              inputProps={ID_VALIDATION}
            />
            <FormHelperText>*자 ~ *자 이내의 영어 + 숫자 조합</FormHelperText>
          </FormControl>
          <OutlinedInput
            className={inputStyle}
            placeholder="이름"
            startAdornment={
              <InputAdornment position="start">
                <AccountCircleRounded fontSize="large" />
              </InputAdornment>
            }
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormControl fullWidth>
            <OutlinedInput
              className={inputStyle}
              placeholder="비밀번호"
              startAdornment={
                <InputAdornment position="start">
                  <LockOutlined fontSize="large" />
                </InputAdornment>
              }
              type="password"
              fullWidth
              required
              inputProps={PASSWORD_VALIDATION}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormHelperText>*자 ~ *자 이내의 영어 + 숫자 조합</FormHelperText>
          </FormControl>
          <div className={styles.centerChild}>
            <Button className={styles.button} variant="contained" type="submit">
              회원가입 완료하기
            </Button>
          </div>
        </form>
      </PageItem>
      <div className={bottomTextStyle}>
        이미 회원이신가요?{" "}
        <NextLink href="/signin" passHref>
          <Link>로그인하기</Link>
        </NextLink>
      </div>
    </BookShapeComponent>
  );
}
