let preferenceService = {};

const db = require('../connections/mariadb');

preferenceService.addPreference = async (req, res) => {
    console.log(req.payload);
    let conn;
    try {
        conn = await db.getConnection();
        const data = await conn.query("INSERT INTO trip_preference (userid, budget, meal_preference, meal_comments, type) value (?,?,?,?,?)",
            [req.payload._id, req.body.budget, req.body.meal_preference, req.body.meal_comments, req.body.type]);
            res.status(200).send(data);
    } catch (err) {
        res.status(409).send(err);
    } finally {
        if (conn) return conn.end();
    }
}

// activityService.getActivityByID = async (req, res) => {
//     let conn;
//     try {
//         conn = await db.getConnection();
//         const data = await conn.query("SELECT * FROM activities WHERE id = (?)", [req.params.id]);
//             res.status(200).send(data);
//     } catch (err) {
//         res.status(409).send(err);
//     } finally {
//         if (conn) return conn.end();
//     }
// }

module.exports = preferenceService;