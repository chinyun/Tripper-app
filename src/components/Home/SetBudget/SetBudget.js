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
      isEditing: ''
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
		const { budget, traffic_budget, food_budget,
				living_budget, ticket_budget, shopping_budget} = this.state;
		const { displayedJourney } = this.props;
		return (
			<div className='setting-control-wrapper'> 
				<div className='setting-control'>
					<p className='setting-control-title'>預算設定</p>
					<div className='setting-control-main'>
						<div className='setting-control-container'>
							<div className='setting-control-session'>
								<span className='title'>幣別</span>
								<div className='currency-category'>
									<select 
										className='currency-category-selector' 
										id='currency-category-selector' 
										name='currency-category-selector'
										// onChange={}
									>
										<option value='台幣'>台幣 NTD</option>
										<option value='日圓'>日圓 JPY</option>
									</select>
									<span className='currency-category-selector-icon'>
										<img alt='select-white-icon'src={SelectIcon}/>
									</span>
								</div>
							</div>

							<div className='setting-control-session'>
								<span className='title'>目標</span>
								<div className='budget-item'>								
									{ this.state.isEditing === 'budget'
										? <div className='budget-update'>
												<input 
													id='total-budget-input'
													className='total-budget-input' 
													type='text' 
													placeholder={budget}
													value={budget}
													onChange={this.onBudgetChange}
													onKeyDown={this.handleEnter}
												/>
												<button className='cancel-btn' onClick={()=> this.handleEditing('')}>
													<img alt='cancel-btn-icon' src={CancelIcon}/>
												</button>
											</div>
										: <span className='budget-item-text' onClick={()=> this.handleEditing('budget')}>
												{displayedJourney[0].budget}
											</span>		
									}
								</div>					
							</div>

							<div className='setting-control-session'>
								<span className='title'>剩餘</span>
								<span className='balance-content'>
									{displayedJourney[0].budget - displayedJourney[0].expense}
								</span>
							</div>
						</div>

						<div className='setting-control-container'>
							<div className='setting-control-session'>
								<span className='title'>交通</span>
								<div className='budget-item'>
									{ this.state.isEditing === 'traffic' 
										? <div className='budget-update'>
												<input 
													id='traffic-budget-input'
													className='traffic-budget-input' 
													type='text' 
													placeholder={traffic_budget}
													value={traffic_budget}
													onChange={this.onTrafficBudgetChange}
													onKeyDown={this.handleEnter}
												/>
												<button className='cancel-btn' onClick={()=>this.handleEditing('')}>
													<img alt='cancel-btn-icon' src={CancelIcon}/>
												</button>
											</div>
										: <span className='budget-item-text' onClick={()=>this.handleEditing('traffic')}>
												{displayedJourney[0].traffic_budget}
											</span>
									}	
								</div>
							</div>

							<div className='setting-control-session'>
								<span className='title'>住宿</span>
								<div className='budget-item'>
									{ this.state.isEditing === 'living'
										? <div className='budget-update'>
												<input 
													id='living-budget-input'
													className='living-budget-input' 
													type='text' 
													placeholder={living_budget}
													value={living_budget}
													onChange={this.onLivingBudgetChange}
													onKeyDown={this.handleEnter}
												/>
												<button className='cancel-btn' onClick={()=>this.handleEditing('')}>
													<img alt='cancel-btn-icon' src={CancelIcon}/>
												</button>
											</div>
										: <span className='budget-item-text' onClick={()=>this.handleEditing('living')}>
												{displayedJourney[0].living_budget}
											</span>
									}		
								</div>
							</div>

							<div className='setting-control-session'>
								<span className='title'>飲食</span>
								<div className='budget-item'>
									{ this.state.isEditing === 'food' 
										? <div className='budget-update'>
												<input 
													id='food-budget-input'
													className='food-budget-input' 
													type='text' 
													placeholder={food_budget}
													value={food_budget}
													onChange={this.onFoodBudgetChange}
													onKeyDown={this.handleEnter}
												/>
												<button  className='cancel-btn' onClick={()=>this.handleEditing('')}>
													<img alt='cancel-btn-icon' src={CancelIcon}/>
												</button>	
											</div>
										: <span className='budget-item-text' onClick={()=>this.handleEditing('food')}>
												{displayedJourney[0].food_budget}
											</span>
									}
								</div>
							</div>
						</div>

						<div className='setting-control-container'>
							<div className='setting-control-session'>
								<span className='title'>票券</span>
								<div className='budget-item'>
									{ this.state.isEditing === 'ticket' 
										? <div className='budget-update'>
												<input 
													id='ticket-budget-input'
													className='ticket-budget-input' 
													type='text' 
													placeholder={ticket_budget}
													value={ticket_budget}
													onChange={this.onTicketBudgetChange}
													onKeyDown={this.handleEnter}
												/>
												<button className='cancel-btn' onClick={()=>this.handleEditing('')}>
													<img alt='cancel-btn-icon' src={CancelIcon}/>
												</button>
											</div>
										: <span className='budget-item-text' onClick={()=>this.handleEditing('ticket')}>
												{displayedJourney[0].ticket_budget}
											</span>
									}
								</div>
							</div>

							<div className='setting-control-session'>
								<span className='title'>購物</span>
								<div className='budget-item'>
									{ this.state.isEditing === 'shopping' 
										? <div className='budget-update'>
												<input 
													id='shopping-budget-input'
													className='shopping-budget-input' 
													type='text' 
													placeholder={shopping_budget}
													value={shopping_budget}
													onChange={this.onShoppingBudgetChange}
													onKeyDown={this.handleEnter}
												/>
												<button className='cancel-btn' onClick={()=>this.handleEditing('')}>
													<img alt='cancel-btn-icon' src={CancelIcon}/>
												</button>
											</div>
										: <span className='budget-item-text' onClick={()=>this.handleEditing('shopping')}>
												{displayedJourney[0].shopping_budget}
											</span>
									}
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default SetBudget;