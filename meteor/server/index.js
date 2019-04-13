import { Meteor } from 'meteor/meteor'; // eslint-disable-line
import todo from './todo';
import info from './info';
import { onPageLoad } from 'meteor/server-render'; // eslint-disable-line

Meteor.startup(() => {
  console.log(`\n meteor connect mongoDB url：${process.env.MONGO_URL}`);
  if (todo.find().count() === 0) {
    const list = [
      {
        name: 'test',
      },
      {
        name: 'todo',
      },
    ];
    for (let i = 0; i < list.length; i += 1) {
      todo.insert({
        createTime: new Date(),
        id: i + 1,
        ...list[i],
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

onPageLoad(dom => {
  const infoHtml = infoList
    .map(item => {
      return `<li>${item.name || item.id}</li>`;
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
