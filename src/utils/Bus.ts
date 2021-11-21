/**
 *Event
 *
 * @interface Event
 */
interface Event {
    name: string
    listener: Array<Function>
}

/**
 * @Date 2021/11/13
 * @Author 二三
 * @Description 一个简单的事件发布订阅类
 * 
 * @export
 * @class Bus
 */
export default class Bus {
    private constructor() {
        //单例模式：保证不同开发人员实例化Bus类后，拿到的状态是同一个
        this._events = new Array<Event>();
    }

    private static instance: Bus
    /**
     * Bus
     *
     * @static
     * @returns {Bus}
     * @memberof Bus
     */
    static getInstance(): Bus {
        this.instance = this.instance || new Bus();
        return this.instance;
    }

    private _events: Event[];

    /**
     * @param {string} name
     * @param {Function} listener
     * @memberof Bus
     * @Description 订阅（监听事件）
     */
    bus(name: string, listener?: Function): void {
        this._events.push({ name: name, listener: listener ? [listener] : [] })
    }

    /**
     * @param {string} name
     * @param {Function} listener
     * @memberof Bus
     * @Description 添加（监听事件）
     */
    add(name: string, listener: Function): void {
        this._events.filter(event => { 
            if(event.name === name) event.listener.push(listener);
        })
    }

    /**
     * @param {string} name
     * @param {*} [message]
     * @memberof Bus
     * @Description 发布（触发事件）
     */
    dispatch(name: string, message?: any): void {
        this._events.filter(event => {
            if(event.name === name) event.listener.forEach(listener => listener(message));
        })
    }

    /**
     * @param {string} name
     * @memberof Bus
     * @Description 移除订阅
     */
    remove(name: string): void {
        this._events = this._events.filter(event => event.name !== name);
    }
}