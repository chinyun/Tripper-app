import React, {Component} from 'react';
import './Register.css';
import Logo from '../tripper-white-logo.png'

class Register extends Component {
  constructor (props) {
    super (props);
    this.state = {
      email:'',
      password:'',
      name:''
    }
  };

  onNameChange = (event) => {
    this.setState({name: event.target.value});
  };

  onEmailChange =(event) => {
    this.setState({email: event.target.value});
  };

  onPasswordChange = (event) => {
    this.setState({password: event.target.value});
  };

  onSubmitRegister = () => {
    fetch('http://localhost:3000/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    })
    .then(response => response.json())
    .then(data => {
      const user = data.pop(1);
      if (user.id) {
        this.props.loadUser(user);
        this.props.loadJourneys(data.map(item => item));
        this.props.onRouteChange('home');
      } else {
        alert('unable to signin');
      }
    })
    .catch(err => alert('error registering'))
  };

  render() {
    return (
      <div className='register'>
        <div className='register-welcome-words'>
          <p>Sign up now,</p>
          <div className='words-inline'>
            <p>Let</p>
            <img 
              alt='tripper-white-logo'
              src={Logo}
              className='tripper-white-logo'
            />  
          </div>
          <p>helps balance your Trip budget!</p>
        </div>
        <div className='register-form-wrapper'>
          <div className='register-form'>
            <div className='register-form-row'>
              <label className='register-form-row-title' htmlFor='name'>Username</label>
              <input
                className='register-form-row-input'
                type='name'
                id='name'
                onChange={this.onNameChange}
              />
            </div>
            <div className='register-form-row'>
              <label className='register-form-row-title' htmlFor='email-address'>Email</label>
              <input
                className='register-form-row-input'
                type='email'
                id='email'
                onChange={this.onEmailChange}
              />
            </div>
            <div className='register-form-row'>
              <label className='register-form-row-title' htmlFor='password'>Password</label>
              <input
                className='register-form-row-input'
                type='password'
                id='password'
                onChange={this.onPasswordChange}
              />
            </div>
            <div className='register-form-submit'>
              <input 
                id='register-input-submit'
                className='register-input-submit'
                type='submit'
                value='Register'
                onClick={this.onSubmitRegister}
              />
            </div>
            <div className='register-form-alarm'>
              <p className='register-form-alarm-words'> Already has an account? Try</p>
              <button 
                className='register-form-alarm-btn'
                onClick={() => this.props.switchLandingRoute('signin')}
              >Sign in
              </button>
            </div>
          </div>
          <div className='web-info-wrapper'>
            <p className='web-info'>2019 Tripper. Created by Chin Yun Chen.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;