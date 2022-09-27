import { Router } from 'express';
import { fileURLToPath } from 'url';

import path from 'path';
import passport from 'passport';
import {v4 as uuid} from 'uuid';
import LocalStrategy from 'passport-local';
import bCrypt from 'bcrypt';
import { User } from '../../models/index.js';
import { sendMail } from '../../utils/mail.js';
import config from '../../config.js';


const __dirname = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../views/');
const authWebRouter = new Router();

passport.use('login', new LocalStrategy(
    (username, password, done) => {
        User.findOne({ username }, (err, user) => {
            if (err)
                return done(err);
            if (!user) {
                return done(null, false);
            }
            if (!isValidPassword(user, password)) {
                return done(null, false);
            }
  
            return done(null, user);
        });
    }
));
  
passport.use('signup', new LocalStrategy({
    passReqToCallback: true
}, (req, username, password, done) => {
    User.findOne({ 'username': username }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (user) {
            return done(null, false);
        }
  
        const newUser = {
            _id: uuid(),
            email: username,
            password: createHash(password),
            nombre: req.body.nombre,
            direccion: req.body.direccion,
            telefono: req.body.telefono
        };
  
        User.create(newUser, async (err, userWithId) => {
            if (err) {
                return done(err);
            }
            
            await sendMail(config.mailAdmin, JSON.stringify(newUser));

            return done(null, userWithId);
        });
    });
}));
  
passport.serializeUser((user, done) => {
    done(null, user._id);
});
  
passport.deserializeUser((id, done) => {
    User.findById(id, done);
});
  
function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
}
  
function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

authWebRouter.get('/', (req, res) => {
    res.redirect('/login');
});

authWebRouter.get('/login', (req, res) => {
    if(req.isAuthenticated()){
        req.session.nombre = req.username;
        return res.redirect('/home');
    }
    res.sendFile('login.html', { root: __dirname});
});

authWebRouter.get('/logout', (req, res) => {
    const nombre = req.session.nombre;
    req.session.destroy(err => {
        if (err) {
            res.json({ status: 'Logout error', body: err });
        } else {
            res.render('pages/logout', { nombre: nombre });
        }
    });
});

authWebRouter.post('/login', passport.authenticate('login', {failureRedirect: '/faillogin'}) ,(req, res) => {
    const { username } = req.body;
    if(!username){
        return res.redirect('/login');
    }
    req.session.nombre = username;
    return res.redirect('/home');
});

authWebRouter.get('/register', (req,res) => {
    res.sendFile('register.html', { root: __dirname });
});

authWebRouter.post('/register',  passport.authenticate('signup', {failureRedirect: '/failsignup'}) ,(req,res) => {
    const { username } = req.body;
    req.session.nombre = username;

    console.log(`Entre en el register req => ${req} | res => ${res}`);

    res.redirect('/home');
});

authWebRouter.get('/faillogin', (req, res) => {
    res.sendFile('login-error.html', { root: __dirname });
});

authWebRouter.get('/failsignup', (req, res) => {
    res.sendFile('register-error.html', { root: __dirname });
});


export default authWebRouter;