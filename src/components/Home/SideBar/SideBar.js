import React, { Component } from 'react';
import './SideBar.css';
import Journey from './Journey/Journey';
import AddIcon from './add-icon.png';
import CancelIcon from './cancel-dark-icon.png';

class SideBar extends Component {
	constructor (props) {
		super(props);
		this.state = {
			newJourney:'',
			isShowed: false,
			updateValue: ''
		};
	};

	showAddJourney = ( event ) => {
		this.setState({ isShowed: true })
	};

	cancelNewSubmit = ( event ) => {
		this.setState({ isShowed: false })
	};

	onJourneyValueChange = ( event ) => {	
		this.setState({ newJourney: event.target.value });
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
			this.setState({
				newJourney: '',
				isShowed: false
			});
		})
		.catch(err => alert('unable to create'));
	};

	editJourneyName = (journeyId) => {
		console.log(journeyId);
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
    })
    .catch(err => alert('unable to edit journey'));
  };

	deleteJourney = ( delJourneyId ) => {
		fetch(`http://localhost:3000/journeys/${delJourneyId}`, {
			method: 'DELETE',
		})
		.then(response => response.json())
		.then(updatedJourney=> {
			console.log(updatedJourney);
			this.props.handleRemoveJourney(updatedJourney, delJourneyId);
		})
		.catch(err => alert('unable to delete'));
	};

	render( ) {
		return (
			<div className='side-bar-container'>
				<div className='journeys-list-container'>
					<ul className='journeys-list'>
						{this.props.journeyList.map( journey => 
							<Journey
								key={journey.id}
								journey={journey}
								onJourneyChange={this.props.onJourneyChange}
								editJourneyName={this.editJourneyName}
								deleteJourney={this.deleteJourney}
								onJourneyValueUpdate={this.onJourneyValueUpdate}
							/>)}
					</ul>
					<div className='add-journey-wrapper'>
						{ this.state.isShowed === false
							? <button
									className='show-add-journey-btn'
									onClick={this.showAddJourney}
								>
									<img 
										className='show-add-journey-img' 
										alt='add' 
										src={AddIcon} 
									/>
									<span className='show-add-journey-text'>新增項目</span>
								</button>
							: <div className='add-new-journey'>
									<input 
										id='input-new-journey'
										className='input-new-journey' 
										type='text' 
										placeholder='新增行程表'
										value={this.state.newJourney}
										onChange={this.onJourneyValueChange}
									/>
									<div className='submit-new-journey-group'>
										<input 
											id='submit-new-journey' 
											className='submit-new-journey'
											type='submit' 
											value='新增'
											onClick={this.createNewJourney}
										/>
										<button
											className='cancel-new-submit-btn'
											onClick={this.cancelNewSubmit}
										>
											<img 
												className='cancel-dark-btn-img' 
												alt='cancel' 
												src={CancelIcon} 
											/>
										</button>
									</div>
								</div>	
						}
					</div>
				</div>
			</div>
		)
	};
};

export default SideBar;

