import React, { Component } from 'react';
import './List.css';

class List extends Component {
	constructor( props ) {
		super( props );
		this.state = {};
	}

	handleDelete = ( {removeListItem} ) => {
		this.props.removeListItem();
	};

	render(){
		const { list } = this.props;
		return (
			<li className='account-list-item'>
				<div>
					<button onClick= { this.handleDelete } >
						Delete
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