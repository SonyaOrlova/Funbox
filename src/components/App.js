import React, {Component} from 'react';
import Input from './Input';
import List from './List';
import YaMap from './YaMap';

class App extends Component {

  render() {
    return (
      <div>
        <header>
          <h1>Testing...</h1>
        </header>
        <main>
          <Input />
          <List />
          <YaMap />
        </main>
      </div>
    );
  }
};

export default App;

