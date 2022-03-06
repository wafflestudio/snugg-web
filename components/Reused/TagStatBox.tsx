import React from 'react';
import styles from '../../styles/TagStatBox.module.scss'
interface props {

}

const TagStatBox = (props:props) => {
    return (
        <div className={styles.TagStatBox}>
            TagName
            <br/>
            답변개수:
            <br/>
            XX개
        </div>
    );
};

export default TagStatBox;