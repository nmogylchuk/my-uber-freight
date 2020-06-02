import React, { useState, useContext, useEffect, useRef } from 'react';
import { useHttp } from '../../../hooks/http.hook';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import Error from '../../Error/Error';

const DriverCreateTruck = (props) => {

    const history = useHistory();
    const auth = useContext(AuthContext);
    const {request, error, clearError} = useHttp();
    const errorRef = useRef();
    const [form, setForm] = useState({
        brand: '',
        model: '',
        year: '',
        colour: '',
        gearbox: '',
        engine: '',
        mileage: ''
    });

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const createTruckHandler = async () => {
        try {
            const data = await request('/api/trucks', 'POST', { ...form }, {
                Authorization: `Bearer ${auth.token}`
            });
            history.push("/driver/trucks");
        }
        catch (error) {
            console.log('Catch error on creating Truck: ' + error)
        };
    };

    useEffect( () => {
        if(error !== null) {
            errorRef.current = error;
        }
    }, [error, clearError]);

    return (
        <div className='truck-create form'>
            <h2 className='form__item truck-create__title title'>Create Truck</h2>
            <Error reference={errorRef} message={error}/>
            <div className='form__wrapper'>
                <div className='form__item'>
                    <div className='input'>
                        <div className='input__label'>
                            <label htmlFor="brand">Brand</label>
                        </div>
                        <div className='input__field-wrapper'>
                            <input
                                name='brand'
                                id='brand'
                                className='input__field'
                                type='text'
                                placeholder='Brand'
                                noValidate
                                value={form.brand}
                                onChange={changeHandler}
                                required />
                        </div>
                    </div>
                    <div className='input'>
                        <div className='input__label'>
                            <label htmlFor="model">Model</label>
                        </div>
                        <div className='input__field-wrapper'>
                            <input
                                name='model'
                                id='model'
                                className='input__field'
                                type='text'
                                placeholder='Model'
                                noValidate
                                value={form.model}
                                onChange={changeHandler}
                                required />
                        </div>
                    </div>
                    <div className='input'>
                        <div className='input__label'>
                            <label htmlFor="year">Year</label>
                        </div>
                        <div className='input__field-wrapper'>
                            <input
                                name='year'
                                id='year'
                                className='input__field'
                                type='text'
                                placeholder='Year'
                                noValidate
                                value={form.year}
                                onChange={changeHandler}
                                required />
                        </div>
                    </div>
                    <div className='input'>
                        <div className='input__label'>
                            <label htmlFor="colour">Colour</label>
                        </div>
                        <div className='input__field-wrapper'>
                            <input
                                name='colour'
                                id='colour'
                                className='input__field'
                                type='text'
                                placeholder='Colour'
                                noValidate
                                value={form.colour}
                                onChange={changeHandler}
                                required />
                        </div>
                    </div>
                    <div className='input'>
                        <div className='input__label'>
                            <label htmlFor="gearbox">Gearbox</label>
                        </div>
                        <div className='input__field-wrapper'>
                            <input
                                name='gearbox'
                                id='gearbox'
                                className='input__field'
                                type='text'
                                placeholder='Gearbox'
                                noValidate
                                value={form.gearbox}
                                onChange={changeHandler}
                                required />
                        </div>
                    </div>
                    <div className='input'>
                        <div className='input__label'>
                            <label htmlFor="engine">Engine</label>
                        </div>
                        <div className='input__field-wrapper'>
                            <input
                                name='engine'
                                id='engine'
                                className='input__field'
                                type='text'
                                placeholder='Engine'
                                noValidate
                                value={form.engine}
                                onChange={changeHandler}
                                required />
                        </div>
                    </div>
                    <div className='input'>
                        <div className='input__label'>
                            <label htmlFor="mileage">Mileage</label>
                        </div>
                        <div className='input__field-wrapper'>
                            <input
                                name='mileage'
                                id='mileage'
                                className='input__field'
                                type='text'
                                placeholder='Mileage'
                                pattern='^[ 0-9]+$'
                                value={form.mileage}
                                onChange={changeHandler}
                                required />
                        </div>
                        <div className="submit__item">
                            <button className="truck-create__button button" onClick={createTruckHandler}>Create Truck</button>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default DriverCreateTruck;