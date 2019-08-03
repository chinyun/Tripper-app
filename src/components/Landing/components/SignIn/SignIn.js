import React, {Component} from 'react';
import './SignIn.css';
import Logo from '../tripper-white-logo.png'

class SignIn extends Component {
  constructor (props) {
    super (props);
    this.state = {
      signInEmail:'',
      signInPassword:''
    }
  };

  onEmailChange =(event) => {
    this.setState({signInEmail: event.target.value});
  };

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value});
  };

  onSubmitSignIn = (props) => {
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
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
    .catch(err => alert('error signing in'))
  };

  render() {
    return (
      <div className='signin'>
        <div className='signin-welcome-words'>
          <p>Welcome back!</p>
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
        <div className='signin-form-wrapper'>
          <div className='signin-form'>
            <div className='signin-form-row'>
              <label className='signin-form-row-title' htmlFor='email-address'>Email</label>
              <input
                className='signin-form-row-input'
                type='email'
                id='email'
                onChange={this.onEmailChange}
              />
            </div>
            <div className='signin-form-row'>
              <label className='signin-form-row-title' htmlFor='password'>Password</label>
              <input
                className='signin-form-row-input'
                type='password'
                id='password'
                onChange={this.onPasswordChange}
              />
            </div>
            <div className='signin-form-submit'>
              <input 
                id='signin-input-submit'
                className='signin-input-submit'
                type='submit'
                value='signin'
                onClick={this.onSubmitSignIn}
              />
            </div>
            <div className='signin-form-alarm'>
              <p className='signin-form-alarm-words'> Don't have an account? Try</p>
              <button 
                className='signin-form-alarm-btn'
                onClick={() => this.props.switchLandingRoute('register')}
              > Register
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
};

export default SignIn;