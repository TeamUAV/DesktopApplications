const child_process = require('child_process')

let py = child_process.spawn('python3', ['drone_feed.py']);

py.stdout.on('data', (data) => {
    console.log(data.toString())
})