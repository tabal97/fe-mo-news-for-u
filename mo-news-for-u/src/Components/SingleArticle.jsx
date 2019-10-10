import React, { Component } from 'react';
import * as api from "../utils/api"
import styles from "../Styles/SingleArticle.module.css"
import VotesCard from './VotesCard';
import CommentsSection from './CommentsSection';
class SingleArticle extends Component {
    state = {
        article: {}, isLoading: true
    }
    render() {
        const { article_id, author, body, created_at, title, topic, votes } = this.state.article;
        if (this.state.isLoading) { return <h2>Loading Article...</h2> }
        else return (
            <div className={styles.article}>
                <section className={styles.articleSection}>
                    <div className={styles.container}>
                        <h2 className={styles.title}>{title}</h2>
                        <h3 className={styles.topic}>{topic}</h3>
                        <h4 className={styles.author}>Written By: {author}</h4>
                        <h4 className={styles.created_at}>Created At: {created_at && created_at.slice(0, 10)}</h4>
                    </div>
                    <div className={styles.body}>{body}</div>
                </section>
                <VotesCard votes={votes} votesHandler={this.votesHandler} />
                <CommentsSection article_id={article_id} />
            </div>
        );
    }

    componentDidMount() {
        this.fetchArticle()
    }

    fetchArticle = () => {
        const { article_id } = this.props;
        api.getArticle(article_id).then(({ article }) => this.setState({ article, isLoading: false }))
    }

    votesHandler = (vote) => {
        const { article_id } = this.state.article;
        return api.articleVoter(article_id, vote).then(({ article }) => this.setState({ article, isLoading: false }))
    }
}

export default SingleArticle;