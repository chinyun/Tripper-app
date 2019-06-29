import React from 'react';
import './Navigation.css';
import SeperateLine from './seperate-line-dark.png';


const Navigation = ( {onRouteChange, userName} ) => {
	return (
		<header>
			<nav className='navigation-nav'>
				<p className='slogan'> Help balance your trip budget! </p>
				<p className='logo'> Tripper </p>
				<div className='user-display'>
					{/*<div className='user-profile-picture'></div>*/}
					<p 
						className='user-name-words'
					>{`Hi, ${userName}`}</p>
					<img 
            src={SeperateLine}
            alt='seperate-line'
            className='seperate-line'
          />
					<p 
						onClick = {() => {onRouteChange('signout')}} 
						className='user-signout'
					> Logout</p>
				</div>
			</nav>
		</header>
	)
};

export default Navigation;
