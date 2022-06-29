import React, { FC } from "react";
import styles from "./styles.module.scss";

import testImg from "../../../Image/magnifier.svg";
import EditIcon from "../../../Image/edit_icon_151377.svg";
import DiamondIcon from "@mui/icons-material/Diamond";
import PushPinIcon from "@mui/icons-material/PushPin";
import ListIcon from "@mui/icons-material/List";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CheckIcon from "@mui/icons-material/Check";

import Image from "next/image";
import { Button } from "@mui/material";
import SimplifiedPreview from "../../reused/question/SimplifiedPreview";

interface props {
  id: number;
}

const ProfilePage: FC<props> = () => {
  const introductionText = "안녕하세요 \n 가나다라마바사아자차카타파하";

  return (
    <div className={styles.profile}>
      <div className={styles.profileLeft}>
        <div className={styles.basicProfile}>
          <div className={styles.basicProfileEdit}>
            <Button className={styles.editIcon}>
              <Image src={EditIcon} width={30} height={30} alt={"Edit"} />
            </Button>
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
                <div className={styles.username}>USERNAME</div>
                <div className={styles.point}>
                  <DiamondIcon className={styles.pointIcon} />
                  <div>30p</div>
                </div>
              </div>
            </div>
            <div className={styles.basicProfileDown}>
              <div className={styles.introduction}>
                <PushPinIcon className={styles.pinIcon} />
                <div>소개</div>
              </div>
              <div className={styles.introductionTextBox}>
                <div className={styles.introductionText}>
                  {introductionText}
                </div>
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
            <ListIcon className={styles.listIcon} />
          </div>
        </div>
        <div className={styles.accountManager}>
          <Button variant="contained">비밀번호 변경</Button>
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
