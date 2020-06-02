import React, { useState, useContext, useEffect, useRef } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Error from '../Error/Error';

const Signin = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const {request, error, clearError} = useHttp();
  const errorRef = useRef();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  const signinHandler = async () => {
    try {
      const data = await request('/api/auth/signin', 'POST', { ...form });
      auth.login(data.token, data.userId, data.userType);
      history.push("/");
    }
    catch (error) {
      console.log('Catch error on signin: ' + error)
    };
  };

  useEffect( () => {
    if(error !== null) {
        errorRef.current = error;
    }
}, [error, clearError]);

  return (
    <div className='signin form'>
      <h2 className='form__item signin__title title'>Sign In</h2>
      <Error reference={errorRef} message={error}/>
      <div className='form__wrapper'>
        <div className='form__item'>
          <div className='input'>
            <div className='input__label'>
              <label htmlFor='email'>Email</label>
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
              <label htmlFor='password'>Password</label>
            </div>
            <div className='input__field-wrapper'>
              <input
                name='password'
                id='password'
                className='input__field'
                type='password'
                placeholder='Password'
                value={form.password}
                onChange={changeHandler} 
                required/>
            </div>
          </div>
        </div>
        <div className='submit__item'>
          <button className='signin__button button' onClick={signinHandler}>Sign In</button>
        </div>
      </div>
    </div>
  )
}

export default Signin;