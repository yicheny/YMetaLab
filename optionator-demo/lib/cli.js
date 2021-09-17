const log = require("./log")
const createCLIOptions = require("./createCLIOptions")
const RuntimeInfo = require("./runtime-info")
const pathEnhance = require("./pathEnhance");
const importFresh = require("import-fresh")

const debug = require('debug')("od:cli")

const cli = {
    async execute(args) {
        const CLIOptions = createCLIOptions();
        const options = CLIOptions.parse(args);
        debug('options', options)

        if (options.help) {
            return log.info(CLIOptions.generateHelp());
        }

        if (options.version) {
            return log.info(RuntimeInfo.version())
        }

        if (options.script){
            const filePath = pathEnhance.getAbsoluteFilePath(options.script);
            debug('options.script filePath',filePath)
            return log.info(importFresh(filePath)())
        }
    }
};

module.exports = cli;
