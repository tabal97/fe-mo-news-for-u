import React, { Component } from 'react';
import * as api from "../utils/api";
import CommentCard from "./CommentCard"
import CommentAdder from "./CommentAdder"
class CommentsList extends Component {
    state = {
        comments: []
    }
    render() {
        const { comments } = this.state;
        return (
            <div>
                <CommentAdder addComment={this.addComment} />
                {comments.map(comment => {
                    return <CommentCard key={comment.comment_id}  {...comment} />
                })}
            </div>
        );
    }
    componentDidMount() {
        this.fetchComments()
    }

    componentDidUpdate(prevProp, prevState) {
        const commentsChanged = prevState.comments.length !== this.state.comments.length
        if (commentsChanged) {
            this.fetchComments()
        }
    }

    fetchComments = () => {
        const { article_id } = this.props
        api.getComments(article_id).then(comments => this.setState(comments))
    }
    addComment = (body) => {
        const { article_id } = this.props;
        const currentUser = localStorage.getItem("currentUser")
        const input = { username: currentUser, body };
        api.postComment(article_id, input).then(comment => {
            this.setState(currState => {
                const newState = { ...currState };
                return { comments: [...newState.comments, comment] }
            })
        })
    }
}

export default CommentsList;