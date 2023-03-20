const http = require('http').createServer();


const io = require('socket.io')(http,
    {
        cors: {origin: "*", methods: ["GET", "POST"]  },
        withCredentials: true
    });

io.on('connection', socket => {
    console.log('new user has connected to the server' + ` id: ${socket.id}`);
    socket.on('message', data => {
        io.emit('message', `${socket.id} : ${data}`);
    })

})

http.listen(8080, () => console.log('the server listening on http://localhost:8080'));