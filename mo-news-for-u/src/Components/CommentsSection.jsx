import React from 'react';
import CommentsList from './CommentsList';

const CommentsSection = ({ article_id }) => {
    return (
        <div>
            <CommentsList article_id={article_id} />
        </div>
    );
};

export default CommentsSection;