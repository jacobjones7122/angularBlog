"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const procedures = require("../procedures/users.proc");
const auth = require("../middleware/auth.mw");
const passport = require("passport");
const utils = require("../utils");
let router = express.Router();
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        if (!user) {
            return res.status(401).send(info);
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.sendStatus(500);
            }
            else {
                return res.send(user);
            }
        });
    })(req, res, next);
});
router.all('*', auth.isLoggedIn);
router.post('/', (req, res) => {
    console.log('here');
    console.log(req.body);
    utils.encryptPassword(req.body.password)
        .then((hash) => {
        return procedures.createUser(req.body.firstname, req.body.lastname, req.body.email, req.body.password);
    })
        .then(function (id) {
        res.status(201).send(id);
    }).catch(function (err) {
        console.log(err);
        res.sendStatus(500);
    });
});
router.post('/:id', auth.isLoggedIn, (req, res) => {
    procedures.updateUser(req.body.id, req.body.firstname, req.body.lastname, req.body.email)
        .then(function (id) {
        res.status(201).send(id);
    }).catch(function (err) {
        console.log(err);
        res.sendStatus(500);
    });
});
router.delete('/:id', auth.isLoggedIn, (req, res) => {
    procedures.destroyUser(req.params.id)
        .then(function () {
        res.sendStatus(204);
    }).catch(function (err) {
        console.log(err);
        res.sendStatus(500);
    });
});
router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(() => {
            req.logOut();
            res.sendStatus(204);
        });
    }
});
router.get('/me', function (req, res) {
    res.send(req.user);
});
router.get('/', (req, res) => {
    procedures.all()
        .then((users) => {
        res.send(users);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});
exports.default = router;
