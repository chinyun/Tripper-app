import React, { Component } from 'react';
import './SetBudget.css';
import SelectIcon from './select-white-icon.png'; 


class SetBudget extends Component {
	constructor ( ) {
		super();
		this.state = {
		};
	}

	render( ){
		return (
			<div className='setting-control-wrapper'> 
				<div className='setting-control'>
					<p className='setting-control-title'>預算設定</p>
					<div className='setting-control-main'>
						<div className='setting-control-container'>
							<div className='setting-control-session'>
								<span className='title'>幣別</span>
								<div className='currency-category'>
									<select 
										className='currency-category-selector' 
										id='currency-category-selector' 
										name='currency-category-selector'
										// onChange={}
									>
										<option value='台幣'>台幣 NTD</option>
										<option value='日圓'>日圓 JPY</option>
									</select>
									<span className='currency-category-selector-icon'>
										<img alt='select-white-icon'src={SelectIcon}/>
									</span>
								</div>
							</div>
							<div className='setting-control-session'>
								<span className='title'>目標</span>
								<input 
									id='aim-cost-input'
									className='aim-cost-input' 
									type='text' 
									placeholder='0'
									// value={}
									// onChange={}
								/>
							</div>
							<div className='setting-control-session'>
								<span className='title'>剩餘</span>
								<span className='balance-content'>0</span>
							</div>
						</div>

						<div className='setting-control-container'>
							<div className='setting-control-session'>
								<span className='title'>交通</span>
								<input 
									id='traffic-budget-input'
									className='traffic-budget-input' 
									type='text' 
									placeholder='0'
									// value={}
									// onChange={}
								/>
							</div>
							<div className='setting-control-session'>
								<span className='title'>住宿</span>
								<input 
									id='living-budget-input'
									className='living-budget-input' 
									type='text' 
									placeholder='0'
									// value={}
									// onChange={}
								/>
							</div>
							<div className='setting-control-session'>
								<span className='title'>飲食</span>
								<input 
									id='food-budget-input'
									className='food-budget-input' 
									type='text' 
									placeholder='0'
									// value={}
									// onChange={}
								/>
							</div>
						</div>

						<div className='setting-control-container'>
							<div className='setting-control-session'>
								<span className='title'>票券</span>
								<input 
									id='ticket-budget-input'
									className='ticket-budget-input' 
									type='text' 
									placeholder='0'
									// value={}
									// onChange={}
								/>
							</div>
							<div className='setting-control-session'>
								<span className='title'>購物</span>
								<input 
									id='shopping-budget-input'
									className='shopping-budget-input' 
									type='text' 
									placeholder='0'
									// value={}
									// onChange={}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default SetBudget;