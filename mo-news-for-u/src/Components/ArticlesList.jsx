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

    fetchArticles = () => {
        api.getArticles().then(articles => this.setState(articles))
    }
}

export default ArticlesList;