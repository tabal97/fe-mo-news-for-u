import React, { Component } from 'react';
import * as api from "../utils/api";
import CommentCard from "./CommentCard"

class CommentsList extends Component {
    state = {
        comments: []
    }
    render() {
        const { comments } = this.state;
        return (
            <div>
                {comments.map(comment => {
                    return <CommentCard key={comment.comment_id} {...comment} />
                })}
            </div>
        );
    }
    componentDidMount() {
        this.fetchComments()
    }

    fetchComments = () => {
        const { article_id } = this.props
        api.getComments(article_id).then(comments => this.setState(comments))
    }
}

export default CommentsList;