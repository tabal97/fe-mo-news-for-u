import React, { Component } from 'react';
import styles from "../Styles/CommentCard.module.css";
import * as api from "../utils/api";
import VotesCard from "./VotesCard"

class CommentCard extends Component {
    state = {
        comment: {}, isLoading: true
    }
    render() {
        const { votes, created_at, author, body } = this.state.comment;
        console.log(this.state.comment)
        return (
            <div className={styles.card}>
                <h4 className={styles.info}>{author} @{created_at && created_at.slice(0, 10)}</h4>
                <p >{body}</p>
                <VotesCard votes={votes} className={styles.votes} votesHandler={this.votesHandler} />
            </div>
        );
    }
    componentDidMount() {
        this.setState({ comment: this.props, isLoading: false })
    }
    votesHandler = (vote) => {
        const { comment_id } = this.state.comment
        return api.commentVoter(comment_id, vote).then(({ comment }) => this.setState({ comment, isLoading: false }))
    }
}

export default CommentCard;