let preferenceService = {};

const db = require('../connections/mariadb');

preferenceService.addPreference = async (req, res) => {
    let conn;
    try {
        conn = await db.getConnection();
        const data = await conn.query("INSERT INTO trip_preference (userid, budget, intensity, type, fullday, pax, date) value (?,?,?,?,?,?,?)",
            [req.payload._id, req.body.budget, req.body.intensity, req.body.type, req.body.fullday, req.body.pax, req.body.date]);
            res.status(200).send(data);
    } catch (err) {
        res.status(409).send(err);
    } finally {
        if (conn) return conn.end();
    }
}

preferenceService.getPreferenceByID = async (req, res) => {
    let conn;
    try {
        conn = await db.getConnection();
        const data = await conn.query("SELECT * FROM trip_preference WHERE id = (?)", [req.params.id]);
            res.status(200).send(data);
    } catch (err) {
        res.status(409).send(err);
    } finally {
        if (conn) return conn.end();
    }
}

module.exports = preferenceService;