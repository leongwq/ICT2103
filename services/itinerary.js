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
        res.status(409).send(err);
    } finally {
        if (conn) return conn.end();
    }
}

itineraryService.getAllTrips = async (req, res) => {
    // SQL Statement to check trip preference before current date. Then return all
    let conn;
    try {
        conn = await db.getConnection();
        const data = await conn.query("SELECT * FROM trip_preference WHERE date >= current_date AND userid = (?)", [req.payload._id]);
            res.status(200).send(data);
    } catch (err) {
        res.status(409).send(err);
    } finally {
        if (conn) return conn.end();
    }
}

itineraryService.getTripHistory = async (req, res) => {
    // SQL Statement to check trip preference before current date. Then return all
    let conn;
    try {
        conn = await db.getConnection();
        const data = await conn.query("SELECT * FROM trip_preference WHERE date < current_date AND userid = (?)", [req.payload._id]);
            res.status(200).send(data);
    } catch (err) {
        res.status(409).send(err);
    } finally {
        if (conn) return conn.end();
    }
}

itineraryService.addSharedTrip = async (req, res) => {
    let conn;
    try {
        conn = await db.getConnection();
        const data = await conn.query("INSERT INTO shared_trips (user, preference) value (?,?)",
            [req.payload._id, req.body.preference]);
            res.status(200).send(data);
    } catch (err) {
        res.status(409).send(err);
    } finally {
        if (conn) return conn.end();
    }
}

itineraryService.getSharedTrips = async (req, res) => {
    let conn;
    try {
        conn = await db.getConnection();
        const data = await conn.query("SELECT * FROM shared_trips s INNER JOIN trip_preference p on s.preference = p.id");
            res.status(200).send(data);
    } catch (err) {
        res.status(409).send(err);
    } finally {
        if (conn) return conn.end();
    }
}

module.exports = itineraryService;