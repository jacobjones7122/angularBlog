"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 12;
function encryptPassword(pw) {
    console.log(pw);
    console.log(bcrypt.hash(pw, SALT_ROUNDS));
    return bcrypt.hash(pw, SALT_ROUNDS);
}
exports.encryptPassword = encryptPassword;
function checkPassword(pw, hash) {
    console.log('This is the hash' + hash);
    console.log('This is the pw' + pw);
    console.log(bcrypt.compare(pw, hash));
    return bcrypt.compare(pw, hash);
}
exports.checkPassword = checkPassword;
