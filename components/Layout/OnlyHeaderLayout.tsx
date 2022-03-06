import styles from "../../styles/OnlyHeaderLayout.module.scss"

import React from 'react';
import Header1 from "../Header/Header1";
import Header2 from "../Header/Header2";

type props = {
    children: React.ReactNode;
}


const OnlyHeaderLayout = ({children}:props) => {
    return (
        <div className={styles.pageWrapper}>
            <header className={styles.pageHeader}>
                <Header1/>
                <Header2/>
                {/*header 컴포넌트 위치*/}
            </header>
            <div className={styles.pageContent}>
                {children}
            </div>
        </div>
    );
};

export default OnlyHeaderLayout;