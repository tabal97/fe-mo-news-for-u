import React from 'react';

const SortByFilter = ({ updateSortBy }) => {
    const handleChange = (e) => {
        const { value } = e.target;
        updateSortBy(value)
    }
    return (
        <form>
            <select onChange={handleChange}>
                <option value="created_at">Created At</option>
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="votes">Votes</option>
                <option value="comment_count">Comments</option>


            </select>
        </form>
    );

};

export default SortByFilter;