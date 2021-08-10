# y-markdown效果展示

## 1. 表格
标题1 | 标题2 | 标题3 | 标题4
---|---|---|---
内容1 | 内容2 | 内容3 | 内容4
内容1 | 内容2 | 内容3 | 内容4
内容1 | 内容2 | 内容3 | 内容4
内容1 | 内容2 | 内容3 | 内容4
内容1 | 内容2 | 内容3 | 内容4
内容1 | 内容2 | 内容3 | 内容4


### 2. 代码块
```js
const a = 1;
const b = 2;
console.log(a + b);
```

### 3. 备注信息
> 这里是备注信息

### 4. 代码行
`const a = 1`

### 5. 文字强调
**强调**

### 6. 链接
[github](https://github.com/yicheny/y-markdown)

### 7. 列表
TS支持的基础类型有：
1. `boolean`
2. `number`
3. `string`
4. 数组有两种定义方式
    1. `number[]`
    2. `Array<number>`
5. 元组，元组允许表示一个已知元素数量和类型的数组，各元素的类型不必相同，例：`let x:[string,number]`，关于元组之后会详细介绍
6. 枚举`enum`，不是很理解，待补充
7. `any`，任意类型
8. `void`，只能赋值为`undefined`和`null`
9. `null`
10. `undefined`
11. `never` 不是很理解，待补充
12. `Object` 非原始类型，除`number`、`string`、`symbol`、`null`和`undefined`之外的类型
