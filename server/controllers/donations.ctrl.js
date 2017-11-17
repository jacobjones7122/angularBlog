"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stripeSvc = require("../services/stripe.svc");
const router = express_1.Router();
router.post('/', (req, res) => {
    let amount = Number(req.body.amount);
    //console.log(amount);
    console.log(req.body.token.id);
    stripeSvc.charge(req.body.token.id, amount)
        .then((success) => {
        res.sendStatus(204);
    }, (err) => {
        console.log(err);
        res.sendStatus(500);
    });
});
exports.default = router;
