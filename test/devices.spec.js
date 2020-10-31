const app = require('../app.js');
const request = require('supertest');
const Device = require('../models/devices.model');
const User = require('../models/users.model');
var { connection } = require('../config/database.config');

const mongoose = require('mongoose');
const { utils } = require('mocha');

// Configuring mongoose to avoid deprecation warnings
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);


describe('POST /device', function() {
    before(function(done) {
        this.timeout(10000);
        if (connection.readyState == 1) return createUser()
        connection.on('open',createUser);

        function createUser() {
            User.insertMany({
                "_id" : "5f9c591792eb3f3fcb89131e",
                "firstName" : "Asheesh",
                "lastName" : "Bhuria",
                "password": "hashed_password",
                "emailAddress" : "asheesh.bhuria@gmail.com",
                "roles" : [ 
                    "user"
                ],
                "houseIds" : [ 
                    "house1", 
                    "house2"
                ]
             }).then(() => done())
        }
    })

    after(function(done) {
        User.findByIdAndDelete("5f9c591792eb3f3fcb89131e").then(() => done());
    })

    it('Checking validators for POST responds, it should respond with 400 error', function(done) {
        request(app)
            .post('/api/devices/')
            .send({})
            .set('Accept', 'application/json')
            .expect(400)
            .end(function(err, res) { 
                if (err) return done(err); 
                done();
            })
    });

    it('POST /device', function(done) {
        request(app)
            .post('/api/devices/')
            .send({
                "_id": "5f9c773fb5b9a00e909b47e5",
                "name": "Samsung AC Masterbedroom",
                "product": "Samsung",
                "productType": "Air Conditioner",
                "serialNumber": "SAMSUNG_19904123_a31212149812r42",
                "company": "Samsung",
                "mqttTopic": "feed/5f9c591792eb3f3fcb89131e/house1/SAMSUNG_19904123_a31212149812r42",
                "user": "5f9c591792eb3f3fcb89131e",
                "houseId": "house1"
                })
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) { 
                if (err) return done(err); 
                Device.findOne({ "_id": "5f9c773fb5b9a00e909b47e5" })
                    .then((data) => {
                        if (!data) return done(new Error("Records is not stored"));
                        done();
                    })
            })
    });

    it('GET /device', function(done) {
        request(app)
            .get('/api/devices/available/house1')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) { 
                if (err) return done(err); 
                if (!(Array.isArray(res.body) && res.body.length == 1)) return done(new Error('Unable to get devices'));
                done();
            })
    });

    it('POST /device/message/:id', function(done) {
        request(app)
            .post('/api/devices/message/5f9c773fb5b9a00e909b47e5')
            .send({"instructions": "Instructions"})
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) { 
                if (err) return done(err); 
                done();
            })
        });


    it('PATCH /devices', function(done) {
        request(app)
            .patch('/api/devices/5f9c773fb5b9a00e909b47e5')
            .send({
                "name": "Samsung AC Masterbedroom - Updated name",
                })
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) { 
                if (err) return done(err); 
                Device.findOneAndUpdate({_id: '5f9c773fb5b9a00e909b47e5'}, { "name": "Samsung AC Masterbedroom" }, { upsert: false })
                    .then((data) => {
                        if (!data) return done(new Error("Records doesn't exists"))
                        if (!(data && data.name == "Samsung AC Masterbedroom - Updated name")) return done(new Error("Records not updated"));
                        done();
                    })
            })
    });

    it('DELETE /device', function(done) {
        request(app)
            .delete('/api/devices/5f9c773fb5b9a00e909b47e5')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res) { 
                if (err) return done(err); 
                Device.findOne({_id: '5f9c773fb5b9a00e909b47e5'})
                    .then((data) => {
                        if (data) return done(new Error("Record didn't got deleted"))
                        done();
                    })
            })
    });
});