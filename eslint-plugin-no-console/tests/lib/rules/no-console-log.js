/**
 * @fileoverview clear console.log()
 * @author ylvfeng
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-console-log"),
    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("no-console-log", rule, {
    valid: [
        // give me some code that won't trigger a warning
    ],

    invalid: [
        {
            code: "console.log('test');",
            errors: [
                {
                    message: "console method '{{log}}' is forbidden.",
                    type: "MemberExpression"
                }
            ],
        },
    ],
});
