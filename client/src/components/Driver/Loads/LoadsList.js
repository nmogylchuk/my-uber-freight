import React from 'react';
import { LoadView } from './LoadView';

const LoadsList = ({ loads = [] }) => {
    if (loads === []) {
        return (
            <div className="load__list">
                <p className="list__text">You don't have any loads.</p>
            </div>
        );
    }

    const LoadsList = loads.map((load) => {
        return (<LoadView key={load.id} load={load} />);
    });

    return (
        <div className="load__list">
            {LoadsList}
        </div>
    );
};

export default LoadsList;