import * as express from 'express';
import * as passport from 'passport';
import * as session from 'express-session';
let MySQLStore = require('express-mysql-session')(session);
import { Strategy as LocalStrategy } from 'passport-local';
import * as userProc from '../procedures/users.proc';
// import * as utils from '../utils';
import { pool } from './db';

export default function confirgurePassport(app: express.Express) {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, (email: string, password: any, done: any) => {   
        userProc.readByEmail(email).then((user) => {
                if (!user) {
                    return done(null, false);
                }
                // return utils.checkPassword(password, user.password)
                // .then((matches) => {
                //     console.log('here under matches');
                //     console.log(matches);
                //     console.log(password);
                //     console.log(user.password);
                //     if (matches) {
                //         delete user.password;
                //         return done(null, user);
                //     } else {
                //         return done(null, false, { message: 'Invalid Login Username/Password' });
                //     }
                // });
                if (user.password !== password) {
                    return done(null, false, {message: 'Nope!'});
                }
                console.log('email and password are good to go.');
                return done(null, user);
            }, (err) => { return done(err); });
            // }).catch((err) => {
            //     return done(err);
            // });
    }));

    passport.serializeUser((user: models.Iusers, done) => {
        done(null, user.id);
    });   

    passport.deserializeUser((id: number, done) => {
        userProc.read(id).then((user) => {
            done(null, user);
        }, (err) => {
            done(err);
        });
    });

    let sessionStore = new MySQLStore({
        createDatabaseTable: true        
    }, pool);

    app.use(session({
        secret: 'random string',
        store: sessionStore,
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session());
}