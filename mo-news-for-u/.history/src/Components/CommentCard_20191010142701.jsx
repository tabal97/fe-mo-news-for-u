import React, { Component } from 'react';
import styles from "../Styles/CommentCard.module.css";
import * as api from "../utils/api";
import VotesCard from "./VotesCard";
import { Link } from "@reach/router"

class CommentCard extends Component {
    state = {
        comment: {}, isLoading: true, deleted: false, currentUser: ""
    }
    render() {
        const { votes, created_at, author, body } = this.state.comment;
        const { deleted, currentUser } = this.state;
        return (
            <div className={deleted ? styles.cardDeleted : styles.card}>
                <div className={styles.info}><h4 ><Link to={`/users/${author}`}>{author}</Link>@{created_at && created_at.slice(0, 10)} </h4>
                    {currentUser === author && <button className={styles.delete} onClick={this.removeComment} disabled={deleted}>Delete</button>}</div>
                <p className={styles.comment}>{body}</p>
                <VotesCard votes={votes} className={styles.votes} votesHandler={this.votesHandler} />
            </div>
        );
    }
    componentDidMount() {
        const localUser = localStorage.getItem("currentUser")
        const { votes, created_at, author, body, comment_id } = this.props
        this.setState({ comment: { votes, created_at, author, body, comment_id }, isLoading: false, currentUser: localUser })
    }
    componentDidUpdate(prevProp, prevState) {
        const localUser = localStorage.getItem("currentUser")
        const userChanged = prevState.currentUser !== localUser;
        if (userChanged) {
            this.setState({ currentUser: localUser })
        }
    }
    votesHandler = (vote) => {
        const { comment_id } = this.state.comment
        return api.commentVoter(comment_id, vote).then(({ comment }) => this.setState({ comment, isLoading: false }))
    }
    removeComment = () => {
        const { comment_id } = this.state.comment;
        this.setState({ deleted: true })
        api.deleteComment(comment_id).catch(console.log)
    }
}

export default CommentCard;