export interface TableInfo {
    table: string,
    keyPath: string
}

/**
 * @Date 2021-11-14
 * @Author 二三
 * @param {string} databaseName  indexedDB数据库名字  eg:FMScenesDB
 * @param {Array<TableInfo>} tableInfo 数据库表名与主键信息 eg:[{table:"scenes",keyPath:"sceneID"},{table:"scenechildren",keyPath:"_id"}]
 * @Description 本地indexDB存储类
 */
export default class NGIndexedDB {
    protected indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    public databaseName: string;
    public tableInfo: Array<TableInfo>;

    public database: any;

    constructor(databaseName: string, tableInfo: Array<TableInfo>) {
        this.databaseName = databaseName;
        this.tableInfo = tableInfo;

        if (indexedDB === undefined) {
            console.warn('Storage: IndexedDB 不存在');
        }
    }

    init(callback: Function) {
        // 打开或者创建数据库
        const request = indexedDB.open(this.databaseName);

        // 当数据库发生升级变换时
        request.onupgradeneeded = (event: any) => {
            const db = event.target.result
            this.tableInfo.forEach((val: TableInfo) => {
                if (!db.objectStoreNames.contains(val.table)) {
                    db.createObjectStore(val.table, {
                        keyPath: val.keyPath
                    })
                }
            })
        }

        // 打开成功
        request.onsuccess = (event: any) => {
            this.database = event.target.result
            callback(true)
        }

        // 打开错误
        request.onerror = () => {
            callback(false)
        }
    }

    isDatabaseExist(): boolean {
        return (this.database !== undefined);
    }

    addTable(tableName: string, key: string, callback: Function) {
        // 如果表已存在，直接回调
        if (this.database.objectStoreNames.contains(tableName)) {
            callback(true)
            return
        }

        const version = this.database.version + 1
        this.database.close();

        // 打开或者创建数据库
        const request = indexedDB.open(this.databaseName, version)
        request.onupgradeneeded = function (event: any) {
            const db = event.target.result
            if (!db.objectStoreNames.contains(tableName)) {
                db.createObjectStore(tableName, {
                    keyPath: key
                })
            }
        }

        // 打开成功
        request.onsuccess = (event: any) => {
            console.log('indexedDB升级成功')
            this.database = event.target.result
            callback(true)
        }
        // 打开错误
        request.onerror = function () {
            console.log('indexedDB升级失败，indexedDB已关闭')
            callback(false)
        }
    }

    add(table: string, data: any, callback: Function) {
        // 开启事务
        const request = window.database.transaction([table], 'readwrite')
            .objectStore(table).put(data);

        // 数据写入成功
        request.onsuccess = () => {
            console.log('数据写入成功');
            callback()
        }

        // 数据写入失败
        request.onerror = (event: any) => {
            console.log('数据写入失败', event, data)
        }
    }

    readAll(table: string, callback: Function) {
        const objectStore = window.database.transaction(table).objectStore(table);

        objectStore.openCursor().onsuccess = function (event: any) {
            const cursor = event.target.result;
            if (cursor) {
                callback(cursor.key)
                cursor.continue()
            }
        }
    }

    getObj(table: string, keyPath: string, callback: Function) {
        const transaction = window.database.transaction([table])
        const objectStore = transaction.objectStore(table)
        const request = objectStore.get(keyPath)

        request.onerror = function () {
            alert('事务失败')
        }

        request.onsuccess = function () {
            if (request.result) {
                callback(request.result)
            } else {
                callback(null)
            }
        }
    }

    get(table: string, keyPath: string, countTable: string, callback: Function) {
        // 开启事务
        const request = window.database.transaction([table], 'readwrite')
            .objectStore(table).get(keyPath)

        request.onsuccess = (event: any) => {
            if (window.database.objectStoreNames.contains(countTable)) {
                const count = window.database.transaction([countTable], 'readwrite')
                    .objectStore(countTable).count()
                count.onsuccess = () => {
                    callback(event.target.result, count.result)
                }
            } else {
                callback(event.target.result, 0)
            }
        }

        request.onerror = () => {
            console.log('数据获取失败')
        }
    }

    update(table: string, data: any, callback: Function) {
        const start = performance.now();
        const request = window.database.transaction([table], 'readwrite')
            .objectStore(table).put(data)
        request.onsuccess = () => {
            console.log('数据更新成功:' + (performance.now() - start).toFixed(2) + 'ms')
            callback()
        }
    }

    delete(table: string, key: string, callback: Function) {
        if (this.database === undefined) return;

        const request = window.database.transaction([table], 'readwrite')
            .objectStore(table).delete(key);

        request.onsuccess = () => {
            console.log('删除成功')
            callback()
        }
    }

    clear(table: string, callback: Function) {
        if (window.database === undefined) return;

        const request = window.database.transaction([table], 'readwrite')
            .objectStore(table).clear()

        request.onsuccess = () => {
            console.log('清空成功')
            callback()
        }
    }
}