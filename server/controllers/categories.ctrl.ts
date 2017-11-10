import * as express from 'express';
import * as procedures from '../procedures/categories.proc';

let router = express.Router();

router.route('/')
    .get(function(req, res){
        procedures.all()
        .then(function(categories: object){
            res.send(categories);
        }).catch(function(err: any){
            console.log(err);
            res.sendStatus(500);
        });
    });

export default router;