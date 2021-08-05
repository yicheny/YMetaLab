
function createUtils(){
    return {
        isNil(x){
            return x === undefined || x === null;
        },
        isFunction(x){
            return typeof x === 'function';
        },
        isString(x){
            return typeof x === 'string';
        },
        isObject(x){
            return getType(x) === 'Object';
        },
        getMountKey(k){
            return `${k}_mount`;
        },
        getUmountKey(k){
            return `${k}_unmount`;
        },
        clone(x){
            return {...x};
        },
        //TODO 待实现
        get(){

        }
    }

    function getType(value) {
        let dataType = Object.prototype.toString.call(value);
        dataType = dataType.slice(8, dataType.length - 1);
        return dataType;
    }
}

const utils = createUtils();
export default utils;
