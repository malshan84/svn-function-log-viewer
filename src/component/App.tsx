import * as React from 'react';
import subscribeToTimer from '../api';

interface AppState {
  timestamp: number;
}

class App extends React.Component <{}, AppState> {
  constructor() {
    super();
    this.state = {
      timestamp: -1
    };
    subscribeToTimer((timestamp: number) => this.setState({
      timestamp
    }));
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
         This is the timer value: {this.state.timestamp}
        </p>
      </div>
    );
  }
}

export default App;
