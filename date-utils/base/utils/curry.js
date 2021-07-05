export default function curry(fn){
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
