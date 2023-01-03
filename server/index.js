const http = require('http').createServer((req, res) => {
        const headers = {
            'Access-Control-Allow-Origin': '*', /* @dev First, read about security */
            'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
            'Access-Control-Max-Age': 2592000, // 30 days
            "Access-Control-Allow-Headers":"X-Requested-With"
            /** add other headers as per requirement */
        };

        if (req.method === 'OPTIONS') {
            res.writeHead(204, headers);
            res.end();
            return;
        }

        if (['GET', 'POST'].indexOf(req.method) > -1) {
            res.writeHead(200, headers);
            res.end('Hello World');
            return;
        }

        res.writeHead(405, headers);
        res.end(`${req.method} is not allowed for the request.`);
    });


const io = require('socket.io')(http, {
        cors: {origin: "*"}
    });

io.on('connection', socket => {
    console.log('new user has connected to the server' + ` id: ${socket.id}`);
    socket.on('message', data => {
        io.emit('message', `${socket.id} : ${data}`);
    })

})

http.listen(8080, () => console.log('the server listening on http://localhost:8080'));