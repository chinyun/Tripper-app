import React from 'react';
import './SideBar.css';
import AddIcon from './add-icon.png';

const SideBar = ( ) => {
	return (
		<div className='sidenav'>
			<ul className='journey-list'>
				<li className='journey-list-item'> 範例 </li>
				<li className='journey-list-item'> 2017 京都大阪行 </li>
				<li className='journey-list-item'> 2018 福岡九州 </li>
				<li className='journey-list-item'> 2019 東京賞櫻 </li>
			</ul>

			<div className='add-journey-btn'>
				<button >
					<div>
						<img id='add' alt='add' src={AddIcon} />
					</div>
					<p> 新增行程列表 </p>			
				</button>
			</div>
		</div>
	)
};

export default SideBar;

