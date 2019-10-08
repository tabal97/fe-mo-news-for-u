import React, { Component } from 'react';
import styles from "./VotesCard.module.css"

class VotesCard extends Component {
    state = {
        votedUp: false, votedDown: false
    }
    render() {
        const { votes } = this.props;
        const { votedUp, votedDown } = this.state;
        return (
            <section className={styles.card}>
                <button className={votedUp ? styles.activeUpVote : styles.upVote} onClick={this.upVote}>UpVote</button>
                <button className={votedDown ? styles.activeDownVote : styles.downVote} onClick={this.downVote}>DownVote</button>
                <p className={styles.counter}>Votes: {votes}</p>
            </section>
        );
    }

    upVote = () => {
        const { votesHandler } = this.props;
        const { votedUp } = this.state;
        if (!votedUp) {
            votesHandler(1)
            this.setState({ votedUp: true })
        }
        else {
            votesHandler(-1)
            this.setState({ votedUp: false })
        }
    }


    downVote = () => {
        const { votesHandler } = this.props;
        const { votedDown } = this.state;
        if (!votedDown) {
            votesHandler(-1)
            this.setState({ votedDown: true })
        }
        else {
            votesHandler(1)
            this.setState({ votedDown: false })
        }
    }

}

export default VotesCard;