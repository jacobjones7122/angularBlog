import * as express from 'express';
import * as procedures from '../procedures/posts.proc';

var router = express.Router();

router.route('/')
    .get(function(req, res){
        procedures.all()
        .then(function(posts: object){
            res.send(posts);
        }).catch(function(err: any){
            console.log(err);
            res.sendStatus(500);
        });
    })
    .post(function(req,res){
        procedures.create(req.body.title, req.body.userId, req.body.categoryId, req.body.content)
        .then(function(id: object){
            res.status(201).send(id);
        }).catch(function(err: any){
            console.log(err);
            res.sendStatus(500);
        });
    });

router.route('/:id')
    .get(function(req, res){
        procedures.read(req.params.id)
        .then(function(posts: object){
            res.send(posts);
        }).catch(function(err:any){
            console.log(err);
            res.sendStatus(500);
        });
    })
    .post(function(req,res){
        console.log('here');
        procedures.update(req.body.id, req.body.title, req.body.categoryId, req.body.content)
        .then(function(id: object){
            res.status(201).send(id);
        }).catch(function(err: any){
            console.log(err);
            res.sendStatus(500);
        });
    })
    .delete(function(req, res){
        procedures.destroy(req.params.id)
        .then(function(){
            res.sendStatus(204);
        }).catch(function(err: any){
            console.log(err);
            res.sendStatus(500);
        });
    })

export default router;