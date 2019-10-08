import React, { Component } from 'react';
import * as api from "../utils/api"

class SingleArticle extends Component {
    state = {
        article: {}
    }
    render() {
        const { article } = this.state
        console.log(article)
        return (
            <h1>
            </h1>
        );
    }

    componentDidMount() {
        this.fetchArticle()
    }

    fetchArticle = () => {
        const { article_id } = this.props;
        api.getArticle(article_id).then(article => this.setState(article))
    }
}

export default SingleArticle;