function getTimeMap(date) {
    return {
        Y: date.getFullYear(),
        M: add0(date.getMonth() + 1),
        D: add0(date.getDate()),
        H: add0(date.getHours()),
        m: add0(date.getMinutes()),
        s: add0(date.getSeconds()),
        // w : add0(d.getDay()),//0~6 周一~周六
        // W : getWeekNum(),//当前年份第x周
    };
}

function dateFormat(fmt, date) {
    const timeMap = getTimeMap(date);
    let result = '';

    for (let i = 0; i < fmt.length; i++) {
        const char = fmt.charAt(i)
        result += timeMap[char] || char;
    }

    return result
}

function add0(v) {
    return v > 9 ? v : `0${v}`
}

console.log(dateFormat('Y-M-D H:m:s', new Date()));
console.log(dateFormat('Y/M/D H:m:s', new Date()));
console.log(dateFormat('H:m:s', new Date()));
console.log(dateFormat('YMDTHmsS', new Date()));

// export default curry(dateFormat);

function checkFmt(fmt) {
    return typeof fmt === 'string';
}

function curry(fn) {
    if (!isFunction(fn)) throw new Error("curry报错：参数必须是一个函数！");
    const formalCount = fn.length;
    const argumentsList = [];

    return function (...args) {
        argumentsList.push(...args);
        //返回当前正在执行的函数的引用，就是这个匿名函数
        if (argumentsList.length < formalCount) return argumentsList.callee;
        return fn.apply("", argumentsList);
    }
}

function isFunction(f) {
    return typeof f === 'function';
}

function isDate(d) {
    return d instanceof Date;
}

function add0(v) {
    return v > 9 ? v : `0${v}`;
}

function getWeekNum() {

}
