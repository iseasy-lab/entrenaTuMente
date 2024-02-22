const db = require('./db');
const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;
const moment = require('moment');

module.exports = function (passport) {
    passport.use(
        new localStrategy((usuario, password, done) => {
            const query = "SELECT * FROM bdd_ludotest.educador where usuario = ?";
            db.query(query, [usuario], (err, result) => {
                if (err) throw err;
                if (result.length === 0) {
                    return done(null, false);
                }
                /*bcrypt.compare(password, result[0].user_pasword, (err, response) => {
                    if (err) throw err;
                    if (response === true) {
                        const loginDate = moment().format('DD-MM-YYYY')
                        const loginTime = moment().format('HH:mm:ss');
                        console.log(`Inicio de sesión exitoso el ${loginDate} a las ${loginTime}`);
                        return done(null, result[0]);
                    } else {
                        return done(null, false);
                    }
                })*/
                if (password === result[0].user_password) {
                    const loginDate = moment().format('DD-MM-YYYY')
                    const loginTime = moment().format('HH:mm:ss');
                    console.log(`Inicio de sesión exitoso el ${loginDate} a las ${loginTime}`);
                    return done(null, result[0]);
                } else {
                    return done(null, false);
                }
            });

            passport.serializeUser((user, done) => {
                done(null, user.id_educador);
            });


            passport.deserializeUser((id, done) => {
                const query = "SELECT * FROM bdd_ludotest.educador where id_educador = ?";
                db.query(query, [id], (err, result) => {
                    if (err) throw err;
                    const userInfo = {
                        id: result[0].id_educador,
                        username: result[0].usuario,
                        name: result[0].nombre,
                    }
                    done(null, userInfo);
                })
            });
        })
    )
}