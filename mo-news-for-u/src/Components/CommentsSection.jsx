import React from 'react';
import CommentsList from './CommentsList';
import styles from "../Styles/CommentsSection.module.css"

const CommentsSection = ({ currentUser, article_id }) => {
    return (
        <section className={styles.commentsSection}>
            <h2 className={styles.title}>Comments:</h2>
            <CommentsList article_id={article_id} currentUser={currentUser} />
        </section>
    );
};

export default CommentsSection;