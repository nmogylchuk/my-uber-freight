import React, { Component } from 'react';
import 'whatwg-fetch';
import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage'

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      signUpError: '',
      signUpFirstName: '',
      signUpLastName: '',
      signUpEmail: '',
      signUpPassword: ''
    }

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(this);
    this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if (obj && Object.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value,
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value,
    });
  }

  onTextboxChangeSignUpFirstName(event) {
    this.setState({
      signUpFirstName: event.target.value,
    });
  }

  onTextboxChangeSignUpLastName(event) {
    this.setState({
      signUpLastName: event.target.value,
    });
  }

  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value,
    });
  }

  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value,
    });
  }

  onSignIn() {
    const {
      signInEmail,
      signInPassword
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch('/api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      }),
    }).then(res => res.json())
      .then(json => {
        if (json.success) {
          setInStorage('the_main_app', { token: json.token });
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInEmail: '',
            signInPassword: '',
            token: json.token,
          });
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false,
          });
        };
      })
  }

  onSignUp() {
    const {
      signUpEmail,
      signUpPassword,
      signUpFirstName,
      signUpLastName
    } = this.state;

    this.setState({
      isLoading: true,
    })

    console.log('Send POST singup request: ' + signUpFirstName);

    let body = {
      firstName: signUpFirstName,
      lastName: signUpLastName,
      email: signUpEmail,
      password: signUpPassword
    };

    console.log('Body: ' + JSON.stringify(body));

    // Post request to backend
    fetch('/api/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpFirstName: '',
            signUpLastName: '',
            signUpEmail: '',
            signUpPassword: ''
          });
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false,
          });
        };
      });
  }

  logout() {
    this.setState({
      isLoading: true,
    });
    const obj = getFromStorage('the_main_app');
    if (obj && Object.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/account/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: '',
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  render() {
    const {
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword,
      signUpError,
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword
    } = this.state;

    if (isLoading) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    }

    if (!token) {
      return (
        <div>

          <div className='login form'>
            {
              (signInError) ? (
                <p>{signInError}</p>
              ) : (null)
            }
            <div >
            <h2 className='form__item login__title'>Sign In</h2>
            </div>
            <div className='form__item'>
              <div className='input'>
                <div className='input__label'>
                  <label htmlFor='login'></label>
                </div>
                <div className='input__field-wrapper'>
                  <input
                    name='login'
                    className='input__field'
                    type='email'
                    placeholder='Email'
                    value={signInEmail}
                    onChange={this.onTextboxChangeSignInEmail}
                  />
                </div>
              </div>
            </div>

            <div className='form__item'>
              <div className='input'>
                <div className='input__label'>
                  <label htmlFor='password'></label>
                </div>
                <div className='input__field-wrapper'>
                  <input
                    name='password'
                    className='input__field'
                    type='password'
                    placeholder='Password'
                    value={signInPassword}
                    onChange={this.onTextboxChangeSignInPassword}
                  />
                </div>
                <div className='form__item'>
                  <button className='button button__login' onClick={this.onSignIn}>Sign In</button>
                </div>
              </div>
            </div>
          </div>

          <div className='signup form'>
            {
              (signUpError) ? (
                <p>{signUpError}</p>
              ) : (null)
            }
            <h2 className='form__item signup__title'>Sign Up</h2>

            <div className='form__item'>
              <div className='input'>
                <div className='input__label'>
                  <label htmlFor="firstName">First Name</label>
                </div>
                <div className='input__field-wrapper'>
                  <input
                    name='firstName'
                    className='input__field'
                    type='text'
                    placeholder='First Name'
                    noValidate
                    value={signUpFirstName}
                    onChange={this.onTextboxChangeSignUpFirstName}
                  />
                </div>
              </div>
            </div>

            <div className='form__item'>
              <div className='input'>
                <div className='input__label'>
                  <label htmlFor="lastName">First Name</label>
                </div>
                <div className='input__field-wrapper'>
                  <input
                    name='lastName'
                    className='input__field'
                    type='text'
                    placeholder='Last Name'
                    value={signUpLastName}
                    onChange={this.onTextboxChangeSignUpLastName}
                  />
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
                    type='email'
                    className='input__field'
                    placeholder='Email'
                    value={signUpEmail}
                    onChange={this.onTextboxChangeSignUpEmail}
                  />
                </div>
              </div>
            </div>

            <div className='form__item'>
              <div className='input'>
                <div className='input__label'>
                  <label htmlFor="email">Password</label>
                </div>
                <div className='input__field-wrapper'></div>
                <input
                  name="email"
                  type='password'
                  placeholder='Password'
                  value={signUpPassword}
                  onChange={this.onTextboxChangeSignUpPassword}
                />
                <div className='form__item'>
                  <button className='button button__signup' onClick={this.onSignUp}>Sign Up</button>
                </div>
              </div >
            </div >
          </div >
        </div >
      )
    }

    return (
      <div>
        <p>Account</p>
        <div className='form__item'>
          <button className='button button__logout' onClick={this.logout}>Logout</button>
        </div>
      </div>
    )
  }
}
export default Home;
