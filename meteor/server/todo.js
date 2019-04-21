import {Meteor} from 'meteor/meteor'; // eslint-disable-line
import {COLLECTIONS_LIST, PAGINATION_CONFIG} from './config';

const Todo = new Meteor.Collection(COLLECTIONS_LIST.todo);
// 发布数据，前端就可以调用
Meteor.publish(COLLECTIONS_LIST.todo, () => {
    return Todo.find();
});
/**
 * 定义前端调用的方法
 */
Meteor.methods({
    /**
     *
     * @param id
     * @returns {any}
     */
    getTodo(id) {
        return Todo.findOne(id);
    },
    /**
     *
     * @returns {any}
     */
    getAllTodo() {
        return Todo.find().fetch();
    },
    /**
     *
     * @param item
     * @returns {any}
     */
    addTodo(item) {
        return Todo.insert(item);
    },
    /**
     *
     * @param id
     * @returns {any}
     */
    removeTodo(id) {
        return Todo.remove({_id: id});
    },
    /**
     *
     * @param item
     * @returns {any}
     */
    editTodo(item) {
        return Todo.update({_id: item.id}, {$set: item});
    },
    /**
     *
     * @param {number 当前页面 从 1 开始} currentPage
     * @param {number 单次请求总条数} pageSize
     * @returns {{total: any, data: any}|null}
     */
    getPageTodo(currentPage, pageSize = PAGINATION_CONFIG.pageSize) {
        if (page < 1) {
            return null;
        }
        const total = Todo.find().count();
        const list = Todo.find(
            {},
            {
                skip: (currentPage - 1) * pageSize,
                limit: pageSize,
            }
        ).fetch();
        return {total, data: list};
    },
});
Todo.deny({
    insert() {
        return true;
    },
    update() {
        return true;
    },
    remove() {
        return true;
    },
});

export default Todo;
