import React, { Component } from 'react';
import Landing from './components/Landing/Landing';
import Navigation from './components/Navigation/Navigation';
import SideBar from './components/SideBar/SideBar';
import SetBudget from './components/SetBudget/SetBudget';
// import Export from './components/Export/Export';
import Accounts from './components/Accounts/Accounts';
import Charts from './components/Charts/Charts';

// import logo from './logo.svg';
import './App.css';


const initialState = {
  expenditure: 0,
  transportation: 0,
  living: 0,
  food: 0,
  tickets: 0,
  shopping: 0,
  route: 'landing',
  isSignedIn: true,

}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  };

  onRouteChange = (route) => {
    this.setState({ route: route });
    if (route === 'home') {
      this.setState({ isSignedIn: true });
      console.log(route);
    } else {
      this.setState({ isSignedIn: false });
    }
  };

  render () {
    return (
      <div className='app'>
        { this.state.isSignedIn === true
          ? <div className='home'>
              <Navigation
                onRouteChange={this.onRouteChange}
              />
              <div className='container'>
                <div className='side-bar'>
                  <SideBar/>
                </div>
                <div className='section'>
                  <div className='control-pannel'>
                    <SetBudget/>
                    {/* 
                      <Export/>
                   */}
                  </div>
                  <div className='dashboard'>
                    <Accounts/>
                    <Charts/>
                  </div>
                </div>
              </div>
            </div>
          : <Landing
              onRouteChange={this.onRouteChange}
            />
        }
      </div>
    );
  }
}

export default App;
