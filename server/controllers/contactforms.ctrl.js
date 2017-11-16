"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const email_svc_1 = require("../services/email.svc");
const express_1 = require("express");
const router = express_1.Router();
router.post('/', (req, res) => {
    console.log('In the contactForm.ctrl');
    console.log(req.body);
    email_svc_1.sendEmail('jacobjones7122@gmail.com', req.body.from, req.body.subject, req.body.message)
        .then((response) => {
        res.sendStatus(204);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});
exports.default = router;
