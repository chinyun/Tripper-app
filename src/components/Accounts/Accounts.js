import React, { Component } from 'react';
import './Accounts.css';
import Scroll from './Scroll';
import SelectIcon from './select-icon.png'; 
import List from './List';


// const caculates = {
// 		category: [],
// 		detail: [],
// 		amount: []
// 	}
// ;

const initailState = {
	totalAmount: 0,
	inputDetailValue: '',
	inputAmountValue: '',
	addNewListItem: false
};

class Accounts extends Component {
	constructor ( ) {
		super();
		this.state = initailState;
	}

	// caculateTotalAmount = ( ) => {
	// 	let totalAmount = ( ) => {

	// 		return 
	// 	}
	// 	this.setState({ totalAmount: totalAmount });
	// };

	onInputDetailValueChange = (event) => {
		this.setState({ inputDetailValue: event.target.value });
	};

	onInputAmountValueChange = (event) => {
		this.setState({ inputAmountValue: event.target.value });
	};



	

	createAccountList =( )=> {
		// const ul = document.querySelector('ul');
		// let li = document.getElementByClassName('account-list-item');

		// const inputListDetail = document.getElementById('input-list-detail');
		// const inputListAmount = document.getElementById('input-list-amount');

		// let select = document.getElementById('account-category-selector');
		// let index = select.selectedIndex;
		// category.appendChild(document.createTextNode(select.options[index].text));


		// let detail = document.createElement('span');
		// detail.classList.toggle('list-item-detail');
		// detail.appendChild(document.createTextNode(inputListDetail.value));
		// div.appendChild(detail);

		// let amount = document.createElement('span');
		// amount.classList.toggle('list-item-amount');
		// amount.appendChild(document.createTextNode(inputListAmount.value));
		// li.appendChild(amount);
		// ul.appendChild(li);

		this.setState({ addNewListItem: true });
	}

	render () {
		return (
			<div className='account-table'>
				<div className='scroll-account-list'>
					<Scroll>
						<ul className='account-list'>
								<List 
									// category={ this.state.inputDetailValue }
									detail={ this.state.inputDetailValue }
									amount={ this.state.inputAmountValue }		
								/>
						</ul>
					</Scroll>
				</div>
				<div className='add-account-list'>
					<div className='account-category'>
						<select 
							className='account-category-selector' 
							id='account-category-selector' 
							name='account-category-selector'
						>
							<option value='transportation'>交通</option>
							<option value='living'>住宿</option>
							<option value='food'>飲食</option>
							<option value='ticket'>票券</option>
							<option value='shopping'>購物</option>
						</select>
						<span className='account-category-selector-icon'>
							<img alt='selector-icon'src={SelectIcon}/>
						</span>
					</div>
					<input 
						id='input-list-detail'
						className='input-list-detail' 
						type='text' 
						placeholder='description'
						onChange={this.onInputDetailValueChange}
					/>
					<input 
						id='input-list-amount' 
						className='input-list-amount'
						type='text' 
						placeholder='amount'
						onChange={this.onInputAmountValueChange}
					/>
					<input 
						id='input-list-submit' 
						className='input-list-submit'
						type='submit' 
						value='Add'
						onClick={this.createAccountList}
					/>
				</div>
				
			</div>
		)
	}
};

export default Accounts;