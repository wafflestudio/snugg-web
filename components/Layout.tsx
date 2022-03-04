import styles from "../styles/Layout.module.scss"

import React from 'react';
import Header1 from "./Header1";
import Header2 from "./Header2";

type props = {
    children: React.ReactNode;
}


const Layout = ({children}:props) => {
    return (
        <div className={styles.pageWrapper}>
            <header className={styles.pageHeader}>
                <Header1/>
                <Header2/>
                {/*header 컴포넌트 위치*/}
            </header>
            <div className={styles.pageContent}>
                <div className={styles.pageMain}>
                    {children}
                </div>
                <div className={styles.pageSideBar}>
                    사이드바
                    {/*사이드바 컴포넌트 위치*/}
                </div>
            </div>
        </div>
    );
};

export default Layout;