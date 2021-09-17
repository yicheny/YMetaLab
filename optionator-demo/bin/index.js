#!/usr/bin/env node

const cli = require("../lib/cli");

(function main(){
    return cli.execute(process.argv)
}()).catch(error => {
    console.log('optionator-demo error：' + error.message)
})
