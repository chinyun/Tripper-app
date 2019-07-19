import React, { Component } from 'react';
import SideBar from './SideBar/SideBar';
import StaticPannel from './StaticPannel/StaticPannel';
import SetBudget from './SetBudget/SetBudget';
import Accounts from './Accounts/Accounts';
import Charts from './Charts/Charts';
import Days from './Days/Days';
import './Home.css';
import SelectIcon from './Icons/select-black-icon.png';
import AddIcon from './Icons/add-blue-icon.png';

const getData = (datas) => {
  const getPercentage = (num) => {
    num.toFixed(3);
    let result = (num*100).toString();
    return result.slice(0,4);
  };

  const traffic_percentage = getPercentage(datas[0].traffic_expense / datas[0].expense),
    food_percentage = getPercentage(datas[0].food_expense / datas[0].expense),
    living_percentage = getPercentage(datas[0].living_expense / datas[0].expense),
    ticket_percentage = getPercentage(datas[0].ticket_expense / datas[0].expense),
    shopping_percentage = getPercentage(datas[0].shopping_expense / datas[0].expense);

  const data = [{ 
    name: '交通',
    cost: datas[0].traffic_expense,
    percentage: `${traffic_percentage}%`
  }, { 
    name: '食物',
    cost: datas[0].food_expense,
    percentage: `${food_percentage}%`
  }, { 
    name: '住宿',
    cost: datas[0].living_expense,
    percentage: `${living_percentage}%`
  }, {
    name: '票券',
    cost: datas[0].ticket_expense,
    percentage: `${ticket_percentage}%`
  }, {
    name: '購物',
    cost: datas[0].shopping_expense,
    percentage: `${shopping_percentage}%`
  }];
  return data;
 }

class Home extends Component {
  constructor(props){
    super(props);
    const {journeys, initialJourney} = this.props;
    this.state = {
      journeyId: journeys[journeys.length-1].id,
      displayedJourney: initialJourney,
      accounts: initialJourney[0].accountList,
      expenseList: initialJourney[0].accountList[0].expenseList,
      test: journeys[journeys.length-1].name,
      displayedAccountId: initialJourney[0].accountList[0].id,
      newDay: 2,
      data: getData(initialJourney),
      countDays: initialJourney[0].accountList.length
    }
  };

  onJourneyChange = (id) => {
    const target = this.props.journeys.filter(item => item.id === id);
    this.setState({
      journeyId: id,
      displayedJourney: target,
      accounts: target[0].accountList,
      expenseList: target[0].accountList[0].expenseList,
      test: target[0].name,
      displayedAccountId: target[0].accountList[0].id,
      data: getData(target)
    });
  };

  onDayChange = (event) => {
    const id = +event.target.value;
    const day = this.state.accounts.filter(item => item.id === id);
    console.log(day[0].id);
    this.setState({ 
      expenseList: day[0].expenseList,
      displayedAccountId: day[0].id
    });
  };

  handleAddJourney = (newJourney)=> {
    this.props.addJourney(newJourney);
    this.setState({
      journeyId: newJourney[0].id,
      displayedJourney: newJourney,
      accounts: newJourney[0].accountList,
      expenseList: newJourney[0].accountList[0].expenseList,
      test: newJourney[0].name,
      data: getData(newJourney)
    })
  };

  handleBudgetsChange = (budgets, journeyId) => {
    this.props.updateBudgets(budgets, journeyId);
    this.setState({
      displayedJourney: budgets
    })
  };

  handleRemoveJourney = (updatedJourney, delJourneyId) => {
    this.props.removeJourney(updatedJourney, delJourneyId);
    const {journeys, initialJourney} = this.props;
    this.setState({
      journeyId: journeys[journeys.length-1].id,
      displayedJourney: initialJourney,
      accounts: initialJourney[0].accountList,
      expenseList: initialJourney[0].accountList[0].expenseList,
      test: journeys[journeys.length-1].name,
      displayedAccountId: initialJourney[0].accountList[0].id,
      data: getData(initialJourney)
    })
  };

  createNewDay = () => {
    const newDay = `Day${this.state.accounts.length + 1}`;
    fetch('http://localhost:3000/accounts', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: newDay,
        journey_id: this.state.journeyId
      })
    })
    .then(response => response.json())
    .then(updatedJourney => {
      this.props.addAccount(updatedJourney);
      const displayedAccount = updatedJourney[0].accountList.filter(item => item.name === newDay);
      this.setState({
        displayedJourney: updatedJourney,
        accounts: updatedJourney[0].accountList,
        expenseList: displayedAccount[0].expenseList,
        displayedAccountId: displayedAccount[0].id,
        data: getData(updatedJourney)
      });
    })
    .catch(err => alert('unable to add day'));
  };

  handleRemoveAccount = (delAccountId) => {
    fetch(`http://localhost:3000/accounts/${delAccountId}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(updatedJourney=> {
      this.props.removeAccount(updatedJourney);
      this.setState({
        accounts: updatedJourney[0].accountList,
        expenseList: updatedJourney[0].accountList[0].expenseList,
        displayedAccountId: updatedJourney[0].accountList[0].id
      })
    })
    .catch(err => alert('unable to delete'));
  };

  handleAddExpense = (updatedJourney, displayedAccountId) => {
    this.props.addExpense(updatedJourney);
    const displayedAccount = updatedJourney[0].accountList.filter(item =>
      item.id === displayedAccountId);
    this.setState({
      displayedJourney: updatedJourney,
      accounts: updatedJourney[0].accountList,
      expenseList: displayedAccount[0].expenseList,
      data: getData(updatedJourney)
    });
  };

  handleUpdateExpense = (updatedJourney) => {
    this.props.updateExpense(updatedJourney);
    const { displayedAccountId } = this.state;
    const displayedAccount = updatedJourney[0].accountList.filter(item =>
      item.id === displayedAccountId);
    this.setState({
      displayedJourney: updatedJourney,
      accounts: updatedJourney[0].accountList,
      expenseList: displayedAccount[0].expenseList,
      data: getData(updatedJourney)
    })
  };

  handleRemoveExpense = (updatedJourney, displayedAccountId) => {
    this.props.removeExpense(updatedJourney);
    const displayedAccount = updatedJourney[0].accountList.filter(item =>
      item.id === displayedAccountId);
    this.setState({
      displayedJourney: updatedJourney,
      accounts: updatedJourney[0].accountList,
      expenseList: displayedAccount[0].expenseList,
      data: getData(updatedJourney)
    })
  };

  render( ) {
    return (
      <div className='home-container'>
        {/*<div className='side-bar'>
          <SideBar
            user={this.props.user}
            journeyList={this.props.journeyList}
            onJourneyChange={this.onJourneyChange}
            handleAddJourney={this.handleAddJourney}
            updateJourney={this.props.updateJourney}
            handleRemoveJourney={this.handleRemoveJourney}
          />
        </div>
        <div className='footer'>
          <p className='web-info'>2019 Tripper. Created by Chin Yun Chen.</p>
        </div>
      */}
        <div className='main-section'>
          <StaticPannel
            test={this.state.test}
            displayedJourney={this.state.displayedJourney}
            journeyId={this.state.journeyId}
            handleBudgetsChange={this.handleBudgetsChange}
          />
          <div className='sub-section'>
            <SetBudget
              journeyId={this.state.journeyId}
              displayedJourney={this.state.displayedJourney}
              handleBudgetsChange={this.handleBudgetsChange}
            />
            <div className='minor-section'>
              <Charts
                displayedJourney={this.state.displayedJourney}
                data={this.state.data}
              />
              <div className='accounts-wrapper'>
                <div className='accounts-nav'>
                  <div className='left-column'>
                    <p className='home-title'>{this.state.countDays} Days</p>
                    <div className='add-day'>
                      <button
                        className='control-btn' 
                        onClick={this.createNewDay}
                      >
                        <img className='add-icon-img' alt='add' src={AddIcon}/>
                        <span>新增旅遊天數</span>
                      </button>
                    </div>
                  </div>
                  <div className='right-column'>
                    <div className='accounts-days'>
                      <select 
                        className='accounts-day-selector' 
                        name='accounts-day-selector'
                        onChange={this.onDayChange}
                      >
                        { this.state.accounts.map( day => 
                          <Days 
                            key={day.id} 
                            day={day}
                          />
                        )}
                      </select>
                      <span className='account-category-selector-icon'>
                        <img className='select-icon-img' alt='select' src={SelectIcon}/>
                      </span>
                    </div>
                    <div className='delete-day'>
                      <button 
                        className='delete-btn' 
                        onClick={() => this.handleRemoveAccount(this.state.displayedAccountId)}
                      >
                        <span>刪除</span>
                      </button>
                    </div>
                  </div>
                </div>
                <Accounts
                  accounts={this.state.accounts}
                  expenseList={this.state.expenseList}
                  displayedAccountId={this.state.displayedAccountId}
                  handleAddExpense={this.handleAddExpense}
                  handleUpdateExpense={this.handleUpdateExpense}
                  handleRemoveExpense={this.handleRemoveExpense}
                />
              </div>
            </div>
          </div>    
        </div>
      </div>
    );
  }
};

export default Home;