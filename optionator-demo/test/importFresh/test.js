const importFresh = require('import-fresh');
const { assert } = require("chai");

describe('importFresh',()=>{
    it("原生require测试",()=>{
        assert.strictEqual(1,require('./fixtures/foo')())
        assert.strictEqual(2,require('./fixtures/foo')())
        assert.strictEqual(3,require('./fixtures/foo')())
    })

    it("importFresh测试",()=>{
        assert.strictEqual(1,importFresh('./fixtures/foo')())
        assert.strictEqual(1,importFresh('./fixtures/foo')())
        assert.strictEqual(1,importFresh('./fixtures/foo')())
    })
})
