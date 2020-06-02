import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useHttp } from '../../../hooks/http.hook';
import { AuthContext } from '../../../context/AuthContext';
import LoadsList from './LoadsList';

const Loads = (props) => {
    const auth = useContext(AuthContext);
    const { request } = useHttp();
    const [loads, setLoads] = useState([]);
    const postStatusValue = 'POSTED';

    const getLoads = useCallback(async () => {
        try {
            const data = await request('/api/loads?status=' + postStatusValue, 'GET', null,
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
            <h2 className="load__title title">Available Loads</h2>
            <LoadsList loads={loads} />
        </div>
    );
};

export default Loads;