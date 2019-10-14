import React from 'react';

const Errors = ({ status, msg }) => {
    return (
        <div>
            Error: Status:{status}, Message: {msg}
        </div>
    );
};

export default Errors;