#!/usr/bin/env node

const cli = require("../lib/cli");
const log = require("../lib/log");

(function main(){
    cli.execute(process.argv);
    return process.exit();
}()).catch(error => {
    log.error('optionator-demo error：' + error.message)
})
