import React, { Component } from 'react';
import './Accounts.css';
import Scroll from './Scroll/Scroll';
import List from './List/List';

import SelectIcon from './select-black-icon.png';
import AddIcon from './add-blue-icon.png'; 
import CancelIcon from './cancel-dark-icon.png';

class Accounts extends Component {
	constructor (props) {
		super(props);
		this.state = {
			category: '交通',
			detail: '',
			amount: 0,
			isAdded: true
		};
	};

	onCategorySelectChange = (event) => { 
		this.setState({category: event.target.value})
	};

	onDetailValueChange = (event) => {
		this.setState({ detail: event.target.value })
	};

	onAmountValueChange = (event) => {
		this.setState({ amount: event.target.value })
	};

	showAddExpense = (event) => {
		this.setState({ isAdded: true })
	};

	cancelAddExpense = (event) => {
		this.setState({ isAdded: false })
	};

	createNewExpense = () => {
		const { displayedAccountId } = this.props;
		fetch('http://localhost:3000/expenses', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				category: this.state.category,
				detail: this.state.detail,
				amount: this.state.amount,
				account_id: displayedAccountId
			})
		})
		.then(response => response.json())
		.then(updatedJourney => {
			this.props.handleAddExpense(updatedJourney, displayedAccountId);
		})
		.catch(err => alert('unable to add expense'))
	};

	deleteExpense = ( delExpense ) => {
		console.log(delExpense);
		const { displayedAccountId, handleRemoveExpense } = this.props;
		fetch(`http://localhost:3000/expenses/${delExpense.id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				category: delExpense.category,
				detail: delExpense.detail,
				amount: delExpense.amount,
				account_id: delExpense.account_id
			})
    })
    .then(response => response.json())
    .then(updatedJourney => {
    	handleRemoveExpense(updatedJourney, displayedAccountId);
    })
    .catch(err => alert('unable to delete'));
	};

	render () {
		return (
			<div className='accounts'>
				<div className='scroll-wrapper'>
					<Scroll>
		        <ul className='accounts-list'>
		          {this.props.expenseList.map( list => 
		            <List 
		              key={list.id} 
		              list={list}
		             	handleUpdateExpense={this.props.handleUpdateExpense}
		             	deleteExpense={this.deleteExpense}
		            /> 
		          )}
		        </ul>
		      </Scroll>
					<div className='add-accounts-wrapper'>
						{ this.state.isAdded === false
							? <button className='control-btn' onClick={this.showAddExpense}>
									<img className='add-icon-img' alt='add' src={AddIcon}/>
									<span>新增支出項目</span>
								</button>
							: <div className='add-account'>
									<div className='add-account-content'>
										<div className='account-category'>
											<select 
												className='account-category-selector' 
												name='account-category-selector'
												onChange={this.onCategorySelectChange}
											>
												<option value='交通'>交通</option>
												<option value='住宿'>住宿</option>
												<option value='飲食'>飲食</option>
												<option value='票券'>票券</option>
												<option value='購物'>購物</option>
											</select>
											<span className='category-selector-icon'>
												<img alt='select-green-icon'src={SelectIcon}/>
											</span>
										</div>
										<input 
											id='input-list-detail'
											className='input-list-detail' 
											type='text' 
											placeholder='描述'
											value={this.state.detail}
											onChange={this.onDetailValueChange}
										/>
										<input 
											id='input-list-amount' 
											className='input-list-amount'
											type='text' 
											placeholder='金額'
											value={this.state.amount}
											onChange={this.onAmountValueChange}
										/>
									</div>
									<div className='add-list-btn-group'>
										<input 
											id='add-list-submit' 
											className='add-list-submit'
											type='submit' 
											value='新增支出'
											onClick={this.createNewExpense}
										/>
										<button className='cancel-btn' onClick={this.cancelAddExpense}>
											<img className='cancel-btn-img' alt='cancel' src={CancelIcon} />
										</button>
									</div>
								</div>
						}
					</div>
				</div>	
			</div>
		)
	}
};

export default Accounts;