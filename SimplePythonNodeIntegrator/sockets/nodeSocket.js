const net = require('net');
const fs = require('fs');

let server = net.createServer(function(connection) {
    console.log('client connected');

    connection.on('end', function(){
        console.log('client disconnected');
    })

    connection.on('error', function(err){
        console.log(err);
    })

    // connection.write('hello world');
    fs.readFile('../sample.jpg', 'base64', function(err, data){
        // stats = fs.statSync('../sample.jpg').size;
        // connection.write(stats.toString()+'\n');
        connection.write(data);
        connection.pipe(connection);
    })
})

server.listen(8080, function() {
    console.log('server is listening');
})