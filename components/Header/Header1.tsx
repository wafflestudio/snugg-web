import React from 'react';
import styles from '../../styles/Header1.module.scss'
import Magnifier from '../../Image/magnifier.svg'
import Image from "next/image";

const Header1 = () => {
    return (
        <div className={styles.header1}>
            <span className={styles.headerText}>SNUGG</span>
            <div className={styles.searchLabel}>
                <input className={styles.searchInput} type="text" placeholder={"검색어를 입력하세요."} />
                <Image src={Magnifier}></Image>
            </div>
            <div className={styles.profileEclipse}>
                <Image src={Magnifier}></Image>
            </div>
        </div>
    );
};

export default Header1;