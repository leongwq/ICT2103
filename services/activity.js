let activityService = {};

const db = require('../connections/mariadb');

activityService.addActivity = async (req, res) => {
    let conn;
    try {
        conn = await db.getConnection();
        const data = await conn.query("INSERT INTO activities (name, type, price, address, coorlat, coorlong) value (?,?,?,?,?,?)",
            [req.body.name, req.body.type, req.body.price, req.body.address, req.body.lat, req.body.long]);
            res.status(200).send(data);
    } catch (err) {
        res.status(409).send(err);
    } finally {
        if (conn) return conn.end();
    }
}

activityService.getActivityByID = async (req, res) => {
    let conn;
    try {
        conn = await db.getConnection();
        const data = await conn.query("SELECT * FROM activities WHERE id = (?)", [req.params.id]);
            res.status(200).send(data);
    } catch (err) {
        res.status(409).send(err);
    } finally {
        if (conn) return conn.end();
    }
}

module.exports = activityService;