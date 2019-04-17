import React, { Component } from 'react';
import './DeleteList.css';
import deleteIcon from './delete-icon.png'; 

class DeleteList extends Component {
	constructor( props ) {
		super( props );
		this.state = {};
	}

	removeListItem = ( event ) => {
		event.target.parentNode.parentNode.parentNode.remove();
	};

	render ( ) {
		return (
			<button 
				className='account-list-delete-btn'
				onClick= { this.removeListItem } 
			>
				<img alt='delete-icon' src={ deleteIcon }/>
			</button>
		)
	}
}
export default DeleteList;