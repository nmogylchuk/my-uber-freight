import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useHttp } from '../../../hooks/http.hook';
import { AuthContext } from '../../../context/AuthContext';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Load = (props) => {
    const auth = useContext(AuthContext);
    const { request } = useHttp();
    const [load, setLoad] = useState([]);
    const history = useHistory();
    const newStatusValue = 'NEW';
    const postStatusValue = 'POSTED';

    const getLoad = useCallback(async () => {
        try {
            let loadId = props.match.params.id;
            const data = await request('/api/loads?id=' + loadId, 'GET', null,
                { Authorization: `Bearer ${auth.token}` }
            );
            setLoad(data);
        } catch (e) { }
    }, [auth.token, request]);

    useEffect(() => {
        getLoad();
    }, [getLoad]);

    const updateLoadStatusHandler = async () => {
        if (load.status === newStatusValue) {
            try {
                load.status = postStatusValue;
                const data = await request('/api/loads?id=' + load._id, 'PATCH', { "status": postStatusValue }, {
                    Authorization: `Bearer ${auth.token}`
                });
            }
            catch (error) {
                console.log('Catch error on updating Load status: ' + error)
            };
        }
    };

    const deleteLoadHandler = async () => {
        try {
            const data = await request('/api/loads?id=' + load._id, 'DELETE', null, {
                Authorization: `Bearer ${auth.token}`
            });
            history.push("/shipper/loads");
        }
        catch (error) {
            console.log('Catch error on creating Load: ' + error)
        };
    };

    return (
        <div className="load">
            <div className="load__description">
                <h2 className="load__name">{load.name}</h2>
                <div className="load__list">
                    <div className="load__item">
                        <div className="load__subitem">
                            <div className="load__subname">Load Name</div>
                            <div className="load__element">{load.loadName}</div>
                        </div>
                    </div>
                    <div className="load__item">
                        <div className="load__subitem">
                            <div className="load__subname">Country From</div>
                            <div className="load__element">{load.countryFrom}</div>
                        </div>
                        <div className="load__subitem">
                            <div className="load__subname">Country To</div>
                            <div className="load__element">{load.countryTo}</div>
                        </div>
                    </div>
                    <div className="load__item">
                        <div className="load__subitem">
                            <div className="load__subname">City From</div>
                            <div className="load__element">{load.cityFrom}</div>
                        </div>
                        <div className="load__subitem">
                            <div className="load__subname">City To</div>
                            <div className="load__element">{load.cityTo}</div>
                        </div>
                    </div>
                    <div className="load__item">
                        <div className="load__subitem">
                            <div className="load__subname">Date From</div>
                            <div className="load__element">{load.dateFrom}</div>
                        </div>
                        <div className="load__subitem">
                            <div className="load__subname">Date To</div>
                            <div className="load__element">{load.dateTo}</div>
                        </div>
                    </div>
                    <div className="load__item">
                        <div className="load__subitem">
                            <div className="load__subname">Weight</div>
                            <div className="load__element">{load.weight}</div>
                        </div>
                    </div>
                    <div className="load__item">
                        <div className="load__subitem">
                            <div className="load__subname">Volume</div>
                            <div className="load__element">{load.volume}</div>
                        </div>
                    </div>
                    <div className="load__item">
                        <div className="load__subitem">
                            <div className="load__subname">Truck Type</div>
                            <div className="load__element">{load.truckType}</div>
                        </div>
                    </div>

                    <div className="load__item">
                        <div className="load__subitem">
                            <div className="load__subname">Load Status</div>
                            <div className="load__element">{load.status}</div>
                        </div>
                    </div>
                    <div className="load__item">
                        <div className="load__subitem">
                            <div className="load__subname">Information about driver</div>
                            <div className="load__element">{load.shippingDriver}</div>
                        </div>
                    </div>
                    <div className="load__item">
                        <div className="load__subitem">
                            <div className="load__subname">Information about truck</div>
                            <div className="load__element">{load.shippingTruck}</div>
                        </div>
                    </div>
                    <div className="button__list">
                        <NavLink to={`/shipper/load/update/${load._id}`} className="button__link" style={{ display: load.status === newStatusValue ? 'block' : 'none' }}>
                            <button className="load__button button-update button">Update</button>
                        </NavLink>
                        <NavLink to="/shipper/load/delete" className="button__link" style={{ display: load.status === newStatusValue ? 'block' : 'none' }}>
                            <button className="load__button button-delete button" onClick={deleteLoadHandler}>Delete</button>
                        </NavLink>
                        <NavLink to="/shipper/load/post" className="button__link">
                            <button className="load__button button-post button" onClick={updateLoadStatusHandler}>Post</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Load;