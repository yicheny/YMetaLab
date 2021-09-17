const packageJson = require("../package.json");

function version() {
    return `v${packageJson.version}`;
}

module.exports = {
    version
}
