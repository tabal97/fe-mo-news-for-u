import React, { Component } from 'react';
import * as api from "../utils/api";
import ArticleCard from "../Components/ArticleCard"
import SortByFilter from './SortByFilter';
import OrderByFilter from './OrderByFilter';
import throttle from "lodash.throttle";
import Errors from "./Errors"

class ArticlesList extends Component {
    state = {
        articles: [], sortBy: null, orderBy: "desc", total_articles: 0, p: 1, isLoading: true, errStatus: null, errMsg: null
    }
    render() {
        const { articles, errStatus, errMsg } = this.state;
        return (
            (errStatus) ? <Errors msg={errMsg} status={errStatus} /> :
                (<div>
                    <SortByFilter updateSortBy={this.updateSortBy} />
                    <OrderByFilter updateOrderBy={this.updateOrderBy} />

                    {articles.map(article => {
                        return <ArticleCard key={article.article_id} {...article} />
                    })}
                </div>)
        );
    }

    componentDidMount() {
        const { topic } = this.props
        this.fetchArticles(topic);
        this.addScrollEventListener()
    }
    componentDidUpdate(prevProp, prevState) {
        const { topic } = this.props
        const { sortBy, orderBy, p } = this.state;
        const topicChanged = prevProp.topic !== topic;
        const sortByChanged = prevState.sortBy !== sortBy;
        const orderByChanged = prevState.orderBy !== orderBy;
        const pageChanged = prevState.p !== p;
        if (topicChanged) {
            this.setState({ p: 1 });
            this.fetchArticles(topic, sortBy, orderBy, p)
        }
        else if (sortByChanged || orderByChanged || pageChanged) {

            this.fetchArticles(topic, sortBy, orderBy, p)
        }
    }

    fetchArticles = (topic, sortBy, orderBy, p) => {

        if (p === 1) {
            api.getArticles(topic, sortBy, orderBy, p).then(({ articles, total_articles }) => {
                this.setState({ articles, total_articles, errMsg: null, errStatus: null })
            }).catch(({ response }) => {
                const { status, data: { msg } } = response;
                this.setState({ errStatus: status, errMsg: msg })
            })
        } else {
            api.getArticles(topic, sortBy, orderBy, p).then(({ articles, total_articles }) => {

                this.setState(currState => {
                    const newState = { ...currState }
                    return { articles: [...newState.articles, ...articles], total_articles, errMsg: null, errStatus: null }
                })
            }).catch(({ response }) => {
                const { status, data: { msg } } = response;
                this.setState({ errStatus: status, errMsg: msg })
            })
        }
    }
    updateSortBy = (sortBy) => {
        this.setState({ sortBy })
    }
    updateOrderBy = (orderBy) => {
        this.setState({ orderBy })
    }
    addScrollEventListener = () => {
        window.addEventListener("scroll", this.handleScroll)
    }
    handleScroll = throttle(() => {
        const { total_articles, p } = this.state;
        const distanceFromTop = window.scrollY;
        const heightOfScreen = window.innerHeight;
        const documentHeight = document.body.scrollHeight;
        const distanceFromBottom = (documentHeight - (distanceFromTop + heightOfScreen))
        const maxPage = Math.ceil(total_articles / 6);
        if (distanceFromBottom <= 350 && maxPage !== p) {
            this.setState(currState => {
                const newState = { ...currState };
                return { p: ++newState.p }
            })
        }
    }, 1000)
}
export default ArticlesList;