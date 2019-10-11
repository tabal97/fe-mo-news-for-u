import React, { Component } from 'react';
import * as api from "../utils/api";
import ArticleCard from "../Components/ArticleCard"
import SortByFilter from './SortByFilter';

class ArticlesList extends Component {
    state = {
        articles: [], sortBy: null, total_articles: 0
    }
    render() {
        const { articles } = this.state;
        return (
            <div>
                <SortByFilter updateSortBy={this.updateSortBy} />
                {articles.map(article => {
                    return <ArticleCard key={article.article_id} {...article} />
                })}
            </div>
        );
    }

    componentDidMount() {
        const { topic } = this.props
        this.fetchArticles(topic);
    }
    componentDidUpdate(prevProp, prevSate) {
        const { topic } = this.props
        const { sortBy } = this.state;
        const topicChanged = prevProp.topic !== topic;
        const sortByChanged = prevSate.sortBy !== sortBy
        if (topicChanged || sortByChanged) {
            this.fetchArticles(topic, sortBy)
        }
    }

    fetchArticles = (topic, sortBy) => {
        api.getArticles(topic, sortBy).then(({ articles, total_articles }) => {
            this.setState({ articles, total_articles })
        })
    }
    updateSortBy = (sortBy) => {
        this.setState({ sortBy })
    }
}

export default ArticlesList;