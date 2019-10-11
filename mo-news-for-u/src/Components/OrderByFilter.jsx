import React from 'react';

const OrderByFilter = ({ updateOrderBy }) => {
    const handleChange = (e) => {
        const { value } = e.target;
        updateOrderBy(value)
    }
    return (
        <form>
            <label><input type="radio" name="orderBy" value="desc" onChange={handleChange} defaultChecked></input>Descending</label>
            <label><input type="radio" name="orderBy" value="asc" onChange={handleChange}></input>Ascending</label>
        </form>
    );
};

export default OrderByFilter;