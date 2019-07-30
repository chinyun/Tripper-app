import React, { Component } from 'react';
import Journey from './Journey/Journey';
import './SideBar.css';
import AddIcon from '../Icons/add-blue-icon.png'; 
import CancelIcon from '../Icons/cancel-dark-icon.png';

class SideBar extends Component {
	constructor (props) {
		super(props);
		this.state = {
			isAdded: false,
			newJourney:'',
			isEditing: '',
			updateValue: ''
		};
	};

	showAddJourney = () => {
		if(this.state.isAdded === false) {
			this.setState({ 
				isAdded: true,
				isEditing: ''
			})
		} else {
			this.setState({ isAdded: false })
		}
	};

	onJourneyValueChange = ( event ) => {	
		this.setState({ newJourney: event.target.value });
	};

	onEditing = (id) => {
		this.setState({ 
			isEditing: id,
			isAdded: false
		})
	};

	onJourneyValueUpdate = ( updateValue ) => {
		this.setState({ updateValue: updateValue });
	};

	createNewJourney = () => {
		fetch('http://localhost:3000/journeys', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: this.state.newJourney,
				budget: 0,
        expense: 0,
        traffic_budget: 0,
        food_budget: 0,
        living_budget: 0,
        ticket_budget: 0,
        shopping_budget: 0,
        user_id: this.props.user.id
			})
		})
		.then(response => response.json())
		.then(newJourney => {
			this.props.handleAddJourney(newJourney);
			this.props.onJourneyChange(newJourney[0].id);
			this.setState({
				newJourney: '',
				isAdded: false
			});
		})
		.catch(err => alert('unable to create'));
	};

	editJourneyName = (journeyId) => {
    fetch(`http://localhost:3000/journeys/${journeyId}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: this.state.updateValue
      })
    })
    .then(response => response.json())
    .then(journey => {
      this.props.updateJourney(journey);
      this.props.onJourneyChange(journeyId);
    })
    .catch(err => alert('unable to edit journey'));
  };

	deleteJourney = ( delJourneyId ) => {
		fetch(`http://localhost:3000/journeys/${delJourneyId}`, {
			method: 'DELETE',
		})
		.then(response => response.json())
		.then(updatedJourney=> {
			this.props.handleRemoveJourney(updatedJourney, delJourneyId);
		})
		.catch(err => alert('unable to delete'));
	};

	render( ) {
		return (
			<div className='journeys-list-wrapper'>
				<ul className='journeys-list'>
					{this.props.journeyList.map( journey => 
						<Journey
							key={journey.id}
							journey={journey}
							onJourneyChange={this.props.onJourneyChange}
							editJourneyName={this.editJourneyName}
							deleteJourney={this.deleteJourney}
							onJourneyValueUpdate={this.onJourneyValueUpdate}
							onEditing={this.onEditing}
							editingId={this.state.isEditing}
						/>)}
				</ul>
				<div className='add-journey-wrapper'>
					{ this.state.isAdded === false
						? <button
								className='show-add-journey-btn'
								onClick={() => this.showAddJourney()}
							>
								<img className='add-icon-img' alt='add' src={AddIcon}/>
								<span className='show-add-journey-btn-text'>新增旅程</span>
							</button>
						: <div className='add-journey'>
								<input 
									id='add-journey-input'
									className='add-journey-input' 
									type='text' 
									placeholder='新增行程表'
									value={this.state.newJourney}
									onChange={this.onJourneyValueChange}
								/>
								<div className='add-journey-btn-group'>
									<input 
										id='add-journey-submit' 
										className='add-journey-submit'
										type='submit' 
										value='新增'
										onClick={() => this.createNewJourney()}
									/>
									<button
										className='cancel-btn'
										onClick={() => this.showAddJourney()}
									>
										<img className='cancel-btn-img' alt='cancel' src={CancelIcon}/>
									</button>
								</div>
							</div>	
					}
				</div>
			</div>
		)
	};
};

export default SideBar;

