import React, { Component } from 'react';
import Scroll from './Scroll/Scroll';
import List from './List/List';
import Category from './Category/Category.js';
import './Accounts.css';
import AddIcon from './../../../../icons/add-blue-icon.png'; 
import CancelIcon from './../../../../icons/cancel-dark-icon.png';

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

  componentDidMount = () => {
    document.addEventListener('click', this.handleClickHidden);
  };

  componentWillUnmount = () => {
    document.removeEventListener('click', this.handleClickHidden);
  };

  handleClickHidden = (event) => {
    if(event.target.id !== 'item-category-btn') {
      this.setState({
        isSelecting: false
      });
    }
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
					<div className={this.state.isAdded === false 
						? 'add-item-wrapper'
						: 'add-item-wrapper add-item-wrapper-bg'}
					>
						{ this.state.isAdded === false
							? <div className='add-item-btn-wrapper'>
									<button 
										className='show-add-btn'
										onClick={() => this.onAddingExpense()}
									>
										<img className='add-icon-img' alt='add' src={AddIcon}/>
										<span className='show-add-btn-text'>新增支出項目</span>
									</button>
								</div>
							: <div className='add-item'>
									<div className='add-item-content'>
										<Category
											category={this.state.category}
											isSelecting={this.state.isSelecting}
											onSelecting={this.onSelecting}
											onCategoryChange={this.onCategoryChange}
										/>
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
											className='add-submit-input'
											type='submit' 
											value='新增支出'
											onClick={() => this.createNewExpense()}
										/>
										<button 
											className='cancel-btn'
											onClick={() => this.onAddingExpense()}
										>
											<img className='cancel-btn-img' alt='cancel' src={CancelIcon}/>
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