import React from 'react';
import styles from '../../styles/Header1.module.scss'
import Magnifier from '../../public/magnifier.svg'
import Image from "next/image";

const Header1 = () => {
    return (
        <div className={styles.header1}>
            <span className={styles.headerText}>SNUGG</span>
            <div className={styles.searchLabel}>
                {/*input 태그 필요함*/}
                <Image src={Magnifier}></Image>
            </div>
            <div className={styles.profileEclipse}>

            </div>
        </div>
    );
};

export default Header1;