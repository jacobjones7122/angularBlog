import { sendEmail } from '../services/email.svc';
import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {
    console.log('In the contactForm.ctrl');
    console.log(req.body);
    sendEmail('jacobjones7122@gmail.com', req.body.from, req.body.subject, req.body.message)
    .then((response) => {
        res.sendStatus(204);
    }).catch((error) => {
        res.sendStatus(500);   
    })
})

export default router;