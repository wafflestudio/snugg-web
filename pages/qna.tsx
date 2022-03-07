import { NextPage } from "next";
import Image from "next/image";

import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

import styles from "../styles/QuestionAnswerPage.module.scss";

interface Props {}

const QuestionAnswerPage: NextPage<Props> = () => {
  return (
      <div className={styles.container}>
          <div className={styles.mainContainer}>
              <div>
                  <div>
                      <QuestionMarkIcon />
                      <div>제목을 입력하세요</div>
                  </div>
                  <div>
                  Lörem ipsum tidade Dylanman blingbling rement. Får tiktiga huruvida Lasse Berghagen-vin medan plaheten, tetrar än oskapet för benade, osk iv även om neonetik oskade. Klickokrati okunyvis och rek inera monor de fasa bedan, förutom dösade, den rende som tadinade od, fanemis. Matnationalism redevis presk medan infranar om soktig. Demityp ultrare ponyledes autoprelig i nesm om vobba kroheten. Musikmobil metir flygskam. Syra vungar prehet bilig för att diaskapet sor åvönybelt nitt. Båra foliehatt, och begt de språkekonomi. Progisk as fånat än vöde eusade eftersom stadsutglesning ambitotal näfang eligen mena ifall heterott kontrafåd. Såpreränade blixad lare nymide intrara kaliga sedöngar embrejsa pasm så missade rist.
Orere niting trer pseudorade rerad och mikrodöligt göra i denas även om intraska en dogt deska. Begagon kror, om göbånar tödövis emedan gask, geos teosion båbel antropogram för att minnesprick. Pseudosogt olig utom fåtiligt när nedilingar den dibel digisk mikrorade plan infraderas, fanänat kvasira och ultraling. Tylur visade bilaligen os, polimani i poheten bande ett nyn euror så kjolprotest, realinade. Preppare anasa, om missa, duvis mipude, eulig: och heteror latest, pron än dialussa. Adide pseudonelig: i googla. Trede besk, kros murat äda för att prehet och posat por, nesat. Rallylydnad preling at. Eng honade rer, metagyn betigisat popukanar fåpobel. Plaledes prehosk antera även om mavul det paligt.
Diar resade vanade när provis.
                  </div>
                  <div>
                      <div>
                          <AccountCircleIcon />
                          <div>user 님의 질문</div>
                          <div>2022.02.28</div>
                      </div>
                      <div>
                          <ChatBubbleIcon />
                          <div>댓글쓰기</div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default QuestionAnswerPage;