import React, { Component } from 'react';
import './StaticPannel.css';
import UpdateIcon from './update-blue-icon.png';
import CancelIcon from './cancel-dark-icon.png';

class StaticPannel extends Component {
  constructor(props) {
    super(props);
    const { displayedJourney } = this.props;
    this.state = {
      budget: displayedJourney[0].budget,
      expense: displayedJourney[0].expense,
      isEditing: ''
    }
  }

  onBudgetChange = (event) => { this.setState({ budget: event.target.value }) };
  handleEditing = (target) => { this.setState({ isEditing: target }) };

  handleEnter = (event) => {
    const { journeyId } = this.props;
    if(event.key === 'Enter') {
      fetch(`http://localhost:3000/journeys_budgets/${journeyId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          budget: this.state.budget
        })
      })
      .then(response => response.json())
      .then(budgets=> {
        this.props.handleBudgetsChange(budgets, journeyId);
      })
      .catch(err => alert('unable to edit budget'));
      this.setState({ isEditing: '' });
    }
  }

  render() {
    const { budget, expense, isEditing } = this.state;
    return (
      <div className='static-pannel-wrapper'>
        <p className='home-title'>行程 {this.props.test}</p>
        <div className='static-pannel'>
          <div className='static-pannel-section-wrapper'>
            <div className='static-pannel-section'>
              <div className='static-pannel-topic'>
                <p className='static-pannel-title'>目標</p>
                <p className='static-pannel-subtitle '>總預算</p>
              </div>
              { isEditing === 'budget' 
                ? <div className='static-pannel-update'>
                    <input 
                      id='total-budget-input'
                      className='static-pannel-input' 
                      type='text' 
                      placeholder={budget}
                      value={budget}
                      onChange={this.onBudgetChange}
                      onKeyDown={this.handleEnter}
                    />
                    <button className='cancel-btn' onClick={()=>this.handleEditing('')}>
                      <img className='cancel-icon-img' alt='cancel' src={CancelIcon}/>
                    </button>
                  </div>
                : <div className='static-pannel-text'>
                    <span className='static-pannel-amount editable-text'>{budget}</span>
                    <button className='control-btn' onClick={()=> this.handleEditing('budget')}>
                      <img className='update-icon-img' alt='update' src={UpdateIcon}/>
                    </button>
                  </div>
              }
            </div>
          </div>
          <div className='static-pannel-section-wrapper'>
            <div className='static-pannel-section'>
              <div className='static-pannel-topic'>
                <p className='static-pannel-title'>支出</p>
                <p className='static-pannel-subtitle'>總支出</p>
              </div>
              <span className='static-pannel-amount'>{expense}</span>
            </div>
          </div>
          <div className='static-pannel-section-wrapper'>
            <div className='static-pannel-section'>
              <div className='static-pannel-topic'>
                <p className='static-pannel-title'>剩餘</p>
                <p className='static-pannel-subtitle'>可支配預算</p>
              </div>
              <span className='static-pannel-amount'>{budget - expense}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default StaticPannel;
