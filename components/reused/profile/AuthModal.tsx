import {
  FormEventHandler,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import styles from "/styles/profile/AuthModal.module.scss";
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
import Hangul from "hangul-js";

export interface SchoolMajorInfo {
  school: string;
  email: string;
  admissionYear: number;
  major: string;
  degree: string;
}

interface Props {
  admissionYears: number[];
  majors: string[];
  degrees: string[];
  schools: string[];
  onSchoolEmailVerify: () => void;
  onSubmit: (authInfo: SchoolMajorInfo) => void;
  initialData?: SchoolMajorInfo;
}

const AuthModal: FunctionComponent<Props> = ({
  admissionYears,
  majors,
  degrees,
  schools,
  onSchoolEmailVerify,
  onSubmit,
  initialData,
}) => {
  const [school, setSchool] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [admissionYear, setAdmissionYear] = useState<number>();
  const [major, setMajor] = useState<string>();
  const [degree, setDegree] = useState<string>(degrees[0]);
  useEffect(() => {
    if (initialData !== undefined) {
      setSchool(initialData.school);
      setEmail(initialData.email);
      setAdmissionYear(initialData.admissionYear);
      setMajor(initialData.major);
      setDegree(initialData.degree);
    }
  }, [initialData]);

  const onFormSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (
      school === undefined ||
      email === undefined ||
      major === undefined ||
      admissionYear === undefined
    ) {
      return;
    }
    onSubmit({
      school,
      email,
      degree,
      major,
      admissionYear,
    });
  };
  const filterOptions = (
    options: string[],
    state: FilterOptionsState<string>
  ) => {
    const searcher = new Hangul.Searcher(state.inputValue);
    return options.filter((value) => searcher.search(value) != -1);
  };
  return (
    <form className={styles.form} onSubmit={onFormSubmit}>
      <InputLabel htmlFor="school" className={styles.label}>
        ??????
      </InputLabel>
      <Autocomplete
        className={styles.input}
        options={schools}
        popupIcon={<Search />}
        renderInput={(params) => (
          <TextField
            {...params}
            id="school"
            placeholder="????????? ???????????????"
            required
          />
        )}
        value={school ? school : null}
        onChange={(e, value) => setSchool(value ?? "")}
        noOptionsText="????????? ?????? ??? ????????????"
        filterOptions={filterOptions}
        autoSelect
      />
      <InputLabel htmlFor="school-mail-verification" className={styles.label}>
        ?????? ?????? ??????
      </InputLabel>
      <OutlinedInput
        className={`${styles.schoolEmail} ${styles.input}`}
        id="school-mail-verification"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        type="email"
        placeholder="?????? ???????????? ???????????????"
        required
      />
      <Button className={styles.button} fullWidth onClick={onSchoolEmailVerify}>
        ????????????
      </Button>
      <InputLabel htmlFor="admission-year" className={styles.label}>
        ????????????
      </InputLabel>
      <Select
        className={styles.input}
        id="admission-year"
        fullWidth
        value={admissionYear ?? ""}
        onChange={(e) => {
          const value = e.target.value;
          setAdmissionYear(value ? Number(value) : undefined);
        }}
        displayEmpty
      >
        <MenuItem value="">
          <span className={styles.placeholder}>????????? ???????????????</span>
        </MenuItem>
        {admissionYears.map((value) => (
          <MenuItem key={value} value={value}>
            {value}???
          </MenuItem>
        ))}
      </Select>
      <InputLabel htmlFor="major" className={styles.label}>
        ??????
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
          <span className={styles.placeholder}>????????? ???????????????</span>
        </MenuItem>
        {majors.map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
      <InputLabel htmlFor="degree" className={styles.label}>
        ??????
      </InputLabel>
      <ToggleButtonGroup
        exclusive
        fullWidth
        value={degree}
        onChange={(event, value) => value && setDegree(value)}
      >
        {degrees.map((value) => (
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
        ??????
      </Button>
    </form>
  );
};
export default AuthModal;
