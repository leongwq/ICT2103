const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../connections/mariadb');
const crypto = require('crypto');

passport.use(new LocalStrategy({
    usernameField: 'email' // name of the properties in the POST body that are sent to the server. We are using email instead of username
}, async function (username, password, done) {
    try {
        conn = await db.getConnection();
        const user = await conn.query("SELECT * FROM users WHERE email = (?)", [username]);
        // Return if user not found in database
        if (user === undefined || user.length == 0) {
            return done(null, false, {
                message: 'User not found'
            });
        }
        // Return if password is wrong
        if (!validatePassword(user[0].salt, user[0].password, password)) {
            return done(null, false, {
                message: 'Password is wrong'
            });
        }
        // If credentials are correct, return the user object
        return done(null, user);
    } catch (err) {
        return done(err);
    } finally {
        if (conn) return conn.end();
    }
}));

// Validate password by comparing hash
const validatePassword = (salt, hash, password) => {
    const generatedHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return hash === generatedHash;
}