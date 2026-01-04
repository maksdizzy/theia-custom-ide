module.exports = function (jsModule) {
    switch (jsModule) {
        case 'drivelist': return require('/project/workspace/node_modules/drivelist/build/Release/drivelist.node');
    }
    throw new Error(`unhandled module: "${jsModule}"`);
}