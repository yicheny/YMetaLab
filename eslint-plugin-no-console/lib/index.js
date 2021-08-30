/**
 * @fileoverview clear console
 * @author ylvfeng
 */
"use strict";

module.exports = {
    rules: {
        'no-console-log': require('./rules/no-console-log'),
    },
    configs: {
        recommended: {
            rules: {
                'no-console/no-console-log': 2, // 可以省略 eslint-plugin 前缀
            },
        },
    },
};


