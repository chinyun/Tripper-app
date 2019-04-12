import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import SideBar from './components/SideBar/SideBar';
// import SetBudget from './components/SetBudget/SetBudget';
// import Export from './components/Export/Export';
import Accounts from './components/Accounts/Accounts';
// import Dashboard from './components/Dashboard/Dashboard';

// import logo from './logo.svg';
import './App.css';


const initialstate = {
  expenditure: 0,
  transportation: 0,
  living: 0,
  food: 0,
  tickets: 0,
  shopping:0,
} 

class App extends Component {
  constructor(){
    super();
    this.state = initialstate;
  }

  render() {
    return (
      <div className='app'>
        <Navigation/>
        {/*<SideBar/>*/}
        <div className='container'>
           <div className ='control-pannel'>
          {/* 
            <SetBudget/>
            <Export/>
         */}
          </div>
          <div className='section'>
            <Accounts/>
            {/*
              
              <Dashboard/>
            */}
          </div>
        </div>

      </div>
    );
  }
}

export default App;
