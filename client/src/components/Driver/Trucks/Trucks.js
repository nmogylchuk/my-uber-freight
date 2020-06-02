import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useHttp } from '../../../hooks/http.hook';
import { AuthContext } from '../../../context/AuthContext';
import { NavLink } from 'react-router-dom';
import { TrucksList } from './TrucksList';

const Trucks = (props) => {
    const auth = useContext(AuthContext);
    const { request } = useHttp();
    const [trucks, setTrucks] = useState([]);

    const getTrucks = useCallback(async () => {
        try {
            const data = await request('/api/trucks', 'GET', null,
                { Authorization: `Bearer ${auth.token}` }
            );
            setTrucks(data);
        } catch (e) { }
    }, [auth.token, request]);

    useEffect(() => {
        getTrucks();
    }, [getTrucks]);

    return (
        <div className="truck">
            <h2 className="truck__title title">Available Trucks</h2>
            <div className="button__list">
                <NavLink to="/driver/truck/create" className="button__link">
                    <button className="truck__button button-create button">Create Truck</button>
                </NavLink>
            </div>
            <TrucksList trucks={trucks} />
        </div>
    );
};

export default Trucks;