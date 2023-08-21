const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';

let db = null;

async function connectToDatabase() {
    try {
        const client = await MongoClient.connect(url, { useUnifiedTopology: true });
        console.log("Connected successfully to db server");

        db = client.db('myproject');
    } catch (err) {
        console.error('Failed to connect to db server:', err);
        throw err;
    }
}

connectToDatabase();


// create user account
function create(name, email, password){
    return new Promise((resolve, reject) => {    
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0, isAdmin: false}; // Added isAdmin field
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });    
    })
}

// Check and create admin user if not present
/*function ensureAdminUser(){
    return new Promise(async (resolve, reject) => {
        const collection = db.collection('users');
        const email = process.env.ADMIN_EMAIL; 
        const user = await collection.findOne({ email: email });

        if (!user) {
            const name = process.env.ADMIN_NAME;
            const password = process.env.ADMIN_PASSWORD;
            const doc = {name, email, password, balance: 0, isAdmin: true};
            
            collection.insertOne(doc, {w:1}, function(err, result) {
                err ? reject(err) : resolve(doc);
            });
        } else {
            resolve("Admin user already exists.");
        }
    })
}*/


// find user account
function find(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({email: email})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

// find user account
function findOne(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .findOne({email: email})
            .then((doc) => {
                resolve(doc);
            })
            .catch((err) => reject(err));    
    })
}


// update - deposit/withdraw amount
function update(email, amount, transaction){ //added transaction array for later to use in alldata
    return new Promise((resolve, reject) => {
        const customers = db.collection('users');
        customers.findOneAndUpdate(
            {email: email},
            {
                $inc: { balance: amount },
                $push: { transactions: transaction }
            },
            { returnOriginal: false },
            function (err, documents) {
                err ? reject(err) : resolve(documents);
            }
        );
    });    
}

// all users
function all(){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}


module.exports = {
    getDb: function() {
    return db;
},
create, /*ensureAdminUser,*/ findOne, find, update, all};