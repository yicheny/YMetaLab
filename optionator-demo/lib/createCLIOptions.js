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
                option:'script',
                alias: "s",
                type:'String',
                description: 'Execute script according to file path'
            },
            {
                option: "debug",
                type: "Boolean",
                default: false,
                description: "Output debugging information"
            },
        ]
    })
}

module.exports = createCLIOptions;
