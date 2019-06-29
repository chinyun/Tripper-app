import React, { Component } from 'react';
import Landing from './components/Landing/Landing';
import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home';
import './App.css';
// import logo from './logo.svg';

const initialState = {
  user: {
    id: '',
    name: '',
    email: ''
  },
  journeys: [],
  journeyList:[],
  route: 'landing',
  isSignedIn: false
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  };

  loadUser = (user) => {
    this.setState({
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    })
  };

  loadJourneys = (journey) => {
    journey.map( (item) => {
      return this.setState({
        journeys: [...this.state.journeys, {
          id: item.id,
          name: item.name,
          budget: item.budget,
          expense: item.expense,
          traffic_budget: item.traffic_budget,
          food_budget: item.food_budget,
          living_budget: item.living_budget,
          ticket_budget: item.ticket_budget,
          shopping_budget: item.shopping_budget,
          accountList: item.accountList
        }],
        journeyList: [...this.state.journeyList, {
          id: item.id,
          name: item.name
        }]
      });
    });
  };

  onRouteChange = (route) => {
    this.setState({ route: route });
    if (route === 'home') {
      this.setState({ isSignedIn: true });
    } else {
      this.setState({ isSignedIn: false });
    }
  };

  addJourney = (newJourney) => {
    this.setState({
      journeys: [...this.state.journeys, newJourney[0]],
      journeyList: [...this.state.journeyList, {
        id: newJourney[0].id,
        name: newJourney[0].name
      }]
    })
  };

  updateJourney = (journey) => {
    const index =  this.state.journeyList.findIndex((item)=> item.id === journey[0].id);
    if (index !== -1) {
      this.setState({
        journeys: [
          ...this.state.journeys.slice(0, index),
          Object.assign({}, this.state.journeys[index], journey[0]),
          ...this.state.journeys.slice(index + 1)
        ],
        journeyList: [
          ...this.state.journeyList.slice(0, index),
           Object.assign({}, this.state.journeyList[index], journey[1]),
           ...this.state.journeyList.slice(index + 1)
        ]
      });
    }
  };

  updateBudgets = (budgets, journeyId) => {
    const index =  this.state.journeyList.findIndex(item => item.id === journeyId);
    if (index !== -1) {
      this.setState({
        journeys: [
          ...this.state.journeys.slice(0, index),
          Object.assign({}, this.state.journeys[index], budgets[0]),
          ...this.state.journeys.slice(index + 1)
        ]
      })
    }
  };

  removeJourney = (updatedJourney, delJourneyId) => {
    const index = this.state.journeyList.findIndex(item => item.id === delJourneyId);
    if(index !== -1) {
      this.setState({
        journeys: [
          ...this.state.journeys.slice(0, index),
          ...this.state.journeys.slice(index + 1)
        ],
        journeyList: [
          ...this.state.journeyList.slice(0, index),
          ...this.state.journeyList.slice(index + 1)
        ]
      })
    }
  };

  addAccount = (updatedJourney) => {
    const index =  this.state.journeyList.findIndex(item => item.id === updatedJourney[0].id);
    if (index !== -1) {
      this.setState({
        journeys: [
          ...this.state.journeys.slice(0, index),
          Object.assign({}, this.state.journeys[index], updatedJourney[0]),
          ...this.state.journeys.slice(index + 1)
        ]
      })
    }
  };

  removeAccount = (updatedJourney) => {
    const index =  this.state.journeyList.findIndex(item => item.id === updatedJourney[0].id);
    if (index !== -1) {
      this.setState({
        journeys: [
          ...this.state.journeys.slice(0, index),
          Object.assign({}, this.state.journeys[index], updatedJourney[0]),
          ...this.state.journeys.slice(index + 1)
        ]
      })
    }
  };

  addExpense = (updatedJourney) => {
    const index = this.state.journeyList.findIndex(item => item.id === updatedJourney[0].id);
    if (index !== -1) {
      this.setState({
        journeys: [
          ...this.state.journeys.slice(0, index),
          Object.assign({}, this.state.journeys[index], updatedJourney[0]),
          ...this.state.journeys.slice(index + 1)
        ]
      })
    }
  };

  updateExpense = (updatedJourney) => {
    const index = this.state.journeyList.findIndex(item => item.id === updatedJourney[0].id);
    if (index !== -1) {
      this.setState({
        journeys: [
          ...this.state.journeys.slice(0, index),
          Object.assign({}, this.state.journeys[index], updatedJourney[0]),
          ...this.state.journeys.slice(index + 1)
        ]
      })
    }
  };

  removeExpense = (updatedJourney) => {
    const index =  this.state.journeyList.findIndex(item => item.id === updatedJourney[0].id);
    if (index !== -1) {
      this.setState({
        journeys: [
          ...this.state.journeys.slice(0, index),
          Object.assign({}, this.state.journeys[index], updatedJourney[0]),
          ...this.state.journeys.slice(index + 1)
        ]
      })
    }
  };

  render () {
    const { user, journeys, journeyList } = this.state;
    return (
      <div className='app'> 
        { this.state.isSignedIn === true
          ? <div className='home'>
              <Navigation
                onRouteChange={this.onRouteChange}
                userName={user.name}
              />
              <Home
                user={user}
                journeys={journeys}
                journeyList={journeyList}
                initialJourney={journeys.filter(item => item.id === journeys[journeys.length-1].id)}
                addJourney={this.addJourney}
                updateJourney={this.updateJourney}
                updateBudgets={this.updateBudgets}
                removeJourney={this.removeJourney}
                addAccount={this.addAccount}
                removeAccount={this.removeAccount}
                addExpense={this.addExpense}
                updateExpense={this.updateExpense}
                removeExpense={this.removeExpense}
              />
            </div>
          : <Landing
              onRouteChange={this.onRouteChange}
              loadUser={this.loadUser}
              loadJourneys={this.loadJourneys}
            />
        }
      </div>
    );
  }
}

export default App;
