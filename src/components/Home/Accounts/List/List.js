import React, { Component } from 'react';
import './List.css';
import DeleteIcon from './delete-icon.png';
import UpdateIcon from './update-icon.png';
import SelectIcon from './select-white-icon.png';

class List extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			category: '交通',
			detail: '',
			amount: 0,
			isEditing: ''
		};
	}

	onEditingChange = (id) => {
		if(this.state.isEditing === '') {
			this.setState({ isEditing: id })
		} else {
			this.setState({ isEditing: '' })
		}
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

	editExpense = (expenseId) => {
		fetch(`http://localhost:3000/expenses/${expenseId}`, {
			method: 'PATCH',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				category: this.state.category,
				detail: this.state.detail,
				amount: this.state.amount
			})
		})
		.then(response => response.json())
		.then(updatedJourney => {
			console.log(updatedJourney);
			this.props.handleUpdateExpense(updatedJourney);
		})
		.catch(err => alert('unable to update expense'));
		this.setState({ isEditing: '' })
	};

	handleDeleteExpense = ( delExpenseId ) => {
		this.props.deleteExpense(delExpenseId);
	};

	render() {
		const { list } = this.props;
		return (
			<li 
				className='account-list-item'
				id={list.id}
			>
				<button 
					onClick={() => this.handleDeleteExpense(list.id)} 
					className='list-item-delete-btn'
				>
					<img alt='delete-icon'src={DeleteIcon} />	
				</button>
				<button 
					onClick={() => this.onEditingChange(list.id)}
					className='update-btn'
				>
					<img alt='update-icon' src={UpdateIcon}/>
				</button>
				{this.state.isEditing === list.id
					? <div className='account-update'>
							<div className='account-category-update'>
								<select 
									className='account-category-selector-update' 
									name='account-category-selector-update'
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
								id='input-list-detail-update'
								className='input-list-detail-update' 
								type='text' 
								placeholder='描述'
								value={this.state.detail}
								onChange={this.onDetailValueChange}
							/>
							<input 
								id='input-list-amount-update' 
								className='input-list-amount-update'
								type='text' 
								placeholder='金額'
								value={this.state.Amount}
								onChange={this.onAmountValueChange}
							/>
							<div className='update-list-input-group'>
								<input 
									id='update-list-submit' 
									className='update-list-submit'
									type='submit' 
									value='修改'
									onClick={() => this.editExpense(list.id)}
								/>
								<input 
									id='cancel-update-submit' 
									className='cancel-update-submit'
									type='submit' 
									value='取消'
									onClick={this.cancelUpdateExpense}
								/>
							</div>
						</div>
					: <div className='list-item-group'>
							<span className='list-item-category'>
								{ list.category}
							</span>
							<span className='list-item-detail'>
								{ list.detail}
							</span>
							<span className='list-item-amount'>
								{ list.amount }
							</span>
						</div>
				}
			</li>
		)
	}
}

export default List;