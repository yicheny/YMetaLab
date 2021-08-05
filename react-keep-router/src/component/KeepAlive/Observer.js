import utils from "./utils";

class Observer{
    constructor() {
        this.list = new Map();
    }

    add(key,listener){
        if(!utils.isFunction(listener)) return ;
        const listenerList = this._getListeners(key);
        listenerList.push(listener);
        this.list.set(key,listenerList);
    }

    delete(key){
        this.list.delete(key)
    }

    notify(key){
        const listenerList = this.list.get(key);
        if(!Array.isArray(listenerList)) return null;
        listenerList.forEach(f => f());
    }

    _getListeners(key){
        const listenerList = this.list.get(key);
        return Array.isArray(listenerList) ? listenerList : [];
    }
}

const observer = new Observer();

export default observer;
