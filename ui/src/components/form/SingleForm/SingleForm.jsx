import React from 'react';

export const SingleForm = ({template}) => (
    <div>
        <pre> <h1> {JSON.stringify(template, null, 2)}</h1> </pre>
    </div>
)