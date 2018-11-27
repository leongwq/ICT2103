let itineraryService = {};

const MongoDB = require('../../connections/mongodb')
const ObjectID = require('mongodb').ObjectID

itineraryService.addItinerary = async (req, res) => {
    try {
        // Order starts from 0
        const collection = MongoDB.db.collection('itinerary');
        const data = await collection.insertOne({'activity': ObjectID(req.body.activity), 'preference': ObjectID(req.body.preference), 'activity_order': req.body.order});
        res.status(200).send(data);
    } catch (err) {
        res.status(409).send(err);
    }
}

itineraryService.getItineraryByPreference = async (req, res) => {
    try {
        const collection = MongoDB.db.collection('itinerary');
        const data = await collection.aggregate([{
            $lookup:
                {
                    from: "activities",
                    localField: "activity",
                    foreignField : "_id",
                    as: "activities"
                }
            },
            { $match : 
                {
                    preference : ObjectID(req.params.id)
                }
            }]).toArray();
        res.status(200).send(data);
    } catch (err) {
        res.status(409).send(err);
    }
}

itineraryService.getAllTrips = async (req, res) => {
    try {
        const collection = MongoDB.db.collection('trip_preference');
        const data = await collection.find({'userid': ObjectID(req.payload._id), 'date': {$gte: new Date()}}).toArray();
        res.status(200).send(data);
    } catch (err) {
        console.log(err);
        res.status(409).send(err);
    }
}

itineraryService.getTripHistory = async (req, res) => {
    // SQL Statement to check trip preference before current date. Then return all
    try {
        const collection = MongoDB.db.collection('trip_preference');
        const data = await collection.find({'userid': ObjectID(req.payload._id), 'date': {$lt: new Date()}}).toArray();
        res.status(200).send(data);
    } catch (err) {
        res.status(409).send(err);
    }
}

itineraryService.addSharedTrip = async (req, res) => {
    try {
        const collection = MongoDB.db.collection('shared_trips');
        const data = await collection.insertOne({"user": ObjectID(req.payload._id), "preference": ObjectID(req.body.preference)})
        res.status(200).send(data);
    } catch (err) {
        res.status(409).send(err);
    }
}

itineraryService.getSharedTrips = async (req, res) => {
    try {
        const collection = MongoDB.db.collection('shared_trips');
        const data = await collection.aggregate({})
        const data = await conn.query("SELECT * FROM shared_trips s INNER JOIN trip_preference p on s.preference = p.id");
            res.status(200).send(data);
    } catch (err) {
        res.status(409).send(err);
    }
}

module.exports = itineraryService;