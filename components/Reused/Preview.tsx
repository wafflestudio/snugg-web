import React from 'react';
import styles from '../../styles/Preview.module.scss';
const Preview = () => {
    const TMPTEXT = "Lörem ipsum triren tirat. Dekasade tes utan nitest sedan semin dijugt. Spehonat mikronygisk, pelosm. " +
        "Autoktiga fuspesa pseudonade. Rer mikroråsade då antena i nånera när minde. Antibörat örade " +
        "protaheten har akande än viheten. Nedode spesojong. Nisesk heledes surad senarade. Decinde vat, s" +
        "elig nenegon i fans. Bujur diartad hypertropi. Terasade teraplar polögisk. Larar favis vaktigt. Yns p" +
        "reren när mononing. Pseudonar ultrade, kåvil än fulparkerare i antidirade. Hovis vimöd fast polysamma. Vi" +
        "na desk. Krona ar spegen. Navuv beligt dosamma utt. Dekav skräpbot. Prekatt havud, rende nator suvav."
    return (
        <div className={styles.preview}>
            <div className={styles.previewHeader1}>
                <span className={styles.previewHeader1Text}>전공분야</span>
                <div className={styles.previewHeaderTag1}>#태그1</div>
                <div className={styles.previewHeaderTag2}>#태그2</div>
                <div className={styles.previewHeaderTag3}>#태그3</div>
            </div>
            <div className={styles.previewHeader2}>
                질문 제목을 입력하세요
            </div>
            <div className={styles.previewBody}>
                {TMPTEXT}
            </div>

        </div>
    );
};

export default Preview;