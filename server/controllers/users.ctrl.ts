import * as express from 'express';
import * as procedures from '../procedures/users.proc';
import * as auth from '../middleware/auth.mw';
import * as passport from 'passport';
import * as session from 'express-session';
import * as utils from '../utils';

let router = express.Router();

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err: any, user: models.Iusers, info: any) => {
        if (err) { 
            console.log(err); return res.sendStatus(500); 
        }
        if (!user) {
            return res.status(401).send(info);
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.sendStatus(500);
            } else {
                return res.send(user);
            }
        });
    }) (req, res, next);
});

// router.all('*', auth.isLoggedIn);

router.post('/', auth.isAdmin, (req, res) => {
    utils.encryptPassword(req.body.password)
    .then((hash) => {
        return procedures.createUser(req.body.firstname, req.body.lastname, req.body.email, hash);
    })
    .then((id: object) => {

        res.status(201).send(id);
    }).catch((err: any) => {
        console.log(err);
        res.sendStatus(500);
    });
})

router.post('/:id', auth.isAdmin, (req, res) => {        
    procedures.updateUser(req.body.id, req.body.firstname, req.body.lastname, req.body.email, req.body.roll)
    .then(function(id: object){
        res.status(201).send(id);
    }).catch(function(err: any){
        console.log(err);
        res.sendStatus(500);
    });
})

router.delete('/:id', auth.isLoggedIn, (req, res) => {    
    procedures.destroyUser(req.params.id)
    .then(function(){
        res.sendStatus(204);
    }).catch(function(err: any){
        console.log(err);
        res.sendStatus(500);
    });
})

router.get('/', auth.isLoggedIn, (req, res) => {
    procedures.all()
    .then((users: object) => {
        res.send(users);
    }).catch((err: any) => {
        console.log(err);
        res.sendStatus(500);
    });
});

router.get('/logout', (req, res) => {
    if(req.session){
        req.session.destroy(() => {
            req.logOut();
            res.sendStatus(204);
        });
    }
});

router.get('/me', function(req, res) {
    res.send(req.user);
});

export default router;