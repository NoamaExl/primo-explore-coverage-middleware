var im = require('istanbul-middleware'),

    express = require('express'),
    app = express();


    app.use('/coverage', im.createHandler());

//add your router and other endpoints
//...

app.listen(8005);
console.log('app started');