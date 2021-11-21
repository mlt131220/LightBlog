/**
 * @Date 2021-11-20
 * @Author 二三
 * @Description 逆光配置文件 localStorage{get,set,clear}
 */
interface Storage {
    [key: string]: any
}

export default class NGConfig {
    static local_name = "NiGuang";
    static storage: Storage;

    constructor() {
        NGConfig.storage = {};

        if (window.localStorage[NGConfig.local_name] === undefined) {
            window.localStorage[NGConfig.local_name] = JSON.stringify(NGConfig.storage)
        } else {
            const data = JSON.parse(window.localStorage[NGConfig.local_name])

            for (const key in data) {
                NGConfig.storage[key] = data[key]
            }
        }
    }

    static getKey(key: string) {
        return NGConfig.storage[key];
    }

    static setKey() { // key, value, key, value ...
        for (let i = 0, l = arguments.length; i < l; i += 2) {
            NGConfig.storage[arguments[i]] = arguments[i + 1]
        }

        window.localStorage[NGConfig.local_name] = JSON.stringify(NGConfig.storage)
    }

    static clear() {
        delete window.localStorage[NGConfig.local_name]
    }
}