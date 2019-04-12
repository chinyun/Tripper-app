import React from 'react';
import './Navigation.css';

const Navigation = ( )=>{
	return (
		<header>
			<nav>
				<p className='slogan'> Help balance your trip budget! </p>
				<p className='logo'> Tripper </p>
				<div className='user-display'>
					<p className='user-welcome-words'> Hi,urname </p>
					<div className='user-profile-picture'></div>
				</div>
			</nav>
		</header>
	)
};

export default Navigation;
