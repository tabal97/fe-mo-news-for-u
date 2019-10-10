import React, { Component } from 'react';
import { navigate } from "@reach/router"

class LoginSection extends Component {
    state = {
        currentUser: ""
    }
    render() {
        const { users } = this.props;
        return (
            <section>
                <h2>Log in:</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>Choose User:<select onChange={this.handleChange}>
                        {users.map(user => {
                            return <option key={user} value={user}>{user}</option>
                        })}
                    </select></label>
                    <button>Log In!</button>
                </form></section>

        );
    }
    handleChange = (e) => {
        const { value } = e.target;
        this.setState({ currentUser: value })
    }
    handleSubmit = (e) => {
        const { currentUser } = this.state;
        const { changeUser } = this.props;
        e.preventDefault();
        localStorage.clear();
        localStorage.setItem("currentUser", currentUser)
        changeUser(currentUser)
        navigate("/")
    }
}

export default LoginSection;