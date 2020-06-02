import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useHttp } from '../../../hooks/http.hook';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

const ShipperUpdateLoad = (props) => {
    const auth = useContext(AuthContext);
    const { request } = useHttp();
    const [form, setForm] = useState({
        loadName: '',
        countryFrom: '',
        countryTo: '',
        cityFrom: '',
        cityTo: '',
        dateFrom: '',
        dateTo: '',
        weight: '',
        volume: '',
        truckType: ''
    });

    const loadId = props.match.params.id;
    const getLoad = useCallback(async () => {
        try {
            const load = await request('/api/loads?id=' + loadId, 'GET', null,
                { Authorization: `Bearer ${auth.token}` }
            );
            
            setForm({
                loadName: load.loadName,
                countryFrom: load.countryFrom,
                countryTo: load.countryTo,
                cityFrom: load.cityFrom,
                cityTo: load.cityTo,
                dateFrom: load.dateFrom,
                dateTo: load.dateTo,
                weight: load.weight,
                volume: load.volume,
                truckType: load.truckType
            });

        } catch (e) { }
    }, [auth.token, request]);

    useEffect(() => {
        getLoad();
    }, [getLoad]);

    const history = useHistory();

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const updateLoadHandler = async () => {
        try {
            const data = await request('/api/loads?id=' + loadId, 'PUT', { ...form }, {
                Authorization: `Bearer ${auth.token}`
            });
            history.push("/shipper/loads");
        }
        catch (error) {
            console.log('Catch error on creating Load: ' + error)
        };
    };

    return (
        <div className='load-create form'>
            <h2 className='form__item load-create__title title'>Update Load</h2>
            <div className='form__wrapper'>
                <div className='form__item'>
                    <div className='input'>
                        <div className='input__label'>
                            <label htmlFor="loadName">Load Name</label>
                        </div>
                        <div className='input__field-wrapper'>
                            <input
                                name='loadName'
                                id='loadName'
                                className='input__field'
                                type='text'
                                placeholder='Load Name'
                                noValidate
                                value={form.loadName}
                                onChange={changeHandler}
                                required />
                        </div>
                    </div>
                    <div className='input'>
                        <div className='input__label'>
                            <label htmlFor="countryFrom">Country From</label>
                        </div>
                        <div className='input__field-wrapper'>
                            <input
                                name='countryFrom'
                                id='countryFrom'
                                className='input__field'
                                type='text'
                                placeholder='Country From'
                                noValidate
                                value={form.countryFrom}
                                onChange={changeHandler}
                                required />
                        </div>
                    </div>
                    <div className='input'>
                        <div className='input__label'>
                            <label htmlFor="countryTo">Country To</label>
                        </div>
                        <div className='input__field-wrapper'>
                            <input
                                name='countryTo'
                                id='countryTo'
                                className='input__field'
                                type='text'
                                placeholder='Country To'
                                noValidate
                                value={form.countryTo}
                                onChange={changeHandler}
                                required />
                        </div>
                    </div>
                    <div className='input'>
                        <div className='input__label'>
                            <label htmlFor="cityFrom">City From</label>
                        </div>
                        <div className='input__field-wrapper'>
                            <input
                                name='cityFrom'
                                id='cityFrom'
                                className='input__field'
                                type='text'
                                placeholder='City From'
                                noValidate
                                value={form.cityFrom}
                                onChange={changeHandler}
                                required />
                        </div>
                    </div>
                    <div className='input'>
                        <div className='input__label'>
                            <label htmlFor="cityTo">City To</label>
                        </div>
                        <div className='input__field-wrapper'>
                            <input
                                name='cityTo'
                                id='cityTo'
                                className='input__field'
                                type='text'
                                placeholder='City To'
                                noValidate
                                value={form.cityTo}
                                onChange={changeHandler}
                                required />
                        </div>
                    </div>
                    <div className='input'>
                        <div className='input__label'>
                            <label htmlFor="dateFrom">Date From</label>
                        </div>
                        <div className='input__field-wrapper'>
                            <input
                                name='dateFrom'
                                id='dateFrom'
                                className='input__field'
                                type='text'
                                placeholder='Date From'
                                value={form.dateFrom}
                                onChange={changeHandler}
                                required />
                        </div>
                    </div>
                    <div className='input'>
                        <div className='input__label'>
                            <label htmlFor="dateTo">Date To</label>
                        </div>
                        <div className='input__field-wrapper'>
                            <input
                                name='dateTo'
                                id='dateTo'
                                className='input__field'
                                type='text'
                                placeholder='Date To'
                                value={form.dateTo}
                                onChange={changeHandler}
                                required />
                        </div>
                    </div>
                    <div className='input'>
                        <div className='input__label'>
                            <label htmlFor="weight">Weight</label>
                        </div>
                        <div className='input__field-wrapper'>
                            <input
                                name='weight'
                                id='weight'
                                className='input__field'
                                type='text'
                                placeholder='Weight From'
                                value={form.weight}
                                onChange={changeHandler}
                                required />
                        </div>
                    </div>
                    <div className='input'>
                        <div className='input__label'>
                            <label htmlFor="volume">Volume</label>
                        </div>
                        <div className='input__field-wrapper'>
                            <input
                                name='volume'
                                id='volume'
                                className='input__field'
                                type='text'
                                placeholder='Volume'
                                value={form.volume}
                                onChange={changeHandler}
                                required />
                        </div>
                    </div>
                    <div className='input'>
                        <div className='input__label'>
                            <label htmlFor="bodyType">Truck Type</label>
                        </div>
                        <div className='input__field-wrapper'>
                            <input
                                name='truckType'
                                id='bodyType'
                                className='input__field'
                                type='text'
                                placeholder='Truck Type'
                                value={form.truckType}
                                onChange={changeHandler}
                                required />
                        </div>
                    </div>
                    <div className="submit__item">
                        <button className="load-create__button button" onClick={updateLoadHandler}>Update Load</button>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default ShipperUpdateLoad;