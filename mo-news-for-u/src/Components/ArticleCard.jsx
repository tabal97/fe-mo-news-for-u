import React, { Component } from 'react';

class ArticleCard extends Component {
    state = {
        title: "", topic: "", author: "", created_at: "", votes: null, comments: null
    }

    render() {
        console.log()
        return (
            <div>

            </div>
        );
    }
    componentDidMount() {
        this.setState(this.props)
    }
}

export default ArticleCard;