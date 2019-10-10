import React, { Component } from 'react';
import styles from "../Styles/ArticleCard.module.css";
import { Link } from "@reach/router"

class ArticleCard extends Component {
    state = {
        article: {}, isLoading: true
    }

    render() {
        const { title, topic, votes, author, comment_count, created_at, article_id } = this.state.article;
        if (this.state.isLoading) {
            return <h3>Loading...</h3>
        } else return (
            <div className={styles.card}>
                <h3 className={styles.title}><Link to={`/articles/${article_id}`}>{title}</Link></h3>
                <p className={styles.author}>By: <Link to={`/users/${author}`}>{author}</Link> || Date: {created_at && created_at.slice(0, 10)}</p>
                <h4 className={styles.topic}>Topic: <Link to={`/topics/${topic}`}>{topic}</Link></h4>
                <p className={styles.userTally}>Votes: {votes} | Comments: {comment_count}</p>
            </div >
        );
    }
    componentDidMount() {
        this.setState({ article: this.props, isLoading: false })
    }
}

export default ArticleCard;