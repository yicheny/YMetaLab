/**
 * @fileoverview clear console.log()
 * @author ylvfeng
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'suggestion', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "clear console.log()",
      category: "Fill me in",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
    messages: {
      avoidMethod: "console method '{{log}}' is forbidden.",
    },
  },

  create(context) {
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      // visitor functions for different types of nodes
      // 键名为ast中选择器名
      'CallExpression MemberExpression': (node) => {
        // 如果在ast中满足以下条件，就用 context.report() 进行对外警告⚠️
        if (node.property.name === 'log' && node.object.name === 'console') {
          context.report({
            node,
            messageId: 'avoidMethod',
            data: {
              name: 'time',
            },
          });
        }
      },
    };
  },
};
