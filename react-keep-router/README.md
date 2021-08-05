[TOC]

# 使用说明
## 无副作用
- 最外层使用`KeepAliveScope`组件【整个应用中只需要包裹一次】
- 需要进行缓存的组件使用`KeepAlive`包括，并提供全局唯一的`cacheKey`

用法示例：
```js
<KeepAliveScope>
    <KeepAlive cacheKey='test'>
        <Test/>
    </KeepAlive>
</KeepAliveScope>
```

## 处理副作用
使用`<KeepAlive>`组件时，销毁`<KeepAlive>`时其子组件并不会被销毁，所以不能按预期执行`mount`、`unmount`时的副作用。

关于`useKeepEffect`，它提供了类似装载和卸载时的副作用执行能力，不过实际上，说是**启用**和**关闭**缓存组件可能更合适一些。

用法示例：
```js
useKeepEffect(()=>{
    console.log(`useKeepEffect，组件装载啦！闭包值为${value}`);
    return () => {
        console.log(`useKeepEffect，组件卸载啦！闭包值为${value}`)
    }
})
```
