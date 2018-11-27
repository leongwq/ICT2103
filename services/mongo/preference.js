let preferenceService = {};

const MongoDB = require('../../connections/mongodb')
const ObjectID = require('mongodb').ObjectID

preferenceService.addPreference = async (req, res) => {
    try {
        const collection = MongoDB.db.collection('trip_preference');
        const data = await collection.insertOne({'userid': ObjectID(req.payload._id), 'budget': req.body.budget, 'intensity': req.body.intensity,
        'type': req.body.type, 'fullday': req.body.fullday, 'pax': req.body.pax, 'date': new Date(req.body.date)});
        res.status(200).send(data);
    } catch (err) {
        res.status(409).send(err);
    }
}

preferenceService.getPreferenceByID = async (req, res) => {
    try {
        const collection = MongoDB.db.collection('trip_preference');
        const data = await collection.find({'_id': ObjectID(req.params.id)}).toArray();
        res.status(200).send(data);
    } catch (err) {
        res.status(409).send(err);
    }
}

preferenceService.changeDateByID = async (req, res) => {
    try {
        const collection = MongoDB.db.collection('trip_preference');
        const data = await collection.updateOne({'_id': ObjectID(req.body.id), 'userid': ObjectID(req.payload._id)},{$set: {'date': req.body.date}});
        res.status(200).send(data);
    } catch (err) {
        res.status(409).send(err);
    }
}

preferenceService.deletePreferenceByID = async (req, res) => {
    try {
        const collection = MongoDB.db.collection('trip_preference');
        const data = await collection.deleteOne({'_id': ObjectID(req.params.id), 'userid': ObjectID(req.payload._id)});
        res.status(200).send(data);
    } catch (err) {
        res.status(409).send(err);
    }
}
module.exports = preferenceService;