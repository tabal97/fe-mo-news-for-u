import React, { Component } from 'react';
import * as api from "../utils/api";
import styles from "../Styles/UserProfile.module.css"

class UserProfile extends Component {
    state = {
        username: "",
        avatar_url: "",
        name: ""
    }
    render() {
        const { username, avatar_url, name } = this.state;
        return (<div className={styles.container}>
            <section className={styles.info}>
                <h2>User Profile:</h2>
                <h3>Name: {name}</h3>
                <h3>Username: {username}</h3>
            </section>
            <img className={styles.img} src={avatar_url} alt={username && `${username}'s Avatar`}></img></div>
        );
    }
    componentDidMount() {
        const { username } = this.props;
        this.fetchUser(username)
    }
    fetchUser = (user) => {
        api.getUser(user).then(({ user }) => this.setState(user))
    }
}

export default UserProfile;