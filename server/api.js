const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/formdata');
var db = mongoose.connection;
var Schema = mongoose.Schema;
// declare axios for making http requests
// const axios = require('axios');
// const API = 'https://jsonplaceholder.typicode.com';

db.on('error', console.error.bind(console, "connection error"));
db.once("open", function (callback) {
    console.log('connection Establish');
});

var userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: Number, required: true },
    gender: { type: String, required: true },
    dob: { type: String, required: true },
    active: { type: Boolean }
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('datas', userSchema);

router.post('/form', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    var values = {
        firstName: req.body.fname, lastName: req.body.lname, phone: req.body.uphone, gender: req.body.ugender, dob: req.body.udob, active: req.body.uactive
    }
    var data = new User(values);
    data.save(function (err, object) {
        if (err) {
            res.status(200).send(err);
        }
        else {
            res.status(200);
            res.send('Data saved successfully');
        }
    });

});

router.get('/list', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    User.find({}, (err, data) => {
        if (err) {
            res.status(500);
        }
        if (data) {
            res.status(200);
            res.send({
                'result': data
            });
        }
    })
})

router.get('/delete/:userId', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    User.findByIdAndRemove(req.params.userId, function (err, data) {
        if (!err) {
            res.status(500);
        }
        if (data) {
            res.status(200);
            res.send({
                'result': data
            });
        }
        console.log(data);
    })
})

router.get('/edit/:userId', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    User.find({ _id: req.params.userId }, (err, data) => {
        if (err) {
            res.status(500);
        }
        if (data) {
            res.status(200);
            res.send({
                'result': data
            });
        }
    })
})

router.put('/update/:userId', (req, res) => {
    console.log(req.body);
    res.setHeader('Access-Control-Allow-Origin', '*');
    User.findByIdAndUpdate(req.params.userId, { 'firstName': req.body.fname, 'lastName': req.body.lname, 'phone': req.body.uphone, 'gender': req.body.ugender, 'dob': req.body.udob, 'active': req.body.uactive}, function (err, data) {
        if (!err) {
            res.status(500);
        }
        if (data) {
            res.status(200);
            res.send({
                'result': data
            });
        }
    })
})

module.exports = router;