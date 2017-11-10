"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
let clientPath = path.join(__dirname, '../../client');
function stateRouting(req, res, next) {
    if (isAsset(req.url)) {
        return next();
    }
    else {
        res.sendFile(path.join(clientPath, 'index.html'));
    }
}
exports.stateRouting = stateRouting;
function isAsset(path) {
    let pieces = path.split('/');
    if (pieces.length === 0) {
        return false;
    }
    let last = pieces[pieces.length - 1];
    if (path.indexOf('/api') !== -1 || path.indexOf('/?') !== -1) {
        return true;
    }
    else if (last.indexOf('.') !== -1) {
        return true;
    }
    else {
        return false;
    }
}
