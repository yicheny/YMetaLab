const assert = require('chai').assert;
const { LinkedList, LinkedListNode } = require('./createLRU');

const LIMIT_MSG = '必须提供limit参数，且必须是大于0的数字！'
const SIZE_OVERFLOW_MSG = 'size值不能超过最大值！'

describe("createLRU模块测试", () => {
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
            it("返回值是新生成的节点",()=>{
                const list = new LinkedList(100);
                const rNode = list.prepend(null,'d');
                assert.instanceOf(rNode,LinkedListNode)
                const mNode = new LinkedListNode('d',null,null);
                assert.deepEqual(rNode,mNode)
            })
            it("每次添加新节点，size增加1",()=>{
                const list = new LinkedList(100);
                assert.equal(list.size,0)
                list.prepend(null,null);
                assert.equal(list.size,1)
                list.prepend(list.head,null);
                assert.equal(list.size,2)
                list.prepend(list.head,null);
                assert.equal(list.size,3)
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
                const node1 = list.prepend(null,'d1');
                const node2 = list.prepend(list.head,'d2');
                assert.equal(node1,list.tail);
                assert.equal(node2,list.head);
                assert.equal(node1.prev,node2)
                assert.equal(node2.next,node1)
            })
            it("附加一般节点（含尾节点）之前",()=>{
                const list = new LinkedList(100);
                const node1 = list.append(null,'d1')
                const node2 = list.append(null,'d2')
                const node3 = list.append(null,'d3')
            })
        })
    })
})
