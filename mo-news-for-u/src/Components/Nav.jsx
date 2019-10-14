import React, { Component } from 'react';
import * as api from "../utils/api";
import { Link } from "@reach/router"
import Errors from './Errors';

class Nav extends Component {
    state = { topics: [], errMsg: null, errStatus: null }

    render() {
        const { topics, errStatus, errMsg } = this.state;
        return (errStatus) ? <Errors msg={errMsg} status={errStatus} /> : (
            <nav><Link to="/">Home</Link> {topics.map(({ slug }) => {
                return (<React.Fragment key={slug}> || <Link to={`/topics/${slug}`} >{`${slug}`}</Link></React.Fragment>);
            })} || <Link to="/login">Change User</Link>
            </nav>
        );
    }
    componentDidMount() {
        this.fetchTopics()
    }

    fetchTopics = () => {
        api.getTopics().then(({ topics }) => {
            console.log(topics)
            this.setState({ topics, errMsg: null, errStatus: null })
        }).catch(console.log)
    }
}

export default Nav;