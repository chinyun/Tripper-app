import React, { Component } from 'react';
import './List.css';
import SelectIcon from '../../Icons/select-black-icon.png';
import UpdateIcon from '../../Icons/update-blue-icon.png';
import CancelIcon from '../../Icons/cancel-dark-icon.png';
import ConfirmIcon from '../../Icons/confirm-green-icon.png';

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
				{ this.props.EditingListId === list.id
					? <div className='accounts-list-item-update'>
							<div className='accounts-list-item'> 
								<div className='list-item-update'>
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
												<button onClick={() => this.onCategoryChange('交通')}>交通</button>
												<button onClick={() => this.onCategoryChange('住宿')}>住宿</button>
												<button onClick={() => this.onCategoryChange('飲食')}>飲食</button>
												<button onClick={() => this.onCategoryChange('票券')}>票券</button>
												<button onClick={() => this.onCategoryChange('購物')}>購物</button>
											</div>
										</div>
									</div>
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
						        	className='delete-btn'
						        	onClick={() => this.handleDeleteExpense(list)}
						        >
						        	<span>刪除</span>
						        </button>
					        </div>
					      </div>
							</div>
							<div className='item-update-btn-group'>
								<div className='item-update-btn'>
									<button 
										onClick={() => this.onEditingChange('')} 
										className='list-item-control-btn'
									>
										<img className='cancel-btn-img' alt='cancel-icon'src={CancelIcon}/>	
									</button>
								</div>
								<div className='item-update-btn'>
									<button 
										onClick={() => this.editExpense(list)}
										className='list-item-control-btn'
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
								className='control-btn' 
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