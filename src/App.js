import React, { Component } from 'react';
import Header from './components/Header/Header';
import TrelloWrapper from './pages/TrelloWrapper/TrelloWrapper';

class App extends Component {
  render() {
    return (
      <div className="App">
       <Header theme="primary">Nutanix Dashboard</Header>
       <TrelloWrapper />
      </div>
    );
  }
}

export default App;
