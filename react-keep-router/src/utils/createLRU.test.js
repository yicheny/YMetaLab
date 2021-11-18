const assert = require('chai').assert;
const { LinkedList, LinkedListNode, createLRU } = require('./createLRU');

const LIMIT_MSG = '必须提供limit参数，且必须是大于0的数字！'
const SIZE_OVERFLOW_MSG = 'size值不能超过最大值！'
const NODE_MSG = 'node必须是LinkedListNode类型！'

describe("createLRU相关模块测试", () => {
    describe('LinkedList测试', () => {
        describe('参数limit测试', () => {
            it('limit标准声明', () => {
                assert.instanceOf(new LinkedList(10), LinkedList)
            })
            it('limit必传', () => {
                assert.throw(() => new LinkedList(), LIMIT_MSG)
            })
            it('limit必须是数字', () => {
                assert.throw(() => new LinkedList('1'), LIMIT_MSG)
            })
            it('limit不能是NaN', () => {
                assert.throw(() => new LinkedList(NaN), LIMIT_MSG)
            })
            it('limit必须大于0', () => {
                assert.throw(() => new LinkedList(0), LIMIT_MSG)
                assert.throw(() => new LinkedList(-1), LIMIT_MSG)
            })
        })

        describe('prepend方法测试', () => {
            it("返回值是新生成的节点", () => {
                const list = new LinkedList(100);
                const rNode = list.prepend(null, 'd');
                assert.instanceOf(rNode, LinkedListNode)
                const mNode = new LinkedListNode('d', null, null);
                assert.deepEqual(rNode, mNode)
            })
            it("每次添加新节点，size增加1", () => {
                const list = new LinkedList(100);
                assert.equal(list.size, 0)
                list.prepend(null, null);
                assert.equal(list.size, 1)
                list.prepend(list.head, null);
                assert.equal(list.size, 2)
                list.prepend(list.head, null);
                assert.equal(list.size, 3)
            })
            it('节点数量达到最大值时，添加失败，报错', () => {
                const list = new LinkedList(2);
                list.prepend(list.head, null);
                assert.equal(list.size, 1);
                list.prepend(list.head, null);
                assert.equal(list.size, 2);
                assert.throw(() => list.prepend(list.head, null), SIZE_OVERFLOW_MSG)
                assert.equal(list.size, 2);
            })
            it("参数node检测", () => {
                const list = new LinkedList(100);
                assert.deepEqual(list.prepend(null, 'data'), new LinkedListNode('data', null, null), 'size为0时node可以是任意类型值')
                assert.throw(() => list.prepend(null, 'data'), NODE_MSG)

            })
            it("size为0时，直接设为头节点、尾节点", () => {
                const list = new LinkedList(100);
                list.prepend(null, 'data');

                assert.equal(list.head, list.tail)
                assert.instanceOf(list.head, LinkedListNode)
                const node = new LinkedListNode('data', null, null);
                assert.deepEqual(list.head, node)
            })
            it("附加头节点之前", () => {
                const list = new LinkedList(100);
                const node1 = list.prepend(null, 'd1');
                const node2 = list.prepend(list.head, 'd2');
                assert.equal(node1, list.tail);
                assert.equal(node2, list.head);
                assert.equal(node1.prev, node2)
                assert.equal(node2.next, node1)
            })
            it("附加一般节点（含尾节点）之前", () => {
                const list = new LinkedList(100);
                const node1 = list.prepend(null, 'd1')
                const node2 = list.prepend(list.head, 'd2')
                const node3 = list.prepend(list.head, 'd3')
                assert.equal(list.head, node3);
                assert.equal(list.tail, node1);
                assert.equal(node1.prev, node2);
                assert.equal(node2.prev, node3);
                assert.equal(node3.next, node2);
                assert.equal(node2.next, node1);
            })
        })

        describe('moveToHead方法测试', () => {
            it("参数node必须是节点类型，否则报错", () => {
                const list = new LinkedList(1);
                assert.throw(() => list.moveToHead(null), NODE_MSG)
            })
            it("头节点", () => {
                const list = new LinkedList(1);
                const head = list.prepend(null, 'head')
                list.moveToHead(head);
                assert.equal(head, list.head)
            })
            it("尾节点", () => {
                const list = new LinkedList(3)
                const node1 = list.prepend(null, 'n1');
                const node2 = list.prepend(list.head, 'n2');
                const node3 = list.prepend(list.head, 'n3');
                assert.equal(node1, list.tail)
                assert.equal(node3, list.head)
                list.moveToHead(node1);
                assert.equal(node1, list.head)
                assert.equal(node2, list.tail);
                assert.equal(node1.next, node3)
                assert.equal(node3.next, node2)
                assert.equal(node2.prev, node3)
                assert.equal(node3.prev, node1);
            })
            it("一般节点", () => {
                const list = new LinkedList(3);
                const node1 = list.prepend(null, 'n1');
                const node2 = list.prepend(list.head, 'n2');
                const node3 = list.prepend(list.head, 'n3');
                assert.equal(node1, list.tail)
                assert.equal(node3, list.head)
                list.moveToHead(node2);
                assert.equal(node2, list.head)
                assert.equal(node1, list.tail);
                assert.equal(node2.next, node3)
                assert.equal(node3.next, node1)
                assert.equal(node1.prev, node3)
                assert.equal(node3.prev, node2)
            })
        })

        describe('delete方法测试', () => {
            it("size为0时，删除报错",()=>{
                const limit = new LinkedList(1);
                const node = new LinkedListNode(null,null,null);
                assert.throw(()=>limit.delete(node),"size为0，不能进行删除！")
            })
            it("参数node必须是节点类型，否则报错",()=>{
                const limit = new LinkedList(1);
                assert.throw(()=>limit.delete(null),NODE_MSG)
            })
            it("删除唯一节点",()=>{
                const list = new LinkedList(1);
                const node = list.prepend(list.head,'d')
                list.delete(node)
                assert.isNull(list.head);
                assert.isNull(list.tail);
                assert.equal(list.size,0)
            })
            it("头节点",()=>{
                const list = new LinkedList(2)
                const node1 = list.prepend(list.head,'1')
                list.prepend(list.head,'2')
                list.delete(list.head);
                assert.equal(node1,list.head);
                assert.equal(node1,list.tail);
                assert.equal(list.size,1)
            })
            it("尾节点",()=>{
                const list = new LinkedList(2)
                list.prepend(list.head,'1')
                const node2 = list.prepend(list.head,'2')
                list.delete(list.tail);
                assert.equal(node2,list.head);
                assert.equal(node2,list.tail);
                assert.equal(list.size,1)
            })
            it("一般节点",()=>{
                const list = new LinkedList(3)
                const node1 = list.prepend(list.head,'1')
                const node2 = list.prepend(list.head,'2')
                const node3 = list.prepend(list.head,'3')
                list.delete(node2);
                assert.equal(list.head,node3);
                assert.equal(list.tail,node1);
                assert.equal(list.size,2);
                assert.equal(node1.prev,node3);
                assert.equal(node3.next,node1)
            })
        })
    })

    describe('createLRU测试',()=>{
        it("返回值测试",()=>{
            const lru = createLRU(1);
            assert.isFunction(lru.update)
            assert.instanceOf(lru.cacheLinkedList,LinkedList)
        })

        it("更新数据不存在，未溢出",()=>{
            const lru = createLRU(2);
            const data = {text:'data'}
            const data2 = {text:'data2'}
            lru.update(data);
            lru.update(data2);
            assert.equal(lru.cacheLinkedList.head.data,data2)
            assert.equal(lru.cacheLinkedList.tail.data,data)
        })

        it("更新数据不存在，溢出",()=>{
            const lru = createLRU(1);
            const data = {text:'data'}
            const data2 = {text:'data2'}
            const deleteKey1 = lru.update(data);
            const deleteKey2 = lru.update(data2);
            assert.equal(lru.cacheLinkedList.head.data,data2)
            assert.equal(lru.cacheLinkedList.tail.data,data2)
            assert.isUndefined(deleteKey1);
            assert.equal(deleteKey2,data);
        })

        it("更新数据存在，在将对应节点移至头部",()=>{
            const lru = createLRU(3);
            const data = {text:'data'}
            const data2 = {text:'data2'}
            lru.update(data);
            lru.update(data2);
            lru.update(data);
            assert.equal(lru.cacheLinkedList.head.data,data)
            assert.equal(lru.cacheLinkedList.tail.data,data2)
        })
    })
})
