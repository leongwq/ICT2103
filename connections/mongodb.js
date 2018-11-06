const MongoClient = require('mongodb').MongoClient;

class Connection {
    static connectToMongo() {
        if ( this.database ) return Promise.resolve(this.database)
        return MongoClient.connect(this.url, this.options)
        .then(client => this.db = client.db('ict2103'))
    }
}

Connection.db = null;
Connection.url = 'mongodb+srv://wenqing:elephant@cluster0-tm0i4.mongodb.net/test?retryWrites=true';
Connection.options = {
    useNewUrlParser: true,
    bufferMaxEntries: 0,
    reconnectTries: 5000,
}

module.exports = Connection;