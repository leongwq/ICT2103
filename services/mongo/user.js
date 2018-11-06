const crypto = require('crypto');
let userService = {};

const MongoDB = require('../../connections/mongodb')
const jwt = require('jsonwebtoken');
const passport = require('passport');

userService.addUser = async (req, res) => {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, 'sha512').toString('hex');

    try {
        const collection = MongoDB.db.collection('users');
        const data = await collection.insertOne({'name': req.body.name, 'email': req.body.email, 'contact_no': req.body.contact_no,
        'dob':req.body.dob, 'gender': req.body.gender, 'salt': salt, 'password': hash});
        const token = generateJWT(data.insertedId, req.body.email, req.body.name);
        res.status(200);
        res.json({
            "token": token
        });
    } catch (err) {
        res.status(409).send(err);
    }
}

userService.login = async (req, res) => {
    // Hands over control to config/passport_mongo.js
    passport.authenticate('mongo', function (err, user, info) {
        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }
        // If a user is found
        if (user) {
            const token = generateJWT(user._id, user.email, user.name);
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
    try {
        const collection = MongoDB.db.collection('users');
        const data = await collection.findOne({'_id': req.params.id});
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