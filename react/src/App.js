import React, {Component} from 'react';
import './App.css';
import MeteorWrapper from './meteor'
import {COLLECTIONS_LIST} from './meteor/service'

class App extends Component {

  render() {
    console.log(this.props)
    const {meteorList = []} = this.props
    return (
      <div className="App">
          {meteorList.map(item => (<div key={item.id}>{item.id}</div>))}
      </div>
    );
  }
}


export default MeteorWrapper(App, COLLECTIONS_LIST.todo)
