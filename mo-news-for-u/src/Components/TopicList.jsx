import React, { Component } from 'react';
import * as api from "../utils/api";
import { Link } from "@reach/router"

class TopicList extends Component {
    state = { topics: [] }

    render() {
        const { topics } = this.state;
        return (
            <nav><Link to="/">Home</Link> {topics.map(({ slug }) => {
                return (<React.Fragment key={slug}> || <Link to={`/topics/${slug}`} >{`${slug}`}</Link></React.Fragment>);
            })}
            </nav>
        );
    }
    componentDidMount() {
        this.fetchTopics()
    }

    fetchTopics = () => {
        api.getTopics().then(topics => this.setState(topics))
    }
}

export default TopicList;