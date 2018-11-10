let activityService = {};

const MongoDB = require('../../connections/mongodb')
const ObjectID = require('mongodb').ObjectID

activityService.addActivity = async (req, res) => {
    try {
        const collection = MongoDB.db.collection('activities');
        const data = await collection.insertOne({'name': req.body.name, 'type': req.body.type, 'price': req.body.price,
        'address': req.body.address, 'coorlat': req.body.lat, 'coorlong': req.body.long});
            res.status(200).send(data);
    } catch (err) {
        res.status(409).send(err);
    }
}

activityService.getActivityByID = async (req, res) => {
    try {
        const collection = MongoDB.db.collection('activities');
        const data = await collection.find({'_id': ObjectID(req.params.id)}).toArray();
            res.status(200).send(data);
    } catch (err) {
        console.log(err);
        res.status(409).send(err);
    }
}

module.exports = activityService;