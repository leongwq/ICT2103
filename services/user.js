const crypto = require('crypto');
let userService = {};

const db = require('../connections/mariadb');
const jwt = require('jsonwebtoken');
const passport = require('passport');

userService.addUser = async (req, res) => {
    let conn;
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, 'sha512').toString('hex');

    // Validation 
    // req.checkBody('name', 'Name is required').notEmpty();
    // req.checkBody('email', 'Email is required').notEmpty();

    // const errors = req.validationErrors();

    try {
        conn = await db.getConnection();
        const data = await conn.query("INSERT INTO users (name, email, contact_no, dob, gender, salt, password) value (?,?,?,?,?,?,?)",
            [req.body.name, req.body.email, req.body.contact_no, req.body.dob, req.body.gender, salt, hash]);
        const token = generateJWT(data.insertId, req.body.email, req.body.name);
        res.status(200);
        res.json({
            "token": token
        });
    } catch (err) {
        res.status(409).send(err);
    } finally {
        if (conn) return conn.end();
    }
}

userService.login = async (req, res) => {
    // Hands over control to config/passport.js
    passport.authenticate('local', function (err, user, info) {
        // If Passport throws/catches an error
        if (err) {
            console.log(err);
            res.status(404).json(err);
            return;
        }
        // If a user is found
        if (user) {
            const token = generateJWT(user.id, user.email, user.name);
            res.status(200);
            res.json({
                "token": token
            });
        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res);
}

userService.getUser = async (req, res) => {
    let conn;
    try {
        conn = await db.getConnection();
        const data = await conn.query("SELECT * FROM users WHERE id = (?)", [req.params.id]);
        res.status(200).send(data);
    } catch (err) {
        console.log(err);
    } finally {
        if (conn) return conn.end();
    }
}

const generateJWT = (_id, email, name) => {
    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: _id,
        email: email,
        name: name,
        exp: parseInt(expiry.getTime() / 1000),
    }, process.env.JWT_SECRET);
}

module.exports = userService;