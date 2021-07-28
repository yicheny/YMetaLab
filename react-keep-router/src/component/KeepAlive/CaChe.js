class Cache{
    _value = new Map();

    setValue(key,value){
        this._value.set(key,value);
    }

    getValue(key){
        return this._value.get(key);
    }

    clearOne(key){
        this._value.delete(key);
    }

    clearAll(){
        this._value.clear();
    }

    toValuesArray(){
        return Array.from(this._value.values());
    }
}

function createCache(...params){
    return new Cache(...params)
}

export default createCache;
