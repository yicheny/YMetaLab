function createLRU(limit=100) {
    const _cacheMap = new Map();
    const _cacheLinkedList = new LinkedList(limit);

    /*
    * update 更新缓存数据
    * @param {any} data 数据
    * @returns {void} 无返回值
    * */
    function update(data) {
        const node = _cacheMap.get(data);
        if (node) return _cacheLinkedList.moveToHead(node);
        _cacheMap.set(data, _cacheLinkedList.prepend(_cacheLinkedList.head, data));
        if (_cacheMap.size <= limit) return;
        _cacheMap.delete(_cacheLinkedList.tail.data);
        _cacheLinkedList.delete(_cacheLinkedList.tail)
    }

    return {
        update
    }
}

export class LinkedList {
    constructor(limit) {
        this._limit = limit;
        this._head = null;
        this._tail = null;
        this._size = new Size(limit);
    }

    update(){

    }

    append() {
    }

    /*
    * prepend 在指定节点前添加新节点（数据存放在新节点上）
    * @param {LinkedListNode} node 指定节点
    * @param {any} data 节点数据
    * @returns {LinkedListNode} 生成的新节点
    * */
    prepend(node, data) {
        let newNode;
        if (this.size === 0) {
            newNode = new LinkedListNode(data, null, null);
            this._setHead(newNode);
            this._setTail(newNode)
        } else {
            newNode = new LinkedListNode(data, node.prev, node);
            node.setPrev(newNode)
            if(node === this.head) this._setHead(newNode);
        }
        this._size.increase();
        return newNode;
    }

    moveToHead(node) {
        if (node === this.tail) this._setTail(node.prev);
        node.setPrev(null)
        node.setNext(this.head)
        this.head.setPrev(node);
        this._setHead(node);
    }

    _deleteTail(){
        this.tail.prev.setNext(null);
        this._setTail(this.tail.prev);
        this._size.decrease();
    }

    _deleteHead(){
        this.head.next.setPrev(null);
        this._setHead(this.head.next);
        this._size.decrease();
    }

    _deleteNormalNode(node){
        node.prev.setNext(node.next);
        node.next.setPrev(node.prev);
        this._size.decrease();
    }

    delete(node) {
        if(node === this.tail) return this._deleteTail();
        if(node === this.head) return this._deleteHead();
        this._deleteNormalNode(node);
    }

    get size(){
        return this._size.value;
    }

    get head() {
        return this._head;
    }

    get tail() {
        return this._tail;
    }

    _setHead(node){
        this._head = node;
    }

    _setTail(node){
        this._tail = node;
    }
}

export class LinkedListNode {
    constructor(data, prev, next) {
        this._data = data;
        this._prev = prev;
        this._next = next;
    }

    get data() {
        return this._data
    }

    get prev() {
        return this._prev
    }

    get next() {
        return this._next
    }

    setData(data) {
        this._data = data;
    }

    setPrev(node) {
        this._prev = node;
    }

    setNext(node) {
        this._next = node;
    }
}

class Size{
    constructor(limit) {
        checkLimit(limit)
        this._maxValue = limit;
        this._value = 0;
    }

    get value(){
        return this._value;
    }

    setValue(value){
        this._value = value;
    }

    increase(){
        if(this._value >= this._maxValue) throw new Error("size值不能超过最大值！")
        this._value += 1;
    }

    decrease(){
        if(this._value <= 0) throw new Error("size值不能小于0！")
        this._value -= 1;
    }
}

function isNumber(v){
    return typeof v === 'number' && !isNaN(v)
}

function checkLimit(limit){
    if(!(isNumber(limit) && limit > 0)) throw new Error('必须提供limit参数，且必须是大于0的数字！')
}
