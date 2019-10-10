import React, { Component } from 'react';
import styles from "../Styles/CommentAdder.module.css"

class CommentAdder extends Component {
    state = {
        body: "", currentUser: ""
    }
    render() {
        const { body, currentUser } = this.state;
        return (
            <form className={styles.form} onSubmit={this.handleSubmit}><label className={styles.box} >Add Comment:
                <textarea rows="4" cols="50" value={body} onChange={this.handleChange} placeholder="Write here..."></textarea>
            </label><button className={styles.button} disabled={!currentUser} >{currentUser ? "Add Comment" : "Login Required"}</button>
            </form>
        );
    }
    componentDidMount() {
        const localUser = localStorage.getItem("currentUser")
        this.setState({ currentUser: localUser })
    }
    componentDidUpdate(prevProp, prevState) {
        const localUser = localStorage.getItem("currentUser")
        const userChanged = prevState.currentUser !== localUser;
        if (userChanged) {
            this.setState({ currentUser: localUser })
        }
    }
    handleChange = (e) => {
        this.setState({ body: e.target.value })
    }
    handleSubmit = (e) => {
        const { addComment } = this.props;
        const { body } = this.state
        e.preventDefault();
        addComment(body);
        this.setState({ body: "" })
    }
}

export default CommentAdder;