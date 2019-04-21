import React from 'react';
import {List, Skeleton} from 'antd';
import './App.css';
import MeteorWrapper from './meteor'
import { COLLECTIONS_LIST} from './meteor/service'

function App(props) {
  const {meteorList = [], initOver} = props
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


export default MeteorWrapper(App, COLLECTIONS_LIST.info)
