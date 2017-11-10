"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const session = require("express-session");
let MySQLStore = require('express-mysql-session')(session);
const passport_local_1 = require("passport-local");
const userProc = require("../procedures/users.proc");
const utils = require("../utils");
const db_1 = require("./db");
function confirgurePassport(app) {
    passport.use(new passport_local_1.Strategy({
        usernameField: 'email',
        passwordField: 'password'
    }, (email, password, done) => {
        userProc.readByEmail(email).then((user) => {
            if (!user) {
                return done(null, false);
            }
            return utils.checkPassword(password, user.password)
                .then((matches) => {
                console.log('here under matches');
                console.log(matches);
                console.log(password);
                console.log(user.password);
                if (matches) {
                    delete user.password;
                    return done(null, user);
                }
                else {
                    return done(null, false, { message: 'Invalid Login Username/Password' });
                }
            });
            // if (user.password !== password) {
            //     return done(null, false, {message: 'Nope!'});
            // }
            // console.log('email and password are good to go.');
            // return done(null, user);
            // }, (err) => { return done(err); });
        }).catch((err) => {
            return done(err);
        });
    }));
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        userProc.read(id).then((user) => {
            done(null, user);
        }, (err) => {
            done(err);
        });
    });
    let sessionStore = new MySQLStore({
        createDatabaseTable: true
    }, db_1.pool);
    app.use(session({
        secret: 'random string',
        store: sessionStore,
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
}
exports.default = confirgurePassport;
