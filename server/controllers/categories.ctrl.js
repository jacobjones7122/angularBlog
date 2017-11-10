"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const procedures = require("../procedures/categories.proc");
let router = express.Router();
router.route('/')
    .get(function (req, res) {
    procedures.all()
        .then(function (categories) {
        res.send(categories);
    }).catch(function (err) {
        console.log(err);
        res.sendStatus(500);
    });
});
exports.default = router;
