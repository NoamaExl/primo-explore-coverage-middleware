



    var baseline={};
    var bodyParser = require('body-parser')
    var im= require('istanbul-middleware');
    var imTotal= require('istanbul-middleware');



    const low = require('lowdb')
    const FileSync = require('lowdb/adapters/FileSync')




    var _ = require('underscore');

    var istanbulDiff = require('istanbul-diff');
    var parse = require('byzantine');
    // /var aggregate = require('byzantine/aggregate');

    //im.hookLoader('../lib');
    express = require('express'),
    total = express()
    total.use(bodyParser.json({limit: '50mb', extended: true}));





    total.use('/total', imTotal.createHandler());

//add your router and other endpoints
//...

total.listen(8006);





    console.log('app started');
