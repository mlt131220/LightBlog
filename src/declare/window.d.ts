declare interface Window {
    mozIndexedDB:any,
    webkitIndexedDB:any,
    msIndexedDB:any,
    database:any
}

declare interface Event {
    pointerType:string,
    button:number,
    clientX:number,
    clientY:number,
    deltaY:number,
    touches:Array<any>,
}