import {Meteor} from 'meteor/meteor'; // eslint-disable-line
import {COLLECTIONS_LIST, PAGINATION_CONFIG} from './config';
// mongodb info collection
const Info = new Meteor.Collection(COLLECTIONS_LIST.info);
// 发布数据，前端就可以调用
Meteor.publish(COLLECTIONS_LIST.info, () => {
  return Info.find();
});
/**
 * 定义前端调用的方法
 */
Meteor.methods({
  getAllInfo() {
    return Info.find().fetch();
  },
  /**
   * 分页请求
   * @param {number 当前页面 从 1 开始} currentPage
   * @param {number 单次请求总条数} pageSize
   * @returns {{total: any, data: any}|null}
   */
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
