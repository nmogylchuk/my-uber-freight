import React, { useState, useContext, useEffect, useRef } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { AuthContext } from '../../context/AuthContext';
import { useHistory } from 'react-router-dom';
import Error from '../Error/Error';


const PasswordChange = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const {request, error, clearError} = useHttp();
    const errorRef = useRef();
    const [form, setForm] = useState({
        oldPassword: '',
        newPassword1: '',
        newPassword2: '',
    });

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const updatePasswordHandler = async () => {
        try {
            const data = await request('/api/user', 'PATCH', { ...form },
                { Authorization: `Bearer ${auth.token}` }
            );
            auth.logout();
            history.push("/");
        } catch (error) {
            console.log('Catch error on updating password: ' + error)
        }
    };

    useEffect( () => {
        if(error !== null) {
            errorRef.current = error;
        }
    }, [error, clearError]);

    return (
        <div className='driver-password form'>
            <h2 className='form__item driver-password__title title'>Change Password</h2>
            <Error reference={errorRef} message={error}/>
            <div className='form__wrapper'>
                <div className='form__item'>
                    <div className='input'>
                        <div className='input__label'>
                            <label htmlFor='oldPassword'>Old Password</label>
                        </div>
                        <div className='input__field-wrapper'>
                            <input
                                name='oldPassword'
                                id='oldPassword'
                                className='input__field'
                                type='password'
                                placeholder='Password'
                                value={form.oldPassword}
                                onChange={changeHandler}
                                required />
                        </div>
                    </div>
                </div>
                <div className='form__item'>
                    <div className='input'>
                        <div className='input__label'>
                            <label htmlFor='newPassword1'>New Password</label>
                        </div>
                        <div className='input__field-wrapper'>
                            <input
                                name='newPassword1'
                                id='newPassword1'
                                className='input__field'
                                type='password'
                                placeholder='New Password'
                                value={form.newPassword1}
                                onChange={changeHandler}
                                required />
                        </div>
                    </div>
                </div>
                <div className='form__item'>
                    <div className='input'>
                        <div className='input__label'>
                            <label htmlFor='newPassword2'>Repeat New Password</label>
                        </div>
                        <div className='input__field-wrapper'>
                            <input
                                name='newPassword2'
                                id='newPassword2'
                                className='input__field'
                                type='password'
                                placeholder='Repeat New Password'
                                value={form.newPassword2}
                                onChange={changeHandler}
                                required />
                        </div>
                    </div>
                </div>
                <div className='submit__item'>
                    <button className='driver-password__button button' onClick={updatePasswordHandler}>Change Password</button>
                </div>
            </div>
        </div>
    )
}

export default PasswordChange;