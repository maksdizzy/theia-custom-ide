const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const configs = require('./gen-webpack.config.js');
const nodeConfig = require('./gen-webpack.node.config.js');

// Add copy plugin and progress plugin to the first config
configs[0].plugins.push(
    new CopyWebpackPlugin({
        patterns: [
            {
                from: path.resolve(__dirname, './resources'),
                to: path.resolve(__dirname, './lib/frontend/resources'),
            },
        ],
    }),
    new webpack.ProgressPlugin((percentage, message, ...args) => {
        const cleanMessage = `${ (percentage * 100).toFixed(1) }% ${ message } ${ args.join(' ') }`.trim();

        console.warn(cleanMessage);
    })
);

module.exports = [
    ...configs,
    nodeConfig.config,
];
