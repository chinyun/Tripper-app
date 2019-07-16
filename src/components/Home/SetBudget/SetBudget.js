import React, { Component } from 'react';
import BudgetCharts from './BudgetCharts/BudgetCharts';
import './SetBudget.css';
import CancelIcon from './cancel-dark-icon.png';
import UpdateIcon from './update-blue-icon.png';

const getData = (datas) => {
  console.log(datas);
  const getPercentage = (num) => {
    num.toFixed(3);
    let result = (num*100).toString();
    return result.slice(0,4);
  };

  const percentage = getPercentage(datas[0].target_expense / datas[0].target_budget);

  const data = [{ 
    name: '支出',
    cost: datas[0].target_expense,
    percentage: `${percentage}%`
  },{
    name: '剩餘可支配預算',
    cost: datas[0].target_budget - datas[0].target_expense,
    percentage: `${100 - percentage}%`
  }];

  console.log(data);
  return data;
 }

class SetBudget extends Component {
	constructor(props) {
		super(props);
		const { displayedJourney } = this.props;
		this.state = {
			traffic_budget: displayedJourney[0].traffic_budget,
			food_budget: displayedJourney[0].food_budget,
      living_budget: displayedJourney[0].living_budget,
      ticket_budget: displayedJourney[0].ticket_budget,
      shopping_budget: displayedJourney[0].shopping_budget,
      isEditing: ''
		};
	};

  handleDataType = (type) => {
    const { displayedJourney } = this.props;
    switch(type) {
      case 'traffic':
        return [{ 
          target_expense: displayedJourney[0].traffic_expense,
          target_budget: this.state.traffic_budget
        }]
      case 'food':
        return [{
          target_expense: displayedJourney[0].food_expense,
          target_budget: this.state.food_budget
        }]
      case 'living':
        return [{
          target_expense: displayedJourney[0].living_expense,
          target_budget: this.state.living_budget
        }]
      case 'ticket':
        return [{
          target_expense: displayedJourney[0].ticket_expense,
          target_budget: this.state.ticket_budget
        }]
      case 'shopping':
        return [{
          target_expense: displayedJourney[0].shopping_expense,
          target_budget: this.state.shopping_budget
        }]
      default:
        return []
    }
  };

  handleColour = (type) => {
    switch(type) {
      case 'traffic':
        return '#FBC2A2'
      case 'food':
        return '#7BF7C9'
      case 'living':
        return '#F9FCBC'
      case 'ticket':
        return '#ECA9FF'
      case 'shopping':
        return '#E488FC'
      default:
        return '#F4F4F4'
    }
  };

	onTrafficBudgetChange = (event) => { 
    this.setState({ traffic_budget: event.target.value })
  };
	onFoodBudgetChange = (event) => { 
    this.setState({ food_budget: event.target.value })
  };
	onLivingBudgetChange = (event) => { 
    this.setState({ living_budget: event.target.value })
  };
	onTicketBudgetChange = (event) => { 
    this.setState({ ticket_budget: event.target.value })
  };
	onShoppingBudgetChange = (event) => { 
    this.setState({ shopping_budget: event.target.value })
  };
	handleEditing = (target) => { 
    this.setState({ isEditing: target })
  };

