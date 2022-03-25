import { FormEventHandler, FunctionComponent } from "react";
import styles from "../../styles/AuthPage.module.scss";
import {
  Autocomplete,
  Button,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { onEnterDo } from "../../utility";

interface Props {}

const ADMISSION_YEARS = ((begin: number, end: number) => {
  const result = [];
  for (let i = begin; i <= end; ++i) result.push(i);
  return result;
})(2000, 2022);
const MAJORS = ["컴퓨터공학부", "통계학과", "수리과학부", "경영학부"];
const DEGREES = ["학부", "졸업", "대학원", "석·박사"];
const SCHOOLS = ["서울대학교", "고려대학교", "연세대학교"];

export const AuthPage: FunctionComponent<Props> = () => {
  const onFormSubmit: FormEventHandler = (e) => e.preventDefault();
  const onSchoolSearch = () => {};
  const onSchoolEmailVerify = () => {};
  return (
    <div className={styles.container} onSubmit={onFormSubmit}>
      <form className={styles.form}>
        <InputLabel
          htmlFor="school"
          onKeyDown={onEnterDo(onSchoolSearch)}
          className={styles.label}
        >
          학교
        </InputLabel>
        <Autocomplete
          className={styles.input}
          options={SCHOOLS}
          popupIcon={<Search />}
          renderInput={(params) => (
            <TextField
              {...params}
              id="school"
              placeholder="학교를 검색하세요"
            />
          )}
        />
        <InputLabel htmlFor="school-mail-verification" className={styles.label}>
          학교 메일 인증
        </InputLabel>
        <OutlinedInput
          className={`${styles.schoolEmail} ${styles.input}`}
          id="school-mail-verification"
          value="foobar@snu.ac.kr"
          fullWidth
          readOnly
        />
        <Button
          className={styles.button}
          fullWidth
          onClick={onSchoolEmailVerify}
        >
          인증하기
        </Button>
        <InputLabel htmlFor="admission-year" className={styles.label}>
          입학년도
        </InputLabel>
        <Select id="admission-year" fullWidth>
          {ADMISSION_YEARS.map((value) => (
            <MenuItem key={value} value={value}>
              {value}년
            </MenuItem>
          ))}
        </Select>
        <InputLabel htmlFor="major" className={styles.label}>
          전공
        </InputLabel>
        <Select id="major" fullWidth>
          {MAJORS.map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
        <InputLabel htmlFor="degree" className={styles.label}>
          과정
        </InputLabel>
        <ToggleButtonGroup exclusive fullWidth>
          {DEGREES.map((value) => (
            <ToggleButton value={value} key={value}>
              {value}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Button className={styles.button} type="submit" fullWidth>
          완료
        </Button>
      </form>
    </div>
  );
};
