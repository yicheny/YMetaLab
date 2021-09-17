#!/usr/bin/env node

//必须在其他所有之前执行
if (process.argv.includes("--debug")) {
    require("debug").enable("optionator-demo:*,od:*");
}

const cli = require("../lib/cli");
const log = require("../lib/log");

(function main(){
    cli.execute(process.argv);
    return process.exit();
}()).catch(error => {
    log.error('optionator-demo error：' + error.message)
})
