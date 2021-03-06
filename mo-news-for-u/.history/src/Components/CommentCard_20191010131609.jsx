import React, { Component } from 'react';
import styles from "../Styles/CommentCard.module.css";
import * as api from "../utils/api";
import VotesCard from "./VotesCard";
import { Link } from "@reach/router"

class CommentCard extends Component {
    state = {
        comment: {}, isLoading: true, deleted: false, error: { state: "", msg: "" }
    }
    render() {
        const { votes, created_at, author, body } = this.state.comment;
        const { deleted } = this.state;
        const currentUser = localStorage.getItem("currentUser")
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
        const { votes, created_at, author, body, comment_id } = this.props
        this.setState({ comment: { votes, created_at, author, body, comment_id }, isLoading: false })
    }
    votesHandler = (vote) => {
        const { comment_id } = this.state.comment
        return api.commentVoter(comment_id, vote).then(({ comment }) => this.setState({ comment, isLoading: false })).catch(err => this.setState({ error: { status: err.status, msg: err.msg } }))
    }
    removeComment = () => {
        const { comment_id } = this.state.comment;
        this.setState({ deleted: true })
        api.deleteComment(comment_id).catch(err => this.setState({ error: { status: err.status, msg: err.msg } }))
    }
}

export default CommentCard;