const log = require("./log")
const createCLIOptions = require("./createCLIOptions")
const RuntimeInfo = require("./runtime-info")

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
    }
};

module.exports = cli;
