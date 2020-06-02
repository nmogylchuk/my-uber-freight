import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useHttp } from '../../../hooks/http.hook';
import { AuthContext } from '../../../context/AuthContext';
import LoadsList from './LoadsList';

const Loads = (props) => {
    const auth = useContext(AuthContext);
    const { request } = useHttp();
    const [loads, setMyLoads] = useState([]);
    const assignStatusValue = 'ASSIGN';

    const getMyLoads = useCallback(async () => {
        try {
            const data = await request('/api/loads?status=' + assignStatusValue, 'GET', null,
                { Authorization: `Bearer ${auth.token}` }
            );
            setMyLoads(data);
        } catch (e) { }
    }, [auth.token, request]);

    useEffect(() => {
        getMyLoads();
    }, [getMyLoads]);

    return (
        <div className="load">
            <h2 className="load__title title">My Loads</h2>
            <LoadsList loads={loads} />
        </div>
    );
};

export default Loads;