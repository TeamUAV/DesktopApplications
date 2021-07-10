const net = require('net');
const fs = require('fs');

let server = net.createServer(function(connection) {
    console.log('client connected');

    connection.on('end', function(){
        console.log('client disconnected');
        server.close();
    })

    connection.on('error', function(err){
        console.log(err);
    })
    writePipe(connection, 'up');
    writePipe(connection, 'down');
    writePipe(connection, 'left');
    writePipe(connection, 'right');
    writePipe(connection, 'curve_right');
    writePipe(connection, 'NaN');
})

server.listen(8080, function() {
    console.log('server is listening');
})

function writePipe(connection, msg){
    connection.write(`${msg}\n`);
    connection.pipe(connection);
}