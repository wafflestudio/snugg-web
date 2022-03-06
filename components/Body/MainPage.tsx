import React from 'react';
import styles from '../../styles/MainPage.module.scss'
import Preview from "../Reused/Preview";
const MainPage = () => {
    return (
        <div className={styles.mainPage}>
            <div className={styles.mainHeader}>
                최근 질문
            </div>
            {/*배열로 렌더링해야되는 부분*/}
            <Preview/> {/*제목, 내용등이 인자로 들어가야됨.*/}
            <Preview/>
            <Preview/>
        </div>
    );
};

export default MainPage;
