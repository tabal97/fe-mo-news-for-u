import styles from "../Styles/Header.module.css"
import React, { Component } from 'react';

class Header extends Component {
    state = {
        currentUser: ""
    }
    render() {
        return (
            <div>

            </div>
        );
    }
    componentDidMount() {
        const localUser = localStorage.getItem("currentUser")
        console.log(localUser)
    }
}

export default Header;

// const Header = ({ currentUser }) => {
//     return (<div className={styles.header}>
//         <h1 className={styles.title}>Mo News For U</h1>
//         <h3 className={styles.login}>Logged in as {currentUser ? currentUser : "Guest"}</h3>
//     </div>

//     );
// };

// export default Header;