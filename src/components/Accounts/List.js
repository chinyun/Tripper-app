import React, { Component } from 'react';
import './List.css';
import DeleteIcon from './delete-icon.png'; 

class List extends Component {
	constructor( props ) {
		super( props );
		this.state = {};
	}

	handleDelete = ( props ) => {
		const { list, removeListItem } = this.props;
		removeListItem( list );
	};

	render(){
		const { list } = this.props;
		return (
			<li 
				className='account-list-item'
				id={list.id}
			>
				<div>
					<button 
						onClick= { this.handleDelete } 
						className='list-item-delete-btn'
					>
						<img alt='delete-icon'src={DeleteIcon} />
						
					</button>
					<span className='list-item-category'>
						{ list.category}
					</span>
					<span className='list-item-detail'>
						{ list.detail}
					</span>
				</div>
				<span className='list-item-amount'>
					{ list.amount }
				</span>
			</li>
		)
	}
}

export default List;