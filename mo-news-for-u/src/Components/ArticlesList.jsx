import React, { Component } from 'react';
import * as api from "../utils/api";
import ArticleCard from "../Components/ArticleCard"

class ArticlesList extends Component {
    state = {
        articles: []
    }
    render() {
        const { articles } = this.state;
        return (
            <div>
                {articles.map(article => {
                    return <ArticleCard key={article.article_id} {...article} />
                })}
            </div>
        );
    }

    componentDidMount() {
        this.fetchArticles();
    }
    componentDidUpdate(prevProp) {
        const { topic } = this.props
        const topicChanged = prevProp.topic !== topic
        if (topicChanged) {
            this.fetchArticles(topic)
        }
    }

    fetchArticles = (topic) => {
        api.getArticles(topic).then(articles => this.setState(articles))
    }
}

export default ArticlesList;