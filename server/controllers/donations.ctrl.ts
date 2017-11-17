import { Router } from 'express';
import * as stripeSvc from '../services/stripe.svc';
const router = Router();
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

export default router;