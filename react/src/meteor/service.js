import DDP from 'ddp.js';

/**
 * meteor 连接选项
 */
const meteorOptions = {
    endpoint: 'ws://127.0.0.1:9090/websocket',
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
    info: {
        collectionName: 'info',
        methodName: 'getAllInfo',
    },
};
