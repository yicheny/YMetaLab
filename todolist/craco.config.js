const webpack = require('webpack');
const path = require('path')

module.exports = {
    reactScriptsVersion: "react-scripts",
    webpack: {
        plugins: [
            new webpack.DllReferencePlugin({
                manifest: path.resolve(__dirname, 'dist/dll', 'mainfist.json')
            }),
        ]
    }
};
