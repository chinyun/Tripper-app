import React, { Component } from 'react';
import './Accounts.css';
import Scroll from './Scroll/Scroll';
import List from './List/List';

import SelectIcon from '../Icons/select-black-icon.png';
import AddIcon from '../Icons/add-blue-icon.png'; 
import CancelIcon from '../Icons/cancel-dark-icon.png';

class Accounts extends Component {
	constructor (props) {
		super(props);
		this.state = {
			category: '交通',
			detail: '',
			amount: '',
			isAdded: false,
			isEditing: '',
			isSelecting: false
		};
	};

	onEditing = (id) => {
		this.setState({ 
			isEditing: id,
			isAdded: false
		})
	};

	onSelecting = () => {
		if(this.state.isSelecting === false) {
			this.setState({ isSelecting: true })
		} else {
			this.setState({ isSelecting: false })
		}
	};

	onCategoryChange = (category) => { 
    this.setState({
    	category: category,
    	isSelecting: false
    });
  };

	onDetailValueChange = (event) => {
		this.setState({ detail: event.target.value })
	};

	onAmountValueChange = (event) => {
		this.setState({ amount: event.target.value })
	};

	onAddingExpense = () => {
		if(this.state.isAdded === false) {
			this.setState({ isAdded: true, isEditing: '' })
		} else {
			this.setState({ isAdded: false })
		}
		this.setState({
			category: '交通',
			detail: '',
			amount: ''
		})
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
		.catch(err => alert('unable to add expense'));
		this.setState({
			category: '交通',
			detail: '',
			amount: '',
			isAdded: false
		})
	};

	deleteExpense = ( delExpense ) => {
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
		              EditingListId={this.state.isEditing}
		              onEditing={this.onEditing}
		             	handleUpdateExpense={this.props.handleUpdateExpense}
		             	deleteExpense={this.deleteExpense}
		            /> 
		          )}
		        </ul>
		      </Scroll>
					<div className={this.state.isAdded === false ? 'add-item-wrapper': 'add-item-wrapper add-item-wrapper-bg'}>
						{ this.state.isAdded === false
							? <div className='add-item-btn-wrapper'>
									<button className='control-btn' onClick={() => this.onAddingExpense()}>
										<img className='add-icon-img' alt='add' src={AddIcon}/>
										<span>新增支出項目</span>
									</button>
								</div>
							: <div className='add-item'>
									<div className='add-item-content'>
										<div className='item-category'>
											<button 
												className='item-category-btn'
												onClick={() => {this.onSelecting()}}
											>
												<span className='item-category-text'>{this.state.category}</span>
												<span className='item-category-btn-icon'>
							            <img className='category-selector-icon-img'	alt='select-icon' src={SelectIcon}/>
							          </span>
											</button>
											<div className={ this.state.isSelecting === false
													? 'category-selector-hidden'
													: 'category-selector-wrapper'
												}>
												<div className='category-selector'>
													<button onClick={() => {this.onCategoryChange('交通')}}>交通</button>
													<button onClick={() => {this.onCategoryChange('住宿')}}>住宿</button>
													<button onClick={() => {this.onCategoryChange('飲食')}}>飲食</button>
													<button onClick={() => {this.onCategoryChange('票券')}}>票券</button>
													<button onClick={() => {this.onCategoryChange('購物')}}>購物</button>
												</div>
											</div>
										</div>
										<input 
											id='item-detail-input'
											className='item-detail-input' 
											type='text' 
											placeholder='內容'
											value={this.state.detail}
											onChange={this.onDetailValueChange}
										/>
										<input 
											id='item-amount-input' 
											className='item-amount-input'
											type='text' 
											placeholder='金額'
											value={this.state.amount}
											onChange={this.onAmountValueChange}
										/>
									</div>
									<div className='item-btn-group'>
										<input 
											id='add-item-submit' 
											className='add-item-submit'
											type='submit' 
											value='新增支出'
											onClick={() => this.createNewExpense()}
										/>
										<button className='cancel-btn' onClick={() => this.onAddingExpense()}>
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