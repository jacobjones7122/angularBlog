"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
exports.pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DATABASE_URL || 'localhost',
    user: process.env.DATABASE_USER || 'angularblogUser',
    password: process.env.DATABASE_PASSWORD || 'jangularjblog1',
    database: process.env.DATABASE_NAME || 'AngularBlog'
});
function rows(procedureName, args) {
    return callProcedure(procedureName, args)
        .then(function (resultsets) {
        return resultsets[0];
    });
}
exports.rows = rows;
function row(procedureName, args) {
    return callProcedure(procedureName, args)
        .then(function (resultsets) {
        return resultsets[0][0];
    });
}
exports.row = row;
function empty(procedureName, args) {
    return callProcedure(procedureName, args)
        .then(function () {
        return;
    });
}
exports.empty = empty;
function callProcedure(procedureName, args) {
    return new Promise(function (resolve, reject) {
        exports.pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            }
            else {
                var placeholders = '';
                if (args && args.length > 0) {
                    for (var i = 0; i < args.length; i++) {
                        if (i === args.length - 1) {
                            placeholders += '?';
                        }
                        else {
                            placeholders += '?,';
                        }
                    }
                }
                var callString = 'CALL ' + procedureName + '(' + placeholders + ');';
                connection.query(callString, args, function (err, resultsets) {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(resultsets);
                    }
                });
            }
        });
    });
}