	handleEnter = (event) => {
		const { journeyId } = this.props;
		const { traffic_budget, food_budget,
			living_budget, ticket_budget, shopping_budget} = this.state;
		if(event.key === 'Enter') {
			fetch(`http://localhost:3000/journeys_budgets/${journeyId}`, {
	      method: 'PATCH',
	      headers: {
	    		'Content-Type': 'application/json'
	    	},
	      body: JSON.stringify({
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
			ticket_budget, shopping_budget} = this.state;
		const { displayedJourney } = this.props;
		return (
			<div className='budget-wrapper'> 
				<p className='home-title'>Budgets</p>
				<div className='budget'>
					<div className='budget-section'>
						<div className='budget-control'>
							<div className='budget-content'>
								<p className='budget-topic'>交通預算</p>
								{ this.state.isEditing === 'traffic' 
                  ? <div className='budget-update'>
                      <input 
                        id='traffic-budget-input'
                        className='budget-input' 
                        type='text' 
                        placeholder={traffic_budget}
                        value={traffic_budget}
                        onChange={this.onTrafficBudgetChange}
                        onKeyDown={this.handleEnter}
                      />
                      <button className='cancel-btn' onClick={()=>this.handleEditing('')}>
                        <img className='cancel-icon-img' alt='cancel' src={CancelIcon}/>
                      </button>
                    </div>
                  : <div className='budget-text-wrapper'>
                  		<p className='budget-amount'>{traffic_budget}</p>
											<button className='control-btn' onClick={()=> this.handleEditing('traffic')}>
			                  <img className='update-icon-img' alt='update' src={UpdateIcon}/>
			                </button>
                  	</div>
                }
							</div>
							<div className='budget-detail'>
								<p>支出</p>
								<p>{displayedJourney[0].traffic_expense}</p>
							</div>
							<div className='budget-detail'>
								<p>剩餘</p>
								<p>{traffic_budget - displayedJourney[0].traffic_expense}</p>
							</div>
						</div>
            <BudgetCharts
              data={getData(this.handleDataType('traffic'))}
              color={this.handleColour('traffic')}
            />
					</div>
					<div className='budget-section'>
						<div className='budget-control'>
							<div className='budget-content'>
								<p className='budget-topic'>飲食預算</p>
								{ this.state.isEditing === 'food' 
                  ? <div className='budget-update'>
                      <input 
                        id='food-budget-input'
                        className='budget-input' 
                        type='text' 
                        placeholder={food_budget}
                        value={food_budget}
                        onChange={this.onFoodBudgetChange}
                        onKeyDown={this.handleEnter}
                      />
                      <button className='cancel-btn' onClick={()=>this.handleEditing('')}>
                        <img className='cancel-icon-img' alt='cancel' src={CancelIcon}/>
                      </button>
                    </div>
                  : <div className='budget-text-wrapper'>
                  		<p className='budget-amount'>{food_budget}</p>
											<button className='control-btn' onClick={()=> this.handleEditing('food')}>
			                  <img className='update-icon-img' alt='update' src={UpdateIcon}/>
			                </button>
                  	</div>
                }
							</div>
							<div className='budget-detail'>
								<p>支出</p>
								<p>{displayedJourney[0].food_expense}</p>
							</div>
							<div className='budget-detail'>
								<p>剩餘</p>
								<p>{food_budget - displayedJourney[0].food_expense}</p>
							</div>
						</div>
            <BudgetCharts
              data={getData(this.handleDataType('food'))}
              color={this.handleColour('food')}
            />
					</div>
					<div className='budget-section'>
						<div className='budget-control'>
							<div className='budget-content'>
								<p className='budget-topic'>住宿預算</p>
								{ this.state.isEditing === 'living' 
                  ? <div className='budget-update'>
                      <input 
                        id='living-budget-input'
                        className='budget-input' 
                        type='text' 
                        placeholder={living_budget}
                        value={living_budget}
                        onChange={this.onLivingBudgetChange}
                        onKeyDown={this.handleEnter}
                      />
                      <button className='cancel-btn' onClick={()=>this.handleEditing('')}>
                        <img className='cancel-icon-img' alt='cancel' src={CancelIcon}/>
                      </button>
                    </div>
                  : <div className='budget-text-wrapper'>
                  		<p className='budget-amount'>{living_budget}</p>
											<button className='control-btn' onClick={()=> this.handleEditing('living')}>
			                  <img className='update-icon-img' alt='update' src={UpdateIcon}/>
			                </button>
                  	</div>
                }
							</div>
							<div className='budget-detail'>
								<p>支出</p>
								<p>{displayedJourney[0].living_expense}</p>
							</div>
							<div className='budget-detail'>
								<p>剩餘</p>
								<p>{living_budget - displayedJourney[0].living_expense}</p>
							</div>
						</div>
            <BudgetCharts
              data={getData(this.handleDataType('living'))}
              color={this.handleColour('living')}
            />
					</div>
					<div className='budget-section'>
						<div className='budget-control'>
							<div className='budget-content'>
								<p className='budget-topic'>票券預算</p>
								{ this.state.isEditing === 'ticket' 
                  ? <div className='budget-update'>
                      <input 
                        id='ticket-budget-input'
                        className='budget-input' 
                        type='text' 
                        placeholder={ticket_budget}
                        value={ticket_budget}
                        onChange={this.onTicketBudgetChange}
                        onKeyDown={this.handleEnter}
                      />
                      <button className='cancel-btn' onClick={()=>this.handleEditing('')}>
                        <img className='cancel-icon-img' alt='cancel' src={CancelIcon}/>
                      </button>
                    </div>
                  : <div className='budget-text-wrapper'>
                  		<p className='budget-amount'>{ticket_budget}</p>
											<button className='control-btn' onClick={()=> this.handleEditing('ticket')}>
			                  <img className='update-icon-img' alt='update' src={UpdateIcon}/>
			                </button>
                  	</div>
                }
							</div>
							<div className='budget-detail'>
								<p>支出</p>
								<p>{displayedJourney[0].ticket_expense}</p>
							</div>
							<div className='budget-detail'>
								<p>剩餘</p>
								<p>{ticket_budget - displayedJourney[0].ticket_expense}</p>
							</div>
						</div>
            <BudgetCharts
              data={getData(this.handleDataType('ticket'))}
              color={this.handleColour('ticket')}
            />
					</div>
					<div className='budget-section'>
						<div className='budget-control'>
							<div className='budget-content'>
								<p className='budget-topic'>購物預算</p>
								{ this.state.isEditing === 'shopping' 
                  ? <div className='budget-update'>
                      <input 
                        id='shopping-budget-input'
                        className='budget-input' 
                        type='text' 
                        placeholder={shopping_budget}
                        value={shopping_budget}
                        onChange={this.onShoppingBudgetChange}
                        onKeyDown={this.handleEnter}
                      />
                      <button className='cancel-btn' onClick={()=>this.handleEditing('')}>
                        <img className='cancel-icon-img' alt='cancel' src={CancelIcon}/>
                      </button>
                    </div>
                  : <div className='budget-text-wrapper'>
                  		<p className='budget-amount'>{shopping_budget}</p>
											<button className='control-btn' onClick={()=> this.handleEditing('shopping')}>
			                  <img className='update-icon-img' alt='update' src={UpdateIcon}/>
			                </button>
                  	</div>
                }
							</div>
							<div className='budget-detail'>
								<p>支出</p>
								<p>{displayedJourney[0].shopping_expense}</p>
							</div>
							<div className='budget-detail'>
								<p>剩餘</p>
								<p>{shopping_budget - displayedJourney[0].shopping_expense}</p>
							</div>
						</div>
            <BudgetCharts
              data={getData(this.handleDataType('shopping'))}
              color={this.handleColour('shopping')}
            />
					</div>
				</div>
			</div>
		)
	}
}

export default SetBudget;