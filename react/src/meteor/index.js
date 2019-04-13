import React, {Component} from 'react';
import {getDDP, disconnectSocket} from './service';

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

    recordSubscriptions = {};

    state = {
      meteorList: [],
      initOver: false,
    };

    componentDidMount() {
      if (!this.ddp) {
        alert('数据推送连接错误')
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
      const {ddp} = this;
      const self = this;
      ddp.method(methodName);
      ddp.on('result', data => {
        const {result} = data;
        console.log(data);
        self.setState({
          meteorList: result,
          initOver: true,
        });
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
          // console.log(response);
          self.getDataResult();
        });
      });
      ddp.on('error', response => {
        alert(`服务器推送数据错误,错误消息：${response}`)
      });
      ddp.on('ready', () => {
        // console.log(response);
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
