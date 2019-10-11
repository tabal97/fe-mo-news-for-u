import React, { Component } from 'react';
import * as api from "../utils/api";
import ArticleCard from "../Components/ArticleCard"
import SortByFilter from './SortByFilter';
import OrderByFilter from './OrderByFilter';

class ArticlesList extends Component {
    state = {
        articles: [], sortBy: null, orderBy: "desc", total_articles: 0
    }
    render() {
        const { articles } = this.state;
        console.log(this.state)
        return (
            <div>
                <SortByFilter updateSortBy={this.updateSortBy} />
                <OrderByFilter updateOrderBy={this.updateOrderBy} />
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
        const { sortBy, orderBy } = this.state;
        const topicChanged = prevProp.topic !== topic;
        const sortByChanged = prevSate.sortBy !== sortBy;
        const orderByChanged = prevSate.orderBy !== orderBy;
        console.log(orderByChanged)
        if (topicChanged || sortByChanged || orderByChanged) {

            this.fetchArticles(topic, sortBy, orderBy)
        }
    }

    fetchArticles = (topic, sortBy, orderBy) => {
        api.getArticles(topic, sortBy, orderBy).then(({ articles, total_articles }) => {
            this.setState({ articles, total_articles })
        })
    }
    updateSortBy = (sortBy) => {
        this.setState({ sortBy })
    }
    updateOrderBy = (orderBy) => {
        this.setState({ orderBy })
    }
}

export default ArticlesList;