import React, {Component} from 'react';
import {List, Skeleton} from 'antd';
import './App.css';
import MeteorWrapper, {COLLECTIONS_LIST} from './meteor'

class App extends Component {

  render() {
    console.log(this.props)
    const {meteorList = [], initOver} = this.props
    return (
      <div className="App">
        <List
          itemLayout="horizontal"
          dataSource={meteorList}
          renderItem={item => (
            <List.Item key={item.id}>
              <Skeleton loading={!initOver} active avatar>
                <List.Item.Meta
                  title={item.name}
                  description={item.desc}
                />
              </Skeleton>

            </List.Item>
          )}
        />
      </div>
    );
  }
}


export default MeteorWrapper(App, COLLECTIONS_LIST.info)
