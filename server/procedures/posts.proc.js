"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../config/db");
function all() {
    return db.rows('GetBlogs', []);
}
exports.all = all;
function read(id) {
    return db.row('GetSinglePost', [id]);
}
exports.read = read;
function update(id, title, categoryid, content) {
    console.log(id, title, categoryid, content);
    return db.rows('UpdatePost', [id, title, categoryid, content]);
}
exports.update = update;
function create(title, userid, categoryid, content) {
    return db.rows('InsertPost', [title, userid, categoryid, content]);
}
exports.create = create;
function destroy(id) {
    return db.empty('DeletePost', [id]);
}
exports.destroy = destroy;
