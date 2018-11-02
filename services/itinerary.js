let itineraryService = {};

const db = require('../connections/mariadb');

itineraryService.addItinerary = async (req, res) => {
    let conn;
    try {
        conn = await db.getConnection();
        // Order starts from 0
        const data = await conn.query("INSERT INTO itinerary (activity, preference, activity_order) value (?,?,?)",
            [req.body.activity, req.body.preference, req.body.order]);
            res.status(200).send(data);
    } catch (err) {
        console.log(err);
        res.status(409).send(err);
    } finally {
        if (conn) return conn.end();
    }
}

itineraryService.getItineraryByPreference = async (req, res) => {
    let conn;
    try {
        conn = await db.getConnection();
        const data = await conn.query("SELECT * FROM itinerary i INNER JOIN activities a ON i.activity = a.id WHERE preference = (?)", [req.params.id]);
            res.status(200).send(data);
    } catch (err) {
        console.log(err);
        res.status(409).send(err);
    } finally {
        if (conn) return conn.end();
    }
}

module.exports = itineraryService;