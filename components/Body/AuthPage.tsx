import { FormEventHandler, FunctionComponent, useState } from "react";
import styles from "../../styles/AuthPage.module.scss";
import {
  Autocomplete,
  Button,
  FilterOptionsState,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import * as Hangul from "hangul-js";

interface Props {}

const ADMISSION_YEARS = ((begin: number, end: number) => {
  const result = [];
  for (let i = end; i >= begin; --i) result.push(i);
  return result;
})(2000, 2022);
const MAJORS = ["컴퓨터공학부", "통계학과", "수리과학부", "경영학부"];
const DEGREES = ["학부", "졸업", "대학원", "석·박사"];
const SCHOOLS = ["서울대학교", "고려대학교", "연세대학교"];

export const AuthPage: FunctionComponent<Props> = () => {
  const onSchoolEmailVerify = () => {};

  const [school, setSchool] = useState<string>("");
  const [email, setEmail] = useState("");
  const [admissionYear, setAdmissionYear] = useState<number | null>(null);
  const [major, setMajor] = useState<string>("");
  const [degree, setDegree] = useState(DEGREES[0]);

  const onFormSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    alert(`${school} : ${email} : ${admissionYear} : ${major} : ${degree}`);
  };
  const filterOptions = (
    options: string[],
    state: FilterOptionsState<string>
  ) => {
    const searcher = new Hangul.Searcher(state.inputValue);
    return options.filter((value) => searcher.search(value) != -1);
  };

  return (
    <div className={styles.container} onSubmit={onFormSubmit}>
      <form className={styles.form}>
        <InputLabel htmlFor="school" className={styles.label}>
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
              required
            />
          )}
          value={school ? school : null}
          onChange={(e, value) => setSchool(value ?? "")}
          noOptionsText="학교를 찾을 수 없습니다"
          filterOptions={filterOptions}
          autoSelect
        />
        <InputLabel htmlFor="school-mail-verification" className={styles.label}>
          학교 메일 인증
        </InputLabel>
        <OutlinedInput
          className={`${styles.schoolEmail} ${styles.input}`}
          id="school-mail-verification"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          type="email"
          placeholder="학교 이메일을 입력하세요"
          required
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
        <Select
          className={styles.input}
          id="admission-year"
          fullWidth
          value={admissionYear ?? ""}
          onChange={(e) => {
            const value = e.target.value;
            setAdmissionYear(value ? Number(value) : null);
          }}
          displayEmpty
        >
          <MenuItem value="">
            <span className={styles.placeholder}>학번을 선택하세요</span>
          </MenuItem>
          {ADMISSION_YEARS.map((value) => (
            <MenuItem key={value} value={value}>
              {value}년
            </MenuItem>
          ))}
        </Select>
        <InputLabel htmlFor="major" className={styles.label}>
          전공
        </InputLabel>
        <Select
          className={styles.input}
          id="major"
          fullWidth
          value={major ?? ""}
          onChange={(e) => setMajor(e.target.value)}
          displayEmpty
        >
          <MenuItem value="">
            <span className={styles.placeholder}>전공을 선택하세요</span>
          </MenuItem>
          {MAJORS.map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
        <InputLabel htmlFor="degree" className={styles.label}>
          과정
        </InputLabel>
        <ToggleButtonGroup
          exclusive
          fullWidth
          value={degree}
          onChange={(event, value) => value && setDegree(value)}
        >
          {DEGREES.map((value) => (
            <ToggleButton
              value={value}
              key={value}
              className={styles.degreeButton}
            >
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
