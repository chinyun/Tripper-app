import React, { Component } from 'react';
import './SetBudget.css';
import SelectIcon from './select-white-icon.png';
import CancelIcon from './cancel-dark-icon.png';

class SetBudget extends Component {
	constructor(props) {
		super(props);
		const { displayedJourney } = this.props;
		this.state = {
			budget: displayedJourney[0].budget,
			traffic_budget: displayedJourney[0].traffic_budget,
			food_budget: displayedJourney[0].food_budget,
      living_budget: displayedJourney[0].living_budget,
      ticket_budget: displayedJourney[0].ticket_budget,
      shopping_budget: displayedJourney[0].shopping_budget,
      isEditing: '',
      expense: displayedJourney[0].expense,
      traffic_expense: displayedJourney[0].traffic_expense,
			food_expense: displayedJourney[0].food_expense,
      living_expense: displayedJourney[0].living_expense,
      ticket_expense: displayedJourney[0].ticket_expense,
      shopping_expense: displayedJourney[0].shopping_expense
		};
	};
	
	onBudgetChange = (event) => { this.setState({ budget: event.target.value }) };

	onTrafficBudgetChange = (event) => { this.setState({ traffic_budget: event.target.value }) };

	onFoodBudgetChange = (event) => { this.setState({ food_budget: event.target.value }) };

	onLivingBudgetChange = (event) => { this.setState({ living_budget: event.target.value }) };

	onTicketBudgetChange = (event) => { this.setState({ ticket_budget: event.target.value }) };

	onShoppingBudgetChange = (event) => { this.setState({ shopping_budget: event.target.value }) };

	handleEditing = (target) => { this.setState({ isEditing: target }) };

	handleEnter = (event) => {
		const { journeyId } = this.props;
		const { budget, traffic_budget, food_budget,
			living_budget, ticket_budget, shopping_budget} = this.state;
		if(event.key === 'Enter') {
			fetch(`http://localhost:3000/journeys_budgets/${journeyId}`, {
	      method: 'PATCH',
	      headers: {
	    		'Content-Type': 'application/json'
	    	},
	      body: JSON.stringify({
	        budget: budget,
					traffic_budget: traffic_budget,
					food_budget: food_budget,
      		living_budget: living_budget,
      		ticket_budget: ticket_budget,
      		shopping_budget: shopping_budget
	      })
	    })
	    .then(response => response.json())
	    .then(budgets=> {
	    	this.props.handleBudgetsChange(budgets, journeyId);
	    })
	    .catch(err => alert('unable to edit budget'));
	    this.setState({ isEditing: '' });
		}
	}

	render() {
		const { traffic_budget, food_budget, living_budget,
			ticket_budget, shopping_budget, traffic_expense,
			food_expense, living_expense,ticket_expense, shopping_expense } = this.state;
		const { displayedJourney } = this.props;
		return (
			<div className='budget-wrapper'> 
				<p className='home-title'>Budgets</p>
				<div className='budget'>
					<div className='budget-section'>
						<div className='budget-control'>
							<div className='budget-text'>
								<p className='budget-topic'>交通預算</p>
								<p className='budget-amount'>{traffic_budget}</p>
							</div>
							<div className='budget-detail'>
								<p>支出</p>
								<p>{traffic_expense}</p>
							</div>
							<div className='budget-detail'>
								<p>剩餘</p>
								<p>{traffic_budget - traffic_expense}</p>
							</div>
						</div>
					</div>
					<div className='budget-section'>
						<div className='budget-control'>
							<div className='budget-text'>
								<p className='budget-topic'>飲食預算</p>
								<p className='budget-amount'>{food_budget}</p>
							</div>
							<div className='budget-detail'>
								<p>支出</p>
								<p>{food_expense}</p>
							</div>
							<div className='budget-detail'>
								<p>剩餘</p>
								<p>{food_budget - food_expense}</p>
							</div>
						</div>
					</div>
					<div className='budget-section'>
						<div className='budget-control'>
							<div className='budget-text'>
								<p className='budget-topic'>住宿預算</p>
								<p className='budget-amount'>{living_budget}</p>
							</div>
							<div className='budget-detail'>
								<p>支出</p>
								<p>{living_expense}</p>
							</div>
							<div className='budget-detail'>
								<p>剩餘</p>
								<p>{living_budget - living_expense}</p>
							</div>
						</div>
					</div>
					<div className='budget-section'>
						<div className='budget-control'>
							<div className='budget-text'>
								<p className='budget-topic'>票券預算</p>
								<p className='budget-amount'>{ticket_budget}</p>
							</div>
							<div className='budget-detail'>
								<p>支出</p>
								<p>{ticket_expense}</p>
							</div>
							<div className='budget-detail'>
								<p>剩餘</p>
								<p>{ticket_budget - ticket_expense}</p>
							</div>
						</div>
					</div>
					<div className='budget-section'>
						<div className='budget-control'>
							<div className='budget-text'>
								<p className='budget-topic'>購物預算</p>
								<p className='budget-amount'>{shopping_budget}</p>
							</div>
							<div className='budget-detail'>
								<p>支出</p>
								<p>{shopping_expense}</p>
							</div>
							<div className='budget-detail'>
								<p>剩餘</p>
								<p>{shopping_budget - shopping_expense}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default SetBudget;