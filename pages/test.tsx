import { NextPage } from "next";
import EditMajorModal from "../components/reused/profile/EditMajorModal";
import { SchoolMajorInfo } from "../components/reused/profile/AuthModal";

const TestPageContainer: NextPage = () => {
  const majors: SchoolMajorInfo[] = [
    {
      school: "서울대학교",
      major: "건설환경공학부",
      degree: "학사",
      admissionYear: 2017,
      email: "foo@snu.ac.kr"
    },
    {
      school: "서울대학교",
      major: "컴퓨터공학부",
      degree: "석사",
      admissionYear: 2022,
      email: "foo@snu.ac.kr"
    },
    {
      school: "MIT",
      major: "EECS",
      degree: "박사",
      admissionYear: 2024,
      email: "foo@mit.edu"
    },
  ]
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
    <EditMajorModal majors={majors}/>
  </div>;
};

export default TestPageContainer;
