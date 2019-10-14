import React, { Component } from 'react';
import * as api from "../utils/api";
import CommentCard from "./CommentCard"
import CommentAdder from "./CommentAdder"
import throttle from "lodash.throttle"
class CommentsList extends Component {
    state = {
        comments: [], comment_count: 0, p: 1, isLoading: true
    }
    render() {
        const { comments } = this.state;
        console.log(this.state)
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
        this.fetchComments(1)
        this.addScrollEventListener()
    }

    componentDidUpdate(prevProp, prevState) {
        const { p } = this.state;
        const { article_id } = this.props
        const pageChanged = prevState.p !== p;
        // const commentsChanged = prevState.comments.length !== this.state.comments.length;
        const articleChanged = prevProp.article_id !== article_id;
        if (articleChanged) {

            this.setState({ p: 1 });
            this.fetchComments(p)
        }
        else if (pageChanged) {
            this.fetchComments(p)
        }
    }

    fetchComments = (p) => {
        const { article_id, comment_count } = this.props;
        console.log('fetching now...', p)
        if (p === 1) {

            api.getComments(article_id, p).then(({ comments }) => {
                this.setState({ comments, comment_count })
            })
        } else {
            api.getComments(article_id, p).then(({ comments }) => {
                // {comments: [...], total_comments: 999}
                this.setState(currState => {
                    const newState = { ...currState }
                    return { comments: [...newState.comments, ...comments], comment_count }
                })
            })
        }
    }
    addScrollEventListener = () => {
        window.addEventListener("scroll", this.handleScroll)
    }
    handleScroll = throttle(() => {
        const { p } = this.state;
        const { comment_count } = this.props
        const distanceFromTop = window.scrollY;
        const heightOfScreen = window.innerHeight;
        const documentHeight = document.body.scrollHeight;
        const distanceFromBottom = (documentHeight - (distanceFromTop + heightOfScreen))
        const maxPage = Math.ceil(comment_count / 5);
        if (distanceFromBottom <= 100 && maxPage !== p) {
            this.setState(currState => {
                const newState = { ...currState };
                return { p: ++newState.p }
            })
        }
    }, 1000)
    addComment = (body) => {
        const { article_id } = this.props;
        const currentUser = localStorage.getItem("currentUser")
        const input = { username: currentUser, body };
        api.postComment(article_id, input).then(({ comment }) => {
            this.setState(currState => {
                console.log(comment)
                const newState = { ...currState };
                return { comments: [comment, ...newState.comments] }
            })
        })
    }
}

export default CommentsList;