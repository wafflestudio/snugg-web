import { NextPage } from "next";
import AuthModal from "../components/reused/profile/AuthModal";

const TestPageContainer: NextPage = () => {
  const ADMISSION_YEARS = ((begin: number, end: number) => {
    const result = [];
    for (let i = end; i >= begin; --i) result.push(i);
    return result;
  })(2000, 2022);
  const MAJORS = ["컴퓨터공학부", "통계학과", "수리과학부", "경영학부"];
  const DEGREES = ["학부", "졸업", "대학원", "석·박사"];
  const SCHOOLS = ["서울대학교", "고려대학교", "연세대학교"];
  return <div style={{
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }}>
    <AuthModal admissionYears={ADMISSION_YEARS} majors={MAJORS} degrees={DEGREES} schools={SCHOOLS}
               onSchoolEmailVerify={() => {
               }}  onSubmit={(x) => alert(JSON.stringify(x))}/>
  </div>;
};

export default TestPageContainer;
