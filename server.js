var express = require('express');
var app = express();
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');

app.use(express.static('client'));

mongoose.connect('mongodb://localhost:27017/tasksDB');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var schemaTasks = new mongoose.Schema({
    name: 'String',
    time_exec: 'Date',
    executive: 'String',
    time_expire: 'Date'},
{collection: 'tasks'});

var modelTasks = mongoose.model('task', schemaTasks);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/client/html/index.html');
});

app.post('/task', function (req, res) {
    
    var task = new modelTasks({name: req.query.name,
        time_exec: req.query.time_exec,
        executive: req.query.executive,
        time_expire: new Date()});
    
    task.save(function(err){
        if(err) console.log(err);
        res.send('success'); 
    });
    
});

app.put('/task', function(req, res){
   modelTasks.find({}, function(err, tasks){
      res.send(tasks);
   });
});
app.listen(8000);