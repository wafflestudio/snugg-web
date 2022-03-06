import React from 'react';
import styles from '../../styles/Profile.module.scss'
import Image from "next/image";
import testImg from "../../Image/magnifier.svg";
import EditIcon from "../../Image/edit_icon_151377.svg";
import TagStatBox from "../Reused/TagStatBox";
import SimplifiedPreview from "../Reused/SimplifiedPreview";
import PlusIcon from "../../Image/plus.svg";

interface props {
    id: number
}

const Profile = (props:props) => {
    return (
        <div className={styles.profile}>
            <div className={styles.profileLeft}>
                <div className={styles.profileLeftUp}>
                    <div className={styles.profileInfo}>
                        <div className={styles.profileImg}>
                            <Image src={testImg} width={100} height={100}></Image>
                        </div>
                        <div className={styles.profileNameNPoint}>
                            <div className={styles.profileName}>
                                홍길동
                            </div>
                            <div className={styles.profilePoint}>
                                100point
                            </div>
                        </div>

                    </div>
                    <div className={styles.profileBio}>
                        한줄 소개: 가나다라마바사아자차카타파하
                    </div>
                    <div className={styles.profileSchoolInfos}>
                        <div className={styles.SchoolInfo}>
                            <div>
                                <span style={{marginRight:"10px", marginLeft:"10px"}}>학교:</span>
                                <span>서울대학교</span>
                            </div>
                            <div className={styles.SchoolInfoIcon} style={{display:"flex", alignItems:"center", marginRight:"10px"}} >
                                <Image  src={EditIcon}></Image>
                            </div>
                        </div>
                        <div className={styles.SchoolInfo}>
                            <div>
                                <span style={{marginRight:"10px", marginLeft:"10px"}}>학과:</span>
                                <span>컴퓨터공학부</span>
                            </div>
                            <div className={styles.SchoolInfoIcon} style={{display:"flex", alignItems:"center", marginRight:"10px"}} >
                                <Image src={EditIcon}></Image>
                            </div>
                        </div>
                        <div className={styles.SchoolInfo}>
                            <div>
                                <span style={{marginRight:"10px", marginLeft:"10px"}}>학년:</span>
                                <span>3학년</span>
                            </div>
                            <div className={styles.SchoolInfoIcon} style={{display:"flex", alignItems:"center", marginRight:"10px"}} >
                                <Image src={EditIcon}></Image>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.profileStat}>
                    <div className={styles.profileStatHeader}>
                        <span className={styles.profileStatHeaderText}>Statistics</span>
                        <div className={styles.profileStatHeaderButtons}>
                            <button className={styles.profileStatHeaderButton}>태그</button>
                            <button className={styles.profileStatHeaderButton}>전공 분야</button>
                        </div>
                    </div>
                    <div className={styles.profileStatBody}>
                        <div className={styles.Boxes}>
                            <TagStatBox/>
                            <TagStatBox/>
                        </div>
                        <div className={styles.Boxes}>
                            <TagStatBox/>
                            <TagStatBox/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.profileRight}>
                <div className={styles.profileQuestions}>
                    <div className={styles.profileQuestionsHeader}>
                        <span className={styles.profileQuestionsHeaderText}>내가 쓴 질문</span>
                        <div className={styles.showMoreButton}>
                            <span className={styles.showMoreButtonText}>더보기</span>
                            <Image src={PlusIcon}/>
                        </div>
                    </div>
                    <div className={styles.profileQuestionsBody}>
                        <div className={styles.Previews}>
                            <SimplifiedPreview></SimplifiedPreview>
                            <SimplifiedPreview></SimplifiedPreview>
                        </div>
                        <div className={styles.Previews}>
                            <SimplifiedPreview></SimplifiedPreview>
                            <SimplifiedPreview></SimplifiedPreview>
                        </div>
                        <div className={styles.Previews}>
                            <SimplifiedPreview></SimplifiedPreview>
                            <SimplifiedPreview></SimplifiedPreview>
                        </div>
                    </div>
                </div>
                <div className={styles.profileQuestions}>
                    <div className={styles.profileQuestionsHeader}>
                        <span className={styles.profileQuestionsHeaderText}>내가 쓴 답변</span>
                        <div className={styles.showMoreButton}>
                            <span className={styles.showMoreButtonText}>더보기</span>
                            <Image src={PlusIcon}/>
                        </div>
                    </div>
                    <div className={styles.profileQuestionsBody}>
                        <div className={styles.Previews}>
                            <SimplifiedPreview></SimplifiedPreview>
                            <SimplifiedPreview></SimplifiedPreview>
                        </div>
                        <div className={styles.Previews}>
                            <SimplifiedPreview></SimplifiedPreview>
                            <SimplifiedPreview></SimplifiedPreview>
                        </div>
                        <div className={styles.Previews}>
                            <SimplifiedPreview></SimplifiedPreview>
                            <SimplifiedPreview></SimplifiedPreview>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;