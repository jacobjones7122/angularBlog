"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const procedures = require("../procedures/posts.proc");
var router = express.Router();
router.route('/')
    .get(function (req, res) {
    procedures.all()
        .then(function (posts) {
        res.send(posts);
    }).catch(function (err) {
        console.log(err);
        res.sendStatus(500);
    });
})
    .post(function (req, res) {
    procedures.create(req.body.title, req.body.userId, req.body.categoryId, req.body.content)
        .then(function (id) {
        res.status(201).send(id);
    }).catch(function (err) {
        console.log(err);
        res.sendStatus(500);
    });
});
router.route('/:id')
    .get(function (req, res) {
    procedures.read(req.params.id)
        .then(function (posts) {
        res.send(posts);
    }).catch(function (err) {
        console.log(err);
        res.sendStatus(500);
    });
})
    .post(function (req, res) {
    procedures.update(req.body.id, req.body.title, req.body.categoryId, req.body.content)
        .then(function (id) {
        res.status(201).send(id);
    }).catch(function (err) {
        console.log(err);
        res.sendStatus(500);
    });
})
    .delete(function (req, res) {
    procedures.destroy(req.params.id)
        .then(function () {
        res.sendStatus(204);
    }).catch(function (err) {
        console.log(err);
        res.sendStatus(500);
    });
});
exports.default = router;
