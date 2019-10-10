import React, { Component } from 'react';
import styles from "../Styles/CommentAdder.module.css"

class CommentAdder extends Component {
    state = {
        body: ""
    }
    render() {
        const { body } = this.state;
        const { currentUser } = this.props;
        return (
            <form className={styles.form} onSubmit={this.handleSubmit}><label className={styles.box} >Add Comment:
                <input type="text" value={body} onChange={this.handleChange} placeholder="Write here..."></input>
            </label><button className={styles.button} disabled={!currentUser} >{currentUser ? "Add Comment" : "Login Required"}</button>
            </form>
        );
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