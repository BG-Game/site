const express = require('express')
var app = express();
const cors = require('cors')
const PORT = 3001

const corsOptions = {
    origin:  ["http://localhost:3000"],
};

const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/TD_Users')

const  usersSchema = new mongoose.Schema({
    name: String,
    age:  Number,
    pas:  String
})

const UsersModel = mongoose.model('TD_Users', usersSchema)

app.use(cors(corsOptions))

app.get('/api', (req, res) => {
    res.json({
        message: 'Hello from Express.js!'
    })
})

app.get('/getUsers', (req, res) => {
    const data = UsersModel.find({}).then(function(users){
        res.json(users)
    }).catch(function(err) {
        console.log(err);
    })
})


app.listen(PORT, () => {
    console.log("Server start PORT: " + PORT);
})