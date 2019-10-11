import React, { Component } from 'react';

class InfiniteScroller extends Component {
    state = {
        data=[],
        isLoading: true,
        p: 1,
        maxPageReached: false
    }
    render() {
        const { articles } = this.props;
        const { data, isLoading, p, maxPageReached } = this.state;
        return (
            <div>

            </div>
        );
    }
}

export default InfiniteScroller;