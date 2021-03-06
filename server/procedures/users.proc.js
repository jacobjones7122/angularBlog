"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const db = require("../config/db");
function all() {
    return db.rows('GetUsers', []);
}
exports.all = all;
function readByEmail(email) {
    return db_1.row('GetUserByEmail', [email]);
}
exports.readByEmail = readByEmail;
function read(id) {
    return db_1.row('GetUser', [id]);
}
exports.read = read;
function createUser(firstname, lastname, email, password) {
    console.log('create user in the proc');
    return db_1.rows('InsertUser', [firstname, lastname, email, password]);
}
exports.createUser = createUser;
function updateUser(id, firstname, lastname, email, roll) {
    return db.rows('UpdateUser', [id, firstname, lastname, email, roll]);
}
exports.updateUser = updateUser;
function destroyUser(id) {
    return db.empty('DeleteUser', [id]);
}
exports.destroyUser = destroyUser;
