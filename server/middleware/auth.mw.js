"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isLoggedIn(req, res, next) {
    if (req.user) {
        next();
    }
    else {
        res.sendStatus(401);
    }
}
exports.isLoggedIn = isLoggedIn;
function isAdmin(req, res, next) {
    if (req.user.roll === 'admin') {
        next();
    }
    else {
        res.sendStatus(403);
    }
}
exports.isAdmin = isAdmin;
//RowDataPacket.roll 
