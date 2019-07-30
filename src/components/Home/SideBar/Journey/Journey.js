import React, { Component } from 'react';
import './Journey.css';
import UpdateIcon from '../../Icons/update-blue-icon.png';
import CancelIcon from '../../Icons/cancel-dark-icon.png';

class Journey extends Component {
	constructor(props) {
		super(props);
	};

	handleJourneyValueChange = (event) => {
		this.props.onJourneyValueUpdate(event.target.value);
	};

	handleJourneyValueConfirm = (event) => {
		if (event.keyCode === 13) {
			const { onEditing, journey, editJourneyName } = this.props;
			onEditing('');
			editJourneyName(journey.id);
		}
	};

	handleUpdate = (id) => {
		this.props.onEditing(id)
	};

	handleDelete = (delJourneyId) => {
		this.props.deleteJourney(delJourneyId);
	};

	render() {
		const { journey, onJourneyChange } = this.props;
		return(
			<li className='journey' id={journey.id}>
				{this.props.editingId === journey.id
					? <input
							id='update-journey-input'
							className='update-journey-input' 
							type='text' 
							placeholder={journey.name}
							onChange={this.handleJourneyValueChange}
							onKeyDown={this.handleJourneyValueConfirm}
						/>
					: <button 
							className='change-display-journey-btn' 
							onClick={() => onJourneyChange(journey.id)}
						>
							<span className='journey-name'>{journey.name}</span>
						</button>
				}
				<div className='journey-btn-group'>
				{	this.props.editingId === journey.id
					?	<button
	            className='cancel-btn' 
	            onClick={() => this.handleUpdate('')}
	          >
	            <img className='cancel-btn-img' alt='cancel' src={CancelIcon}/>
	          </button>
					:	<button
							onClick={() => this.handleUpdate(journey.id)}
							className='update-btn'
						>
							<img className='update-icon-img' alt='update-icon' src={UpdateIcon}/>
						</button>
        }
					<button 
						onClick={() => { 
							if(window.confirm('Are you sure you wish to delete this Journey?'))
								this.handleDelete(journey.id) 
						}}
						className='delete-btn'
					><span>刪除</span></button>
				</div>
			</li>
		)
	}
};

export default Journey; 