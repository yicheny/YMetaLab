const debug = require('debug');
const { assert } = require("chai");

describe('debug',() => {
    it('基础健全性测试', () => {
        const log = debug('test');
        log.enabled = true;
        log.log = () => {};
        assert.doesNotThrow(() => log('hello world!'))
    })

    it('允许命名空间是非字符串值', () => {
        assert.doesNotThrow(() => debug.enable(null));
    })

    it('在全局启用命名空间', () => {
        assert.deepStrictEqual(debug('test:123').enabled, false);
        assert.deepStrictEqual(debug('test:12345').enabled, false);

        debug.enable('test:123');
        assert.deepStrictEqual(debug('test:123').enabled, true);
        assert.deepStrictEqual(debug('test:12345').enabled, false);
    });

    it('使用自定义日志功能', () => {
        const log = debug('test');
        log.enabled = true;

        const messages = [];
        log.log = (...args) => messages.push(args);

        log('using custom log function');
        log('using custom log function again');
        log('%O', 12345);

        assert.deepStrictEqual(messages.length, 3);
    });

    describe('扩展命名空间', () => {
        it('扩展命名空间', () => {
            const log = debug('foo');
            log.enabled = true;
            log.log = () => {};

            const logBar = log.extend('bar');
            assert.deepStrictEqual(logBar.namespace, 'foo:bar');
        });

        it('使用自定义分隔符扩展命名空间', () => {
            const log = debug('foo');
            log.enabled = true;
            log.log = () => {};

            const logBar = log.extend('bar', '--');
            assert.deepStrictEqual(logBar.namespace, 'foo--bar');
        });

        it('使用空分隔符扩展命名空间', () => {
            const log = debug('foo');
            log.enabled = true;
            log.log = () => {};

            const logBar = log.extend('bar', '');
            assert.deepStrictEqual(logBar.namespace, 'foobar');
        });

        it('保持扩展之间的日志功能', () => {
            const log = debug('foo');
            log.enabled = true;
            log.log = () => {};

            const logBar = log.extend('bar');
            logBar.enabled = true;
            assert.deepStrictEqual(log.log, logBar.log);
        });
    });

    describe('重建命名空间字符串（禁用）', () => {
        it('处理名称、跳过和通配符', () => {
            debug.enable('test,abc*,-abc');
            const namespaces = debug.disable();
            assert.deepStrictEqual(namespaces, 'test,abc*,-abc');
        });

        it('处理空', () => {
            debug.enable('');
            const namespaces = debug.disable();
            assert.deepStrictEqual(namespaces, '');
            assert.deepStrictEqual(debug.names, []);
            assert.deepStrictEqual(debug.skips, []);
        });

        it('处理所有', () => {
            debug.enable('*');
            const namespaces = debug.disable();
            assert.deepStrictEqual(namespaces, '*');
        });

        it('跳过所有处理', () => {
            debug.enable('-*');
            const namespaces = debug.disable();
            assert.deepStrictEqual(namespaces, '-*');
        });

        it('名称+跳过与新字符串相同的内容', () => {
            debug.enable('test,abc*,-abc');
            const oldNames = [...debug.names];
            const oldSkips = [...debug.skips];
            const namespaces = debug.disable();//禁用所有之后，names和skips都变成[]
            assert.deepStrictEqual(namespaces, 'test,abc*,-abc');
            debug.enable(namespaces);//启用之后，names、skips又被生成出来了，注：生成的是正则匹配
            assert.deepStrictEqual(oldNames.map(String), debug.names.map(String));
            assert.deepStrictEqual(oldSkips.map(String), debug.skips.map(String));
        });

        it('处理重新启用的现有实例', () => {
            debug.disable('*');
            const inst = debug('foo');
            const messages = [];
            inst.log = msg => messages.push(msg.replace(/^[^@]*@([^@]+)@.*$/, '$1'));

            inst('@test@');
            assert.deepStrictEqual(messages, []);
            debug.enable('foo');
            assert.deepStrictEqual(messages, []);
            inst('@test2@');
            assert.deepStrictEqual(messages, ['test2']);
            inst('@test3@');
            assert.deepStrictEqual(messages, ['test2', 'test3']);
            debug.disable('*');
            inst('@test4@');

            assert.deepStrictEqual(messages, ['test2', 'test3']);
        });
    });
})
