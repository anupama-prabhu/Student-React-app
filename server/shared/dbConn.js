var mongodb = require('mongodb')

function getDBConnection(res, cb) {
    var db;
    var url = 'mongodb://127.0.0.1:27017'
    var mongoClient = mongodb.MongoClient;
    mongoClient.connect(url, function (err, server) {
        if (err) {
            res.send('db con error')
        } else {
            db = server.db('school')
            cb(db)
        }
    })

}

module.exports = getDBConnection