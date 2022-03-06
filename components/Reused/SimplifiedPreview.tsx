import React from 'react';
import styles from '../../styles/SimplifiedPreview.module.scss';
const SimplifiedPreview = () => {

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

        </div>
    );
};

export default SimplifiedPreview;