import React, { Component } from 'react';
import './Journey.css';
import DeleteIcon from './delete-icon.png';
import UpdateIcon from './update-icon.png';

class Journey extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isEditing: false
		};
	};

	handleJourneyValueChange = (event) => {
		this.props.onJourneyValueUpdate(event.target.value);
	};

	handleJourneyValueConfirm = (event) => {
		if (event.keyCode === 13) {
			console.log('enter');
			this.setState({ isEditing: false });
			const { journey, editJourneyName } = this.props;
			editJourneyName(journey.id);
		}
	};

	handleUpdate = () => {
		if(this.state.isEditing === false) {
			this.setState({ isEditing: true })
		} else {
			this.setState({ isEditing: false })
		}
	};

	handleDelete = (delJourneyId) => {
		this.props.deleteJourney(delJourneyId);
	};

	render() {
		const { journey, onJourneyChange } = this.props;
		return(
			<li className='journey' id={journey.id}>
				<button 
					onClick={() => this.handleDelete(journey.id)} 
					className='journey-delete-btn'
				>
					<img alt='delete-icon' src={DeleteIcon}/>
				</button>
				<button 
					onClick={this.handleUpdate}
					className='journey-update-btn'
				>
					<img alt='update-icon' src={UpdateIcon}/>
				</button>
				{this.state.isEditing === false 
					? <span 
							className='journey-content' 
							onClick={() => {onJourneyChange(journey.id)}}
						>
							{journey.name}
						</span>
					: <input
							id='input-update-journey'
							className='input-update-journey' 
							type='text' 
							placeholder={journey.name}
							value={this.state.updateValue}
							onChange={this.handleJourneyValueChange}
							onKeyDown={this.handleJourneyValueConfirm}
						/>
				}
			</li>
		)
	}
};

export default Journey; 