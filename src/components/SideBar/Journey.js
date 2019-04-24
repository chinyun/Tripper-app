import React, { Component } from 'react';
import './Journey.css';
import DeleteIcon from './delete-icon.png';

class Journey extends Component {
	constructor( props ) {
		super( props );
		this.state = {};
	}

	handleDelete = ( props ) => {
		const { journey, removeJourney } = this.props;
		removeJourney( journey );
	};

	render(){
		const { journey } = this.props;
		return (
			<li 
				className='journey'
				id={journey.id}
			>
				<button 
					onClick= { this.handleDelete } 
					className='journey-delete-btn'
				>
					<img alt='delete-icon'src={DeleteIcon} />
					
				</button>
				<span className='journey-content'>
					{ journey.text }
				</span>
			</li>
		)
	}
};

export default Journey; 