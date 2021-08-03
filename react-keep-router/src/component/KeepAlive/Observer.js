import utils from "./utils";

class Observer{
    constructor() {
        this.list = new Map();
    }

    //TODO:同一个key会有注册多个事件的可能吗？
    add(key,callback){
        this.list.set(key,callback);
    }

    delete(key){
        this.list.delete(key)
    }

    notify(key){
        const callback = this.list.get(key);
        if(utils.isFunction(callback)) callback();
    }
}

const observer = new Observer();

export default observer;
