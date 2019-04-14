import {Meteor} from 'meteor/meteor'; // eslint-disable-line
import {onPageLoad} from 'meteor/server-render'; // eslint-disable-line
import todo from './todo';
import info from './info';

function uuidV4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


Meteor.startup(() => {
  console.log(`\n meteor connect mongoDB url：${process.env.MONGO_URL}`);
  if (info.find().count() === 0) {
    const mockList = [
      {
        name: '王语嫣',
        male: false
      }, {
        name: '黄蓉',
        male: false,
      },
      {
        name: '萧峰',
        male: true
      }, {
        name: '郭靖',
        male: true,
      },
      {
        name: '杨过',
        male: true
      }, {
        name: '公孙绿萼',
        male: false,
      },
      {
        name: '阿朱',
        male: false
      }, {
        name: '郭破虏',
        male: true,
      }
    ]
    for (let item of mockList) {
      let id = uuidV4()
      info.insert({
        createTime: new Date(),
        id,
        desc: item.male ? '帅到没女朋友' : '美到没男朋友',
        ...item
      });
    }
  }
});

const infoList = info
  .find(
    {},
    {
      limit: 10,
    }
  )
  .fetch();

const todoList = todo
  .find(
    {},
    {
      limit: 10,
    }
  )
  .fetch();
/**
 * meteor 服务端渲染,测试 meteor 连接
 */
onPageLoad(dom => {
  const infoHtml = infoList
    .map(item => {
      return `<li>${item.name + ' : ' + item.desc}</li>`;
    })
    .join('');

  const todoHtml = todoList
    .map(item => {
      return `<li>${item.name || item.id}</li>`;
    })
    .join('');

  dom.renderIntoElementById('server-render-info', `<h2>Info collection</h2><ol>${infoHtml}</ol>`);

  dom.renderIntoElementById('server-render-todo', `<h2>Todo collection</h2><ol>${todoHtml}</ol>`);
});
