import React, { FC, useState } from "react";
import styles from "./styles.module.scss";

import testImg from "../../../../Image/magnifier.svg";
import EditIcon from "../../../../Image/edit_icon_151377.svg";
import DiamondIcon from "@mui/icons-material/Diamond";
import PushPinIcon from "@mui/icons-material/PushPin";
import ListIcon from "@mui/icons-material/List";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CheckIcon from "@mui/icons-material/Check";
import SaveIcon from "@mui/icons-material/Save";

import Image from "next/image";
import { Button, Input, OutlinedInput, TextField } from "@mui/material";
import SimplifiedPreview from "../../../reused/question/SimplifiedPreview";
import PasswordModal from "../PasswordModal";
import EditMajorModal from "../../../reused/profile/EditMajorModal";
import PointModal from "../../../reused/profile/PointModal";
import { User } from "store/api/injected";
import { enhancedApi } from "store/api/enhanced";
import { toast } from "react-toastify";
import { errorToString } from "utility";
import { selectAccessToken, useAppSelector } from "store";
import api, { withToken } from "api";

interface props {
  id: number;
  profile: User;
}

const ProfilePage: FC<props> = ({ profile }) => {
  const majorSample = [
    {
      school: "서울대학교",
      email: "snugg@snu.ac.kr",
      admissionYear: 2019,
      major: "컴퓨터공학부",
      degree: "학부생",
    },
  ];

  const [pwOpen, setPwOpen] = useState(false);
  const [majorOpen, setMajorOpen] = useState(false);
  const [pointOpen, setPointOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  const [username, setUsername] = useState(profile.username);
  const [introduction, setIntroduction] = useState(profile.self_introduction);

  // const [editProfile] = enhancedApi.useAuthProfileUpdateMutation();
  // const handleEditProfile = async () => {
  //   const result = await editProfile({
  //     userRequest: {
  //       email: profile.email,
  //       username: username ? username : profile.username,
  //       birth_date: profile.birth_date,
  //       self_introduction: introduction,
  //     },
  //   });
  //   if ("data" in result) {
  //     toast.success("프로필 수정 완료");
  //     setEdit(false);
  //   } else {
  //     toast.error("프로필 수정 실패: " + errorToString(result.error));
  //     setEdit(false);
  //   }
  // };

  const token = useAppSelector(selectAccessToken);
  console.log(token);
  const handleEditProfile = async () => {
    if (token) {
      const params = {
        email: "snugg@gmail.com",
        username: "snu",
        // birth_date: "2022-02-02",
        // self_introduction: "hello",
      };
      const result = await api.updateProfile(params, token);
      console.log(result);
      // if ("data" in result) {
      //   toast.success("프로필 수정 완료");
      //   setEdit(false);
      // } else {
      //   toast.error("프로필 수정 실패: ");
      //   setEdit(false);
      // }
    } else {
      toast.error("로그인하세요.");
    }
  };

  return (
    <div className={styles.profile}>
      <div className={styles.profileLeft}>
        <div className={styles.basicProfile}>
          <div className={styles.basicProfileEdit}>
            {!edit && (
              <Button
                className={styles.editIcon}
                onClick={() => setEdit(!edit)}
              >
                <Image src={EditIcon} width={30} height={30} alt={"Edit"} />
              </Button>
            )}
            {edit && (
              <Button className={styles.editIcon} onClick={handleEditProfile}>
                <SaveIcon className={styles.saveIcon} />
              </Button>
            )}
          </div>
          <div className={styles.basicProfileMain}>
            <div className={styles.basicProfileUp}>
              <div className={styles.profileImage}>
                <Image
                  src={testImg}
                  width={"150px"}
                  height={"150px"}
                  alt={"Profile Img"}
                />
              </div>
              <div className={styles.basicProfileRight}>
                {!edit && (
                  <div className={styles.username}>{profile.username}</div>
                )}
                {edit && (
                  <OutlinedInput
                    value={username}
                    className={styles.usernameEdit}
                    inputProps={{ style: { textAlign: "center" } }}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                )}
                <div className={styles.point}>
                  <DiamondIcon className={styles.pointIcon} />
                  <div onClick={() => setPointOpen(true)}>30p</div>
                </div>
                <PointModal open={pointOpen} setOpen={setPointOpen} />
              </div>
            </div>
            <div className={styles.basicProfileDown}>
              <div className={styles.introduction}>
                <PushPinIcon className={styles.pinIcon} />
                <div>소개</div>
              </div>
              <div className={styles.introductionTextBox}>
                {!edit && (
                  <div className={styles.introductionText}>
                    {profile.self_introduction}
                  </div>
                )}
                {edit && (
                  <OutlinedInput
                    value={introduction}
                    className={styles.introductionTextEdit}
                    multiline={true}
                    inputProps={{ style: { textAlign: "center" } }}
                    onChange={(e) => setIntroduction(e.target.value)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.schoolInfo}>
          <div className={styles.schoolInfoLeft}>
            <div>서울대학교</div>
            <div>전공: 컴퓨터공학부</div>
            <div>과정: 학부생</div>
            <div>입학년도: 2019</div>
          </div>
          <div className={styles.schoolInfoRight}>
            <Button
              className={styles.editMajorButton}
              onClick={() => setMajorOpen(true)}
            >
              <ListIcon className={styles.listIcon} />
            </Button>
            <EditMajorModal
              majors={majorSample}
              open={majorOpen}
              setOpen={setMajorOpen}
            />
          </div>
        </div>
        <div className={styles.accountManager}>
          <Button variant="contained" onClick={() => setPwOpen(true)}>
            비밀번호 변경
          </Button>
          <PasswordModal open={pwOpen} setOpen={setPwOpen} />
          <Button variant="contained">회원탈퇴</Button>
        </div>
      </div>
      <div className={styles.profileRight}>
        <div className={styles.statistics}>
          <div>통계 (추가예정)</div>
        </div>
        <div className={styles.myQuestionAnswer}>
          <div className={styles.myQuestion}>
            <div className={styles.myQuestionHeader}>
              <div className={styles.myQuestionHeaderLeft}>
                <QuestionMarkIcon className={styles.myQuestionIcon} />
                <div>내가 쓴 질문</div>
              </div>
              <div className={styles.myQuestionHeaderRight}>
                <Button>더보기</Button>
              </div>
            </div>
            <div className={styles.myQuestionMain}>
              {[1, 2, 3, 4, 5].map((id) => (
                <SimplifiedPreview key={id} />
              ))}
            </div>
          </div>
          <div className={styles.myQuestion}>
            <div className={styles.myQuestionHeader}>
              <div className={styles.myQuestionHeaderLeft}>
                <CheckIcon className={styles.myQuestionIcon} />
                <div>내가 쓴 답변</div>
              </div>
              <div className={styles.myQuestionHeaderRight}>
                <Button>더보기</Button>
              </div>
            </div>
            <div className={styles.myQuestionMain}>
              {[1, 2, 3, 4, 5].map((id) => (
                <SimplifiedPreview key={id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
