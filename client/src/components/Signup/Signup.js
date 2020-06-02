import React, { useState, useContext, useEffect, useRef } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { useHistory } from 'react-router-dom';
import Error from '../Error/Error';

export const Signup = (props) => {

    const history = useHistory();
    const {request, error, clearError} = useHttp();
    const errorRef = useRef();
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        userType: props.location.userType
    });

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    };

    const signupHandler = async () => {
        try {
            const data = await request('api/auth/signup', 'POST', { ...form });
            history.push("/signin");
        } catch (error) {
            console.log('Catch error on signup: ' + error)
        }
    };

    useEffect( () => {
        if(error !== null) {
            errorRef.current = error;
        }
    }, [error, clearError]);

    return (
        <div className='signup form'>
            <h2 className='form__item signup__title title'>Sign Up</h2>
            <Error reference={errorRef} message={error}/>
            <div className='form__wrapper'>
                <div className='form__item'>
                    <div className='input'>
                        <div className='input__label'>
                            <label htmlFor="firstName">First Name</label>
                        </div>
                        <div className='input__field-wrapper'>
                            <input
                                name='firstName'
                                id='firstName'
                                className='input__field'
                                type='text'
                                placeholder='First Name'
                                noValidate
                                value={form.firstName}
                                onChange={changeHandler}
                                required />
                        </div>
                    </div>
                </div>

                <div className='form__item'>
                    <div className='input'>
                        <div className='input__label'>
                            <label htmlFor="lastName">Last Name</label>
                        </div>
                        <div className='input__field-wrapper'>
                            <input
                                name='lastName'
                                id='lastName'
                                className='input__field'
                                type='text'
                                placeholder='Last Name'
                                value={form.lastName}
                                onChange={changeHandler}
                                required />
                        </div>
                    </div>
                </div>

                <div className='form__item'>
                    <div className='input'>
                        <div className='input__label'>
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className='input__field-wrapper'>
                            <input
                                name='email'
                                id='email'
                                type='email'
                                className='input__field'
                                placeholder='Email'
                                value={form.email}
                                onChange={changeHandler}
                                required />
                        </div>
                    </div>
                </div>

                <div className='form__item'>
                    <div className='input'>
                        <div className='input__label'>
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className='input__field-wrapper'></div>
                        <input
                            name="password"
                            id='password'
                            type='password'
                            className='input__field'
                            placeholder='Password'
                            value={form.password}
                            onChange={changeHandler}
                            required />
                    </div>
                </div>
                <div className='submit__item'>
                    <button className='signup__button button' onClick={signupHandler}>Sign Up</button>
                </div>
            </div>
        </div>
    );
}

export default Signup;