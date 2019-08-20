import React, { Component } from 'react';
import './Journey.css';
import UpdateIcon from './../../../../../icons/update-blue-icon.png';
import CancelIcon from './../../../../../icons/cancel-dark-icon.png';

class Journey extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.journey.name
		}
	}

	handleJourneyValueChange = (event) => {
		this.setState({ name: event.target.value });
		this.props.onJourneyValueUpdate(this.state.name);
	};

	handleJourneyValueConfirm = (event) => {
		if (event.keyCode === 13) {
			this.props.onEditing('');
			this.props.editJourneyName(this.props.journey.id);
		}
	};

	handleUpdate = (target) => {
		this.props.onEditing(target);
	};

	handleDelete = (delJourneyId) => {
		this.props.deleteJourney(delJourneyId);
	};

	render() {
		const { journey, isEditing, onJourneyChange } = this.props;
		return (
			<li className='journey' id={journey.id}>
				{ isEditing === journey.id
					? <input
							id='update-journey-input'
							className='update-journey-input' 
							type='text'
							value={this.state.name}
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
				{	isEditing === journey.id
					?	<button
	            className='cancel-btn' 
	            onClick={() => this.handleUpdate('')}
	          >
	            <img className='cancel-btn-img' alt='cancel' src={CancelIcon}/>
	          </button>
					:	<button
							className='update-btn'
							onClick={() => this.handleUpdate(journey.id)}
						>
							<img className='update-icon-img' alt='update-icon' src={UpdateIcon}/>
						</button>
	      }
					<button 
						className='delete-btn'
						onClick={() => { 
							if(window.confirm('Are you sure you wish to delete this Journey?'))
								this.handleDelete(journey.id) 
						}}
					>刪除</button>
				</div>
			</li>
		)
	}
}

export default Journey;
