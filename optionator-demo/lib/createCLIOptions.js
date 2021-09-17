const optionator = require("optionator");

function createCLIOptions(){
    return optionator({
        prepend: "optionator-demo [options] [value]",
        options: [
            {
                heading:"Basic configuration"
            },
            {
                option: "help",
                alias: "h",
                type: "Boolean",
                description: "Show help"
            },
            {
                option: "version",
                alias: "v",
                type: "Boolean",
                description: "Output the version number"
            },
            {
                option:'name',
                alias:"n",
                type:'String',
                default:'defaultName',
                description:"please give me a name"
            },
            {
                option:'age',
                type:'number',
                description: 'please give me a age'
            }
        ]
    })
}

module.exports = createCLIOptions;
