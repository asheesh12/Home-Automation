const app = require('../app.js');
const request = require('supertest');
const Device = require('../models/devices.model');
var { connection } = require('../config/database.config');

const mongoose = require('mongoose');

// Configuring mongoose to avoid deprecation warnings
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);


describe('POST /device', function() {

    beforeEach(function(done) {
        if (connection.readyState == 1) return done()
        connection.on('open',done);
    })

    it('responds with 400 error', function(done) {
        request(app)
            .post('/devices/')
            .send({})
            .set('Accept', 'application/json')
            .expect(400)
            .end(function(err, res) { 
                if (err) return done(err); 
                done();
            })
    });

    it('responds with 200', function(done) {
        request(app)
            .post('/devices/')
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
});


describe('PATCH /device', function() {

    beforeEach(function(done) {
        if (connection.readyState == 1) return done()
        connection.on('open',done);
    })
    
    it('responds with 200', function(done) {
        request(app)
            .patch('/devices/5f9c773fb5b9a00e909b47e5')
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
});


describe('DELETE /device', function() {
    beforeEach(function(done) {
        if (connection.readyState == 1) return done()
        connection.on('open',done);
    })
    
    it('responds with 200', function(done) {
        request(app)
            .delete('/devices/5f9c773fb5b9a00e909b47e5')
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