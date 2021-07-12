const http = require('http');

const host = 'localhost';
const port = '8080';

let count = 0;
let start, end;

const requestListener = function (req, res) {
    res.writeHead(200);
    res.end('My first server in node!');

    // req.on('data', (data) => {
    //   console.log(JSON.parse(data.toString())['image'])
    // })
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`server listening on http://${host}:${port}`);
})



let flag = false;
let frames = [];
let strImage = '';

let img = '';


let spawn = require('child_process').spawn
py = spawn('python3', ['nodeClient.py']),
py.stdout.on('data', function(data){
  if(!flag){
    start = new Date();
    // console.time();
    flag = true;
  }
  console.log(data.toString());
  if (data.toString().includes('<ENDER && SEPARATOR>')){
    let index = data.toString().indexOf('<ENDER && SEPARATOR>');
    strImage+= data.toString().slice(0, index);
    frames.push(strImage);
    img = strImage;
    strImage = '';
    count++;
  }
  else{
   strImage += data.toString();
  }  
});

py.stdout.on('end', function(data){
  // console.timeEnd();
  end = new Date();
  let time = (end - start)/1000;
  console.log(time);
  console.log(count/time);
  // console.log(frames[0].toString('base64'));
  for(let i = 0; i< frames.length; i++){
    require('fs').writeFile(`images/out${i}.jpg`, frames[i].toString('base64'), 'base64', (err) => {
      // console.log(err);
    });
  }
})