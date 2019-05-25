import React from 'react';
import './Switcher.css';
import SeperateLine from '../seperate-line-white.png';

const Switcher = ({switchLandingRoute, isRegistered}) => {
    return (
      <div>
        { isRegistered === true
          ?  <nav className='switcher-nav'>
              <p 
                onClick = {() => switchLandingRoute('signin')} 
                className='switch-on'
              >Sign in</p>
              <img 
                src={SeperateLine}
                alt='seperate-line'
                className='seperate-line'
              />
              <p 
                onClick = {() => switchLandingRoute('register')}
                className='switch-down'
              >Register</p>
            </nav>
          : <nav className='switcher-nav'>
              <p 
                onClick = {() => switchLandingRoute('signin')} 
                className='switch-down'
              >Sign in</p>
              <img 
                src={SeperateLine}
                alt='seperate-line'
                className='seperate-line'
              />
              <p 
                onClick = {() => switchLandingRoute('register')}  
                className='switch-on'
              >Register</p>
            </nav>
        }
      </div>
    );
}

export default Switcher;