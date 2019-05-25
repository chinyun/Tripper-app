import React, { Component } from 'react';
import './Accounts.css';
import Scroll from './Scroll';
import List from './List';
import SelectIcon from './select-white-icon.png';
import AddIcon from './add-white-icon.png'; 
import CancelIcon from './cancel-icon.png';
import Days from './Days';

const db = [{
	
},{
	
},{

}]

class Accounts extends Component {
	constructor ( ) {
		super();
		this.state = {
			totalAmount: 0,
			trafficAmount: 0,
			livingAmount: 0,
			foodAmount: 0,
			ticketsAmount: 0,
			shoppingAmount: 0,
			Category: '交通',
			Detail: '',
			Amount: '',
			lists: [],
			isAdded: true,
			days: [],
			displayDay: 1
		};
		this.initailId = 0;
		this.initialDayId = 1;
		this.initialDay = 2;
	};

	addNewDay = (event) => {
		this.setState({
			days: [...this.state.days, {
				counts: this.initialDay++,
				id: this.initialDayId++
			}]
		});
	};

	onDaySelectChange = (event) => {
		this.setState({
			displayDay: event.target.value
		});
		console.log(this.state.displayDay);
	};

	onCategorySelectChange = (event) => { 
		this.setState({
			Category: event.target.value
		});
	};

	onDetailValueChange = (event) => {
		this.setState({ Detail: event.target.value });
	};

	onAmountValueChange = (event) => {
		this.setState({ Amount: event.target.value });
	};

	removeListItem = ( list ) => {
		this.setState({
			lists: this.state.lists.filter(item => item.id !== list.id)
		});
	};

	addAccountList = ( event ) => {
		this.setState({ 
			lists: [...this.state.lists, {
				category: this.state.Category,
				detail: this.state.Detail,
				amount: this.state.Amount,
				id: this.initailId++
			}],
			Detail: '',
			Amount: '',
			isAdded: false,
			totalAmount: this.state.totalAmount += +this.state.Amount
		});
	};

	showAddAccount = ( event ) => {
		this.setState({ isAdded: true })
	};

	cancelListSubmit =( event ) => {
		this.setState({ isAdded: false })
	};

	render () {
		return (
			<div className='accounts-container'>
				<div className='accounts-days-nav'>
					<p className='accounts-day-title'>記帳簿</p>
					<div className='accounts-days-manage'>
						<button className='add-accounts-days-btn' onClick={this.addNewDay}>
							<img 
								className='add-day-img' 
								alt='add' 
								src={AddIcon} 
							/>
							<span>新增</span>
						</button>
						<div className='accounts-days'>
							<select 
								className='accounts-day-selector' 
								name='accounts-day-selector'
								onChange={this.onDaySelectChange}
							>
								<option value='Day1'>Day1</option>
								{this.state.days.map( day =>
									<Days
										key={day.id}
										day={day}
									/>
								)}
							</select>
							<span className='account-category-selector-icon'>
								<img alt='select-green-icon'src={SelectIcon}/>
							</span>
						</div>
					</div>
				</div>
				<div className='accounts-table'>
					<div className='scroll-accounts-list'>
						<Scroll>
							<ul className='accounts-list'>
								{this.state.lists.map( list => 
									<List 
										key={list.id} 
										list={list}
										removeListItem={this.removeListItem}
									/> 
								)}
							</ul>
						</Scroll>
						<div>
							{ this.state.isAdded === false
								? <button
										className='show-add-account-btn'
										onClick={this.showAddAccount}
									>
										<img 
											className='add-account-img' 
											alt='add' 
											src={AddIcon} 
										/>
										<span className='show-add-account-text'>新增支出項目</span>
									</button>
								: <div className='add-account-list'>
										<div className='add-account-list-content'>
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
												<span className='account-category-selector-icon'>
													<img alt='select-green-icon'src={SelectIcon}/>
												</span>
											</div>
											<input 
												id='input-list-detail'
												className='input-list-detail' 
												type='text' 
												placeholder='描述'
												value={this.state.Detail}
												onChange={this.onDetailValueChange}
											/>
											<input 
												id='input-list-amount' 
												className='input-list-amount'
												type='text' 
												placeholder='金額'
												value={this.state.Amount}
												onChange={this.onAmountValueChange}
											/>
										</div>
										<div className='add-list-btn-group'>
											<input 
											id='add-list-submit' 
											className='add-list-submit'
											type='submit' 
											value='新增支出'
											onClick={this.addAccountList}
											/>
											<button
												className='cancel-add-list-btn'
												onClick={this.cancelListSubmit}
											>
												<img 
													className='cancel-btn-img' 
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
			</div>
		)
	}
};

export default Accounts;