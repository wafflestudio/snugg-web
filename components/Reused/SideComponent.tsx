import React from 'react';
import styles from '../../styles/SideComponent.module.scss'

interface props {
    Text:string
    //Content: something
}

const SideComponent = (props:props) => {
    return (
        <div className={styles.sideComponent}>
            <div className={styles.sideComponentHeader}>
                {props.Text}
            </div>
            <div className={styles.sideComponentContent}>
                {/*질문 내용이 들어감.*/}
            </div>
        </div>
    );
};

export default SideComponent;