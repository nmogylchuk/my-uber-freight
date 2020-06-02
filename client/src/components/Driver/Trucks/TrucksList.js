import React from 'react';
import { Truck } from './Truck';

export const TrucksList = ({ trucks = [] }) => {
    if (trucks === []) {
        return (
            <div className="truck__list">
                <p className="list__text">You don't have any trucks.</p>
            </div>
        );
    }

    const TrucksList = trucks.map((truck) => {
        return (<Truck key={truck._id} truck={truck} />);
    });

    return (
        <div className="truck__list">
            {TrucksList}
        </div>
    );
};