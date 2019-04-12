import React, { Component } from 'react';
import './List.css';
import deleteIcon from './delete-icon.png';

class List extends Component {
	constructor( props ) {
		super( props );
		this.state = {};
	}

	removeListItem = ( event )=> {
		event.target.parentNode.parentNode.remove();
	};


	render(){
		return (
			<li className='account-list-item'>
				<div>
					<button onClick= { this.removeListItem } >
						<img alt='delete-icon' src={ deleteIcon }/>
					</button>
					{/*<span className='list-item-category'>
						{ this.porps.category}
					</span>*/}
					<span className='list-item-detail'>
						{ this.props.detail}
					</span>
				</div>
				<span className='list-item-amount'>
					{ this.props.amount }
				</span>
			</li>
		)
	}
}

export default List;