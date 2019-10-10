import styles from "../Styles/Header.module.css"
import React from 'react';

const Header = ({ currentUser }) => {
    return (<div className={styles.header}>
        <h1 className={styles.title}>Mo News For U</h1>
        <h3 className={styles.login}>Logged in as {currentUser ? currentUser : "Guest"}</h3>
    </div>

    );
};

export default Header;