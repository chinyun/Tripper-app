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
  const total = datas[0].expense,
    traffic = datas[0].traffic_expense,
    food = datas[0].food_expense,
    living = datas[0].living_expense,
    ticket = datas[0].ticket_expense,
    shopping = datas[0].shopping_expense;

  const getPercentage = (target) => {
    if(total === '0') {
      return 0;
    } else {
      const num = target / total;
      num.toFixed(3);
      let result = (num*100).toString();
      return result.slice(0,4);
    }    
  };

  const trafficPercentage = getPercentage(traffic),
    foodPercentage = getPercentage(food),
    livingPercentage = getPercentage(living),
    ticketPercentage = getPercentage(ticket),
    shoppingPercentage = getPercentage(shopping);

  const data = [{ 
    name: '交通',
    cost: traffic,
    percentage: `${trafficPercentage}`,
    color: 'traffic-color'
  }, { 
    name: '食物',
    cost: food,
    percentage: `${foodPercentage}`,
    color: 'food-color'
  }, { 
    name: '住宿',
    cost: living,
    percentage: `${livingPercentage}`,
    color: 'living-color'
  }, {
    name: '票券',
    cost: ticket,
    percentage: `${ticketPercentage}`,
    color: 'ticket-color'
  }, {
    name: '購物',
    cost: shopping,
    percentage: `${shoppingPercentage}`,
    color: 'shopping-color'
  }];
  return data;
};

class Home extends Component {
  constructor(props){
    super(props);
    const {journeys, initialJourney} = this.props;
    this.state = {
      journeyId: journeys[journeys.length-1].id,
      displayedJourney: initialJourney,
      accounts: initialJourney[0].accountList,
      expenseList: initialJourney[0].accountList[0].expenseList,
      journeyName: journeys[journeys.length-1].name,
      displayedAccountId: initialJourney[0].accountList[0].id,
      displayedDay:initialJourney[0].accountList[0].name,
      countDays: initialJourney[0].accountList.length,
      data: getData(initialJourney),
      isSelecting: false
    }
  };

  onJourneyChange = (id) => {
    const target = this.props.journeys.filter(item => item.id === id);
    this.setState({
      journeyId: id,
      displayedJourney: target,
      accounts: target[0].accountList,
      expenseList: target[0].accountList[0].expenseList,
      journeyName: target[0].name,
      displayedAccountId: target[0].accountList[0].id,
      countDays: target[0].accountList.length,
      data: getData(target)
    });
  };

  onDayChange = (id) => {
    const day = this.state.accounts.filter(item => item.id === id);
    this.setState({ 
      expenseList: day[0].expenseList,
      displayedAccountId: day[0].id,
      displayedDay: day[0].name,
      isSelecting: false
    });
  };

  handleAddJourney = (newJourney)=> {
    this.props.addJourney(newJourney);
    this.setState({
      journeyId: newJourney[0].id,
      displayedJourney: newJourney,
      accounts: newJourney[0].accountList,
      expenseList: newJourney[0].accountList[0].expenseList,
      journeyName: newJourney[0].name,
      data: getData(newJourney)
    })
  };

  handleBudgetsChange = (journey, journeyId) => {
    this.props.updateBudgets(journey, journeyId);
    this.setState({
      displayedJourney: journey
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
      journeyName: journeys[journeys.length-1].name,
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
        displayedDay: displayedAccount[0].name,
        countDays: updatedJourney[0].accountList.length,
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
        displayedAccountId: updatedJourney[0].accountList[0].id,
        displayedDay: updatedJourney[0].accountList[0].name,
        countDays: updatedJourney[0].accountList.length
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

  onSelecting = () => {
    if(this.state.isSelecting === false) {
      this.setState({ isSelecting: true })
    } else {
      this.setState({ isSelecting: false })
    }
  };

  render( ) {
    return (
      <div className='home-container'>
        <div className={ this.props.isShowedSideBar === false
          ? 'side-bar-wrapper'
          : 'side-bar-hidden'
        }>
          <SideBar
            user={this.props.user}
            journeyList={this.props.journeyList}
            onJourneyChange={this.onJourneyChange}
            handleAddJourney={this.handleAddJourney}
            updateJourney={this.props.updateJourney}
            handleRemoveJourney={this.handleRemoveJourney}
          />
        </div>
        {/*<div className='footer'>
          <p className='web-info'>2019 Tripper. Created by Chin Yun Chen.</p>
        </div>
      */}
        <div className='main-section'>
          <StaticPannel
            journeyName={this.state.journeyName}
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
                      <button
                        className='days-selector-btn'
                        onClick={() => this.onSelecting()}
                      >
                        <span className='days-name'>{this.state.displayedDay}</span>
                        <span className='days-selector-btn-icon'>
                          <img 
                            className='days-selector-btn-icon-img' 
                            alt='select' 
                            src={SelectIcon}
                          />
                        </span>
                      </button>
                      <div className={ this.state.isSelecting === false
                          ? 'days-selector-hidden'
                          : 'days-selector-wrapper'
                        }>
                        <div className='days-selector'>
                          { this.state.accounts.map(day => 
                            <Days 
                              key={day.id} 
                              day={day} 
                              onDayChange={this.onDayChange}
                            />
                          )}
                        </div>
                      </div>
                    </div>                   
                    <div className='delete-day'>
                      <button className='delete-btn' onClick={() => {
                        this.handleRemoveAccount(this.state.displayedAccountId)
                      }}><span>刪除</span>
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