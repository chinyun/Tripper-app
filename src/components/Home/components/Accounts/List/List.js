import React, { Component } from 'react';
import Category from '../Category/Category.js';
import './List.css';
import UpdateIcon from './../../../../../icons/update-blue-icon.png';
import CancelIcon from './../../../../../icons/cancel-dark-icon.png';
import ConfirmIcon from './../../../../../icons/confirm-green-icon.png';

class List extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			category: this.props.list.category,
      detail: this.props.list.detail,
      amount: this.props.list.amount,
			isSelecting: false
		};
	}

	onEditingChange = (list) => {
		this.props.onEditing(list.id);
		this.setState({ category: list.category })
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

  componentDidMount = () => {
    document.addEventListener('click', this.handleClickHidden);
  };

  componentWillUnmount = () => {
    document.removeEventListener('click', this.handleClickHidden);
  };

  handleClickHidden = (event) => {
    if(event.target.id !== 'item-category-btn') {
      this.setState({ isSelecting: false })
    };
  };

  onDetailValueChange = (event) => {
    this.setState({ detail: event.target.value })
  };

  onAmountValueChange = (event) => {
    this.setState({ amount: event.target.value })
  };

	editExpense = (expense) => {
		fetch(`http://localhost:3000/expenses/${expense.id}`, {
			method: 'PATCH',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				category: this.state.category,
				detail: this.state.detail,
				amount: this.state.amount,
				account_id: expense.account_id
			})
		})
		.then(response => response.json())
		.then(updatedJourney => {
			this.props.handleUpdateExpense(updatedJourney);
		})
		.catch(err => alert('unable to update expense'));
		this.props.onEditing('');
	};

	handleDeleteExpense = ( delExpense ) => {
		this.props.deleteExpense(delExpense);
	};

	render() {
		const { list } = this.props;
		return (
			<li id={list.id} className='accounts-list-item-wrapper'>
				{ this.props.isEditing === list.id
					? <div className='accounts-list-item-update'>
							<div className='accounts-list-item'> 
								<div className='list-item-update'>
									<Category
										category={this.state.category}
										isSelecting={this.state.isSelecting}
										onSelecting={this.onSelecting}
										onCategoryChange={this.onCategoryChange}
									/>
					        <input 
					          id='item-detail-update-input'
					          className='item-detail-update-input' 
					          type='text' 
					          placeholder={list.detail}
					          value={this.state.detail}
					          onChange={this.onDetailValueChange}
					        />
					        <input 
					          id='item-amount-update-input' 
					          className='item-amount-update-input'
					          type='text' 
					          placeholder={list.amount}
					          value={this.state.amount}
					          onChange={this.onAmountValueChange}
					        />
					        <div className='delete-item'>
					        	<button
					        		id='item-delete-btn'
						        	className='delete-btn'
						        	onClick={() => this.handleDeleteExpense(list)}
						        >
						        	<span>刪除</span>
						        </button>
					        </div>
					      </div>
							</div>
							<div className='item-control-btn-group'>
								<div className='item-control-btn-wrapper'>
									<button
										id='item-edit-cancel-btn'
										className='list-item-control-btn'
										onClick={() => this.onEditingChange('')} 
									>
										<img className='cancel-btn-img' alt='cancel-icon'src={CancelIcon}/>	
									</button>
								</div>
								<div className='item-control-btn-wrapper'>
									<button
										id='item-edit-confirm-btn'
										className='list-item-control-btn'
										onClick={() => this.editExpense(list)}
									>
										<img className='confirm-btn-img' alt='confirm-icon' src={ConfirmIcon}/>
									</button>
								</div>
							</div>
						</div>
					: <div className='accounts-list-item'>
							<div className='list-item-group'>
								<span className='list-item-category'>
									{list.category}
								</span>
								<span className='list-item-detail'>
									{list.detail}
								</span>
								<span className='list-item-amount'>
									{list.amount}
								</span>
							</div>
							<button
								id='item-update-btn'
								className='update-btn' 
								onClick={() => this.onEditingChange(list)}
							>
                <img className='update-icon-img' alt='update' src={UpdateIcon}/>
              </button>
						</div>
					}
			</li>
		)
	}
}

export default List;