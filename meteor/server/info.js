import {Meteor} from 'meteor/meteor'; // eslint-disable-line
import {COLLECTIONS_LIST, PAGINATION_CONFIG} from './config';

const Info = new Meteor.Collection(COLLECTIONS_LIST.info);
Meteor.publish(COLLECTIONS_LIST.info, () => {
  return Info.find();
});
/**
 * front end can call it
 */
Meteor.methods({
  /**
   *  前端传递的数组参数，meteor 接收到的是列表
   * @param {前端传递的数组参数} param1
   * @param {前端传递的数组参数} param2
   * @returns {any}
   */
  getAllInfo(param1, param2) {
    console.log(param1, param2)
    return Info.find().fetch();
  },
  getPageInfo(currentPage = 1, pageSize = PAGINATION_CONFIG.pageSize) {
    if (page < 1) {
      return null;
    }
    const total = Info.find().count();
    const list = Info.find(
      {},
      {
        skip: (currentPage - 1) * pageSize,
        limit: pageSize,
      }
    ).fetch();
    return {total, data: list};
  },
});

export default Info;
