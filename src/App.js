import React, { Component } from 'react';
import './App.css';
import Schedule from "./components/Schedule/Schedule";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Schedule/>
      </div>
    );
  }
}

export default App;
