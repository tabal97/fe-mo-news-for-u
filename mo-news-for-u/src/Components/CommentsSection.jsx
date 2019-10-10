import React from 'react';
import CommentsList from './CommentsList';
import styles from "../Styles/CommentsSection.module.css"

const CommentsSection = ({ article_id }) => {
    return (
        <section className={styles.commentsSection}>
            <h2 className={styles.title}>Comments:</h2>
            <CommentsList article_id={article_id} />
        </section>
    );
};

export default CommentsSection;