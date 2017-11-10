"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../config/db");
function all() {
    return db.rows('GetCategories', []);
}
exports.all = all;
