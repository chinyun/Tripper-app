import React, { Component } from 'react';
import './SideBar.css';
import	Journey from './Journey';
import AddIcon from './add-icon.png';

class SideBar extends Component {
	constructor ( ) {
		super();
		this.state = {
			userId:'',
			journeys:[],
			newJourney:'',
			isShowed: false
		};
		this.initailFileId = 0;
	};

	showAddJourney = ( event ) => {
		this.setState({
			isShowed: true
		})
		// if( inputJourneyWrapper.style.display === 'none') {
		// 	inputJourneyWrapper.style.display = 'block';	
		// } else {
		// 	inputJourneyWrapper.style.display = 'none';
		// }
	};

	removeJourney = ( journey ) => {
		this.setState({
			journeys: this.state.journeys.filter(item => item.id !== journey.id )
		});
	};

	onJourneyValueChange = ( event ) => {	
		this.setState({ newJourney: event.target.value });
	};

	createJourney = ( event ) => {
		this.setState({
			journeys: [...this.state.journeys, {
				text: this.state.newJourney,
				id: this.initailFileId++
			}],
			newJourney:'',
			isShowed: false
		})
	};

	cancelNewSubmit = ( event ) => {
		this.setState({
			isShowed: false
		})
	};

	render( ) {
		return (
			<div className='sidenav'>
				<ul className='journey-list'>
				{/*   
					<li className='journey-list-item'> 範例 </li>
					<li className='journey-list-item'> 2017 京都大阪行 </li>
					<li className='journey-list-item'> 2018 福岡九州 </li>
					<li className='journey-list-item'> 2019 東京賞櫻 </li>
				*/}
					{this.state.journeys.map( journey => 
						<Journey
							key={journey.id}
							journey={journey}
							removeJourney={this.removeJourney}
						/>)}
				</ul>

				<div className='add-journey-wrapper'>
					{ this.state.isShowed === false
						? <button
								className='show-add-journey'
								onClick={this.showAddJourney}
							>
								<img 
									className='add-journey-img' 
									alt='add' 
									src={AddIcon} 
								/>
								<span className='show-add-journey-text'>新增行程表</span>
							</button>
						: <div className='add-journey'>
								<input 
									id='input-journey'
									className='input-journey' 
									type='text' 
									placeholder='新增行程表'
									value={this.state.newJourney}
									onChange={this.onJourneyValueChange}
								/>
								<div className='submit-new-journey'>
									<input 
										id='input-new-journey' 
										className='input-new-journey'
										type='submit' 
										value='新增'
										onClick={this.createJourney}
									/>
									<input 
										id='cancel-new-submit' 
										className='cancel-new-submit'
										type='submit' 
										value='取消'
										onClick={this.cancelNewSubmit}
									/>
								</div>
							</div>	
					}
				</div>
			</div>
		)
	};
};

export default SideBar;

