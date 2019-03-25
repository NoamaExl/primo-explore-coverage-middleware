



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

    app.use(bodyParser.json({limit: '50mb', extended: true}));


    db.defaults({})
        .write()

    app.use('/coverage', im.createHandler());

//add your router and other endpoints
//...


app.listen(8005);



    // respond with "hello world" when a GET request is made to the homepage
    app.post('/delta', function (req, res) {
        var current =  JSON.stringify(req.body, null, 2);
        var testName = req.query.fileName;
        var coverageJson = JSON.parse(current)
        var files =  _.keys(coverageJson);



        for (var i=0;i< files.length ;i++) {
            var file = files[i];

            if(!db.has(file).value()){
                db.set(file,[]).write();
            }

            var tests = db.get(file);
            if(tests.indexOf(testName) === -1){
                tests.push(testName)
                    .write()
            }

        }
        res.send('Delta was saved to db after parsing');
    })

    // respond with "hello world" when a GET request is made to the homepage
    app.get('/select', function (req, res) {
        var testName = req.query.fileName;
        var tests = db.get(testName).value();
        res.send(tests);
    })




    console.log('app started');
