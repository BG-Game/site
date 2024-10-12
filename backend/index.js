const express = require('express')
var app = express();
const cors = require('cors')
const PORT = 3001
const mongoose = require('mongoose')

app.use(cors());

app.use(express.json()); // enable JSON parsing

mongoose.connect('mongodb://127.0.0.1:27017/rasp_db')

const  dbgroupsSchema = new mongoose.Schema({
    name: String,
    rasp: [{
        one_week: Object,
        two_weeks: Object,
    }]
})

const dbweekSchema = new mongoose.Schema({
    week: String
})

const dbweekModel = mongoose.model('week', dbgroupsSchema)
const dbGroupsModel = mongoose.model('rasp', dbgroupsSchema)

app.get('/api', (req, res) => {
    res.json({
        message: 'Hello from Express.js!'
    })
})

app.get('/getWeek', (req, res) => {
    console.log("getWeek");
    const data = dbweekModel.find({}).then(function(users){
        res.json(users)
    }).catch(function(err) {
        console.log(err);
    })
})

app.get('/getData', (req, res) => {
    console.log("getGroups");
    const data = dbGroupsModel.find({}).then(function(users){
        res.json(users)
    }).catch(function(err) {
        console.log(err);
    })
})

app.get('/getData/:id', (req, res) => {
    // res.send(`<h1>${req.params.id}</h1>`);
    // res.json({
    //     message: req.params.id
    // })
    console.log("getData/" + req.params.id);
    const data = dbGroupsModel.find({name: req.params.id}).then(function(users){
        res.json(users)
    }).catch(function(err) {
        console.log(err);
    })
});

app.get('/getGroups', (req, res) => {
    console.log("getGroups");
    const data = dbGroupsModel.find({}).then(function(users){
        res.json(users)
    }).catch(function(err) {
        console.log(err);
    })
})

// app.post('/log', (req, res) => {
//     const { login, pass } = req.body;
//     console.log(`Received text: ${login.login} , ${pass.pass}`);
//     res.send(true);
// });

// app.post('/test', (req, res) => {
//     const asd = req.body.asd;
//     console.log(`Received text: ${asd}`);
//     res.send(true);
// });

app.listen(PORT, () => {
    console.log("Server start PORT: " + PORT);
})