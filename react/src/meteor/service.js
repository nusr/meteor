import DDP from 'ddp.js';

/**
 * meteor 连接选项
 */
const meteorOptions = {
    endpoint: 'ws://localhost:9090/websocket', // react native 中 localhost 要改成本地IP才可以，否则连接失败
    SocketConstructor: WebSocket,
    reconnectInterval: 10000,
    autoConnect: true,
    autoReconnect: true,
};
let ddpInstance = null;

/**
 *
 * 获取 ddp 实例
 * @export
 * @returns
 */
export function getDDP() {
    if (!ddpInstance) {
        ddpInstance = new DDP(meteorOptions);
        return ddpInstance;
    }
    return ddpInstance;
}

/**
 *
 * 断开 socket 连接
 * @export
 */
export function disconnectSocket() {
    if (ddpInstance) {
        ddpInstance.disconnect();
    }
}

// mongo 集合名
export const COLLECTIONS_LIST = {
    todo: {
        collectionName: 'todo',
        methodName: 'getAllTodo',
    },
};
