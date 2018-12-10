



    var baseline={};
    var bodyParser = require('body-parser')
    var im= require('istanbul-middleware');
    var imTotal= require('istanbul-middleware');



    const low = require('lowdb')
    const FileSync = require('lowdb/adapters/FileSync')

    const adapter = new FileSync('db.json')
    const db = low(adapter)
    var _ = require('underscore');

    var istanbulDiff = require('istanbul-diff');
    var parse = require('byzantine');
    // /var aggregate = require('byzantine/aggregate');

    //im.hookLoader('../lib');
    express = require('express'),
    app = express();
    total = express()
    app.use(bodyParser.json({limit: '50mb', extended: true}));


    app.use('/coverage', im.createHandler());
    total.use('/total', imTotal.createHandler());

//add your router and other endpoints
//...

total.listen(8006);
app.listen(8005);

    // POST method route
    app.post('/baseline', function (req, res) {

        baseline = JSON.stringify(req.body, null, 2)
        res.send('BASELINE WAS SET');

    })


    // respond with "hello world" when a GET request is made to the homepage
    app.post('/delta', function (req, res) {
        var current =  JSON.stringify(req.body, null, 2);
        var testName = req.fileName;
        var coverageJson = JSON.parse(current)
        var files =  _.keys(coverageJson);



        for (var i=0;i< files.length ;i++) {
            var file = files[i];

            if(!db.has(file).value()){
                db.set(file,[]).write();
            }

            db.get(file)
                .push(testName)
                .write()
            }
        res.send('Delta was saved to db after parsing');
    })

    // respond with "hello world" when a GET request is made to the homepage
    app.get('/select', function (req, res) {
        res.send('hello world')
    })


    console.log('app started');
