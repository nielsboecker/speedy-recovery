import React, { Component } from 'react';
import './App.css';
import Header from '../shared/Header';
import StartPage from '../start/StartPage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
         <StartPage/>
      </div>
    );
  }
}

export default App;
