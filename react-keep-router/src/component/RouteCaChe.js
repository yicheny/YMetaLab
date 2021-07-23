
class RouteCaChe{
    _cache = new Map();

    setCache(key,value){
        this._cache.set(key,value);
    }

    getCache(key){
        this._cache.get(key);
    }

    clearOne(key){
        this._cache.delete(key);
    }

    clearAll(){
        this._cache.clear();
    }
}

const routeCache = new RouteCaChe();
export default routeCache;
