function dateFormat(fmt,d){
    if(!isDate(d)) return null;
    if(!checkFmt(fmt)) return null;

    const parseDate = {
        Y : d.getFullYear(),
        M : add0(d.getMonth() + 1),
        D : add0(d.getDate()),
        H : add0(d.getHours()),
        m : add0(d.getMinutes()),
        s : add0(d.getSeconds()),
        // w : add0(d.getDay()),//0~6 周一~周六
        // W : getWeekNum(),//当前年份第x周，需要自实现
    }

    let result = '';
    let c = null;

    for(let i=0;i < fmt.length;i++){
        switch (c = fmt.charAt(i) ){
            case "Y": case "M": case "D": case "H": case"m": case"s":
                result = result.concat(parseDate[c]);
                break;
            default:
                result = result.concat(c);
                break;
        }
    }

    return result;
}

console.log(dateFormat('Y-M-D H:m:s',new Date()));
console.log(dateFormat('Y/M/D H:m:s',new Date()));
console.log(dateFormat('H:m:s',new Date()));
console.log(dateFormat('YMDTHmsS',new Date()));

// export default curry(dateFormat);

function checkFmt(fmt){
    return typeof fmt === 'string';
}

function curry(fn){
    if(!isFunction(fn)) throw new Error("curry报错：参数必须是一个函数！");
    const formalCount = fn.length;
    const argumentsList = [];

    return function (...args){
        argumentsList.push(...args);
        //返回当前正在执行的函数的引用，就是这个匿名函数
        if(argumentsList.length < formalCount) return argumentsList.callee;
        return fn.apply("",argumentsList);
    }
}

function isFunction(f){
    return typeof f === 'function';
}

function isDate(d){
    return d instanceof Date;
}

function add0(v){
    return v>9 ? v : `0${v}`;
}

function getWeekNum(){

}
