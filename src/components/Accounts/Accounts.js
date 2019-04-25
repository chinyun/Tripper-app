import React, { Component } from 'react';
import './Accounts.css';
import Scroll from './Scroll';
import List from './List';
import SelectIcon from './select-green-icon.png';
import AddIcon from './add-white-icon.png'; 
import CancelIcon from './cancel-icon.png';

// const caculates = {
// 		category: [],
// 		detail: [],
// 		amount: []
// 	}
// ;


class Accounts extends Component {
	constructor ( ) {
		super();
		this.state = {
			totalAmount: 0,
			Category: '交通',
			Detail: '',
			Amount: '',
			lists: [],
			isShowed: false,
			isAdded: true
		};
		this.initailId = 0;
	};

	// componentDidMount( ) {
	// 	fetch('localhost:')
	// 		.then( response => response.json( ))
	// 		.then( data => this.setState({ list: data }) )
	// };

	// caculateTotalAmount = ( ) => {
	// 	let totalAmount = ( ) => {

	// 		return 
	// 	}
	// 	this.setState({ totalAmount: totalAmount });
	// };
	

	onSelectChange = (event) => { 
		this.setState({
			Category: event.target.value
		})
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

	createAccountList = ( event ) => {
		this.setState({ 
			lists: [...this.state.lists, {
				category: this.state.Category,
				detail: this.state.Detail,
				amount: this.state.Amount,
				id: this.initailId++
			}],
			Detail: '',
			Amount: 0,
			isAdded: false
		})
	};

	showAddList = ( event ) => {
		this.setState({ isShowed: true })
	};

	showAddAccountlist = ( event ) => {
		this.setState({ isAdded: true })
	};

	cancelListSubmit =( event ) => {
		this.setState({ isAdded: false })
	};

	render () {
		return (
			<div className='accounts-container'>
			{ this.state.isShowed === false
				? <div className='show-add-list-wrapper'> 
						<button
							className='show-add-list'
							onClick={this.showAddList}
						>
							<img 
								className='add-list-img' 
								alt='add' 
								src={AddIcon} 
							/>
							<span className='show-add-list-text'>新增支出項目</span>
						</button>
					</div>
				: <div className='account-table'>
						<div className='scroll-account-list'>
							<Scroll>
								<ul className='account-list'>
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
											className='show-add-account-list'
											onClick={this.showAddAccountlist}
										>
											<img 
												className='add-list-img' 
												alt='add' 
												src={AddIcon} 
											/>
											<span className='show-add-list-text'>新增支出項目</span>
										</button>
									: <div className='add-account-list'>
											<div className='add-account-list-content'>
												<div className='account-category'>
													<select 
														className='account-category-selector' 
														id='account-category-selector' 
														name='account-category-selector'
														onChange={this.onSelectChange}
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
													placeholder='description'
													value={this.state.Detail}
													onChange={this.onDetailValueChange}
												/>
												<input 
													id='input-list-amount' 
													className='input-list-amount'
													type='text' 
													placeholder='amount'
													value={this.state.Amount}
													onChange={this.onAmountValueChange}
												/>
											</div>
											<div className='input-list-submit-group'>
												<input 
												id='input-list-submit' 
												className='input-list-submit'
												type='submit' 
												value='新增支出'
												onClick={this.createAccountList}
												/>
												<button
													className='cancel-input-list-btn'
													onClick={this.cancelListSubmit}
												>
													<img 
														className='cancel-btn-img' 
														alt='cancel' 
														src={CancelIcon} 
													/>
												</button>
												{/*<input
													id='cancel-input-list-submit'
													className='cancel-input-list-submit'
													type='submit'
													value='取消'
													onClick={this.cancelListSubmit}
												/>*/}
											</div>
											
										</div>
								}
							</div>
						</div>	
					</div>
			}
		</div>
		)
	}
};

export default Accounts;