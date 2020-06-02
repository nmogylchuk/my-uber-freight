import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useHttp } from '../../../hooks/http.hook';
import { AuthContext } from '../../../context/AuthContext';
import { NavLink } from 'react-router-dom';
import LoadsList from './LoadsList';

const Loads = (props) => {
    const auth = useContext(AuthContext);
    const { request } = useHttp();
    const [loads, setLoads] = useState([]);

    const getLoads = useCallback(async () => {
        try {
            const data = await request('/api/loads', 'GET', null,
                { Authorization: `Bearer ${auth.token}` }
            );
            setLoads(data);
        } catch (e) { }
    }, [auth.token, request]);

    useEffect(() => {
        getLoads();
    }, [getLoads]);

    return (
        <div className="load">
            <h2 className="load__title title">My Loads</h2>
            <div className="button__list">
                <NavLink to="/shipper/load/create" className="button__link">
                    <button className="load__button button-create button">Create Load</button>
                </NavLink>
            </div>
            <LoadsList loads={loads} />
        </div>
    );
};

export default Loads;