const log = require("./log")
const createCLIOptions = require("./createCLIOptions")
const RuntimeInfo = require("./runtime-info")
const pathEnhance = require("./pathEnhance");
const importFresh = require("import-fresh")

const cli = {
    async execute(args) {
        const CLIOptions = createCLIOptions();
        const options = CLIOptions.parse(args);

        if (options.help) {
            return log.info(CLIOptions.generateHelp());
        }

        if (options.version) {
            return log.info(RuntimeInfo.version())
        }

        if (options.script){
            const filePath = pathEnhance.getAbsoluteFilePath(options.script);
            return log.info(importFresh(filePath)())
        }
    }
};

module.exports = cli;
