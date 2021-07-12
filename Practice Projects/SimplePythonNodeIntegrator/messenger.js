// let spawn = require('child_process').spawn;
// py = spawn('python3', ['compute.py', 'hello there']);
// data = [1,2,3,4,5,6,7,8,9];
// dataString = "";

// py.stdout.on('data', function(data){
//     console.log(data.toString());
//     dataString += data.toString();
// });

// py.stdin.write(JSON.stringify(data));
// py.stdin.end();

// console.log('checking if this is async');

const fs = require('fs');

let bitmap = fs.readFileSync('sample.jpg');
let base64Img = Buffer.from(bitmap).toString('base64');

// console.log(base64Img);
let child = require('child_process').spawn('python3',['compute.py']);

child.stdout.on('data', function(data){
    console.log(data.toString());

});

child.stdin.write(base64Img);
child.stdin.end();
