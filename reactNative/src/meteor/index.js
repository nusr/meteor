import React, {Component} from 'react';
import {Alert} from 'react-native'

import {getDDP, disconnectSocket} from './service'


const PUBLIC_EVENTS = [
  // 'ready',
  // 'nosub',
  'added',
  'changed',
  'removed',
  // 'result',
  // 'updated',
  // 'error',
];
export default (WrapperComponent, {collectionName, methodName}) => {
  class MeteorWrapper extends Component {
    ddp = getDDP();
    lockRequest = false
    recordSubscriptions = {};

    state = {
      meteorList: [],
      initOver: false,
    };

    componentDidMount() {
      if (!this.ddp) {
        Alert.alert(
          '连接错误',
          '数据推送未连接上服务器!'
        )
        return;
      }
      // 添加订阅
      this.addSubscription();
    }

    componentWillUnmount() {
      // 取消订阅
      this.removeSubscription();
      // 断开连接
      disconnectSocket();
    }

    getDataResult() {
      // 防止初始化请求次数过多
      if (this.lockRequest) {
        return
      }
      this.lockRequest = true
      const {ddp} = this;

      const self = this;
      /**
       * 数组传递参数，meteor 接受到的是列表
       */
      ddp.method(methodName, [1, 10]);
      ddp.on('result', data => {
        const {result} = data;
        console.log(data);
        self.setState({
          meteorList: result,
          initOver: true,
        });
        self.lockRequest = false
      });
    }

    componentDidCatch(error, info) {
      console.error(error, info);
    }

    addSubscription() {
      if (!collectionName) {
        console.error('mongodb collection 为空！');
        return;
      }
      const {ddp} = this;
      const self = this;
      // 订阅数据
      self.recordSubscriptions[collectionName] = ddp.sub(collectionName);
      PUBLIC_EVENTS.forEach(event => {
        ddp.on(event, () => {
          console.log(event)
          self.getDataResult();
        });
      });
      ddp.on('error', response => {
        Alert.alert(
          '服务器推送数据错误',
          `错误消息：${response}`
        )

      });
      ddp.on('ready', () => {
        console.log('ready')
        self.getDataResult();
      });
    }

    removeSubscription() {
      this.ddp.unsub(this.recordSubscriptions[collectionName]);
    }

    render() {
      return <WrapperComponent {...this.props} {...this.state} />;
    }
  }

  return MeteorWrapper;
};
