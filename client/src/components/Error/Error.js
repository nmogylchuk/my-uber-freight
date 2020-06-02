import React from 'react';

const Error = ({message, reference}) => {
    return (
        <div class="error" ref={reference}>
            {message}
        </div>
    )
}

export default Error;