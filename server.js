const http = require('http');
const app = require('./app');


const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port,(err) => {
    if(err)
        console.log(err);
    console.log('\x1b[4m%s\x1b[36m%s\x1b[0m', 'I am cyan','i am blue');
    console.log("%cNow listening to port ","color:red"+port);
});