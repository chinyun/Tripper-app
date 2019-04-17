import React, { Component } from 'react';
import './Accounts.css';
import Scroll from './Scroll';
import List from './List';
import SelectIcon from './select-icon.png'; 



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
			category: '',
			Detail: '',
			Amount: '',
			list: []
		};
		this.id = 0;
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
	

	onSelectChange = () => { 
		let select = document.getElementById('account-category-selector');
		let index = select.selectedIndex; 
		this.setState({
			Category: select.options[index].text
		})
	};

	onDetailValueChange = (event) => {
		this.setState({ Detail: event.target.value });
	};

	onAmountValueChange = (event) => {
		this.setState({ Amount: event.target.value });
	};

	removeListItem = ( event ) => {
		this.setState({
			list: this.state.list.filter(item => item.id !== list.id)
		});
	};

	createAccountList = ( event ) => {
		this.setState({ 
			list: [...this.state.list, {
				category: this.state.Category,
				detail: this.state.Detail,
				amount: this.state.Amount,
				id: this.id++
			}],
			Category: '',
			Detail: '',
			Amount: ''
		})
	}

	render () {
		return (
			<div className='account-table'>
				<div className='scroll-account-list'>
				<Scroll>
					<ul className='account-list'>
						{this.state.list.map( item => 
							<List 
								key={list.id} 
								list={list}
								removeListItem={removeListItem}
							/> 
						)}
					</ul>
				</Scroll>
			</div>	
				<div className='add-account-list'>
					<div className='account-category'>
						<select 
							className='account-category-selector' 
							id='account-category-selector' 
							name='account-category-selector'
							value={this.onSelectChange}
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