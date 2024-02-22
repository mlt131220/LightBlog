/**
 *BusEvent
 *
 * @interface BusEvent
 */
interface BusEvent {
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
    private _BusEvents: BusEvent[];
    //暂存器
    private _BusCollector:BusEvent[];

    private constructor() {
        //单例模式：保证不同开发人员实例化Bus类后，拿到的状态是同一个
        this._BusEvents = new Array<BusEvent>();
        this._BusCollector = new Array<BusEvent>();
    }

    private static instance: Bus;
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

    /**
     * @param {string} name
     * @param {Function} listener
     * @memberof Bus
     * @Description 订阅（监听事件）
     */
    bus(name: string, listener?: Function): void {
        //判断暂存器中是否有提前添加的监听
        if(this._BusCollector.length !== 0){
            const busCollector = this._BusCollector.filter((collector,index) => {
                if(collector.name === name) {
                    this._BusEvents.push({ name: name, listener: collector["listener"]});
                    this._BusCollector.splice(index,1);
                    return collector;
                }
            });
            if(busCollector.length === 0) this._BusEvents.push({ name: name, listener: listener ? [listener] : [] });
        }else{
            this._BusEvents.push({ name: name, listener: listener ? [listener] : [] });
        }
    }

    /**
     * @param {string} name
     * @param {Function} listener
     * @memberof Bus
     * @Description 添加（监听事件）
     */
    add(name: string, listener: Function): void {
        const busEvent = this._BusEvents.filter(BusEvent => {
            if(BusEvent.name === name) {
                BusEvent.listener.push(listener);
                return BusEvent;
            }
        });

        //如果添加时name不存在(还未订阅)，则将其监听事件放至暂存器，订阅时再添加
        if(busEvent.length === 0){
            const busCollector =  this._BusCollector.filter(BusEvent => {
                if(BusEvent.name === name) {
                    BusEvent.listener.push(listener);
                    return BusEvent;
                }
            });
            if(busCollector.length === 0) this._BusCollector.push({ name: name, listener: [listener] });
        }
    }

    /**
     * @memberof Bus
     * @Description 发布（触发事件）
     */
    dispatch(): void {
        let message:any[] = [];
        if(arguments.length > 1){
            message = Array.prototype.slice.call(arguments).slice(1);
        }
        this._BusEvents.filter(BusEvent => {
            if(BusEvent.name === arguments[0]) BusEvent.listener.forEach(listener => listener(...message));
        })
    }

    /**
     * @param {string} name
     * @memberof Bus
     * @Description 移除订阅
     */
    remove(name: string): void {
        this._BusEvents = this._BusEvents.filter(BusEvent => BusEvent.name !== name);
    }
}
