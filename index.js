const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


app.get('/', (req, res) => {
    res.write('Hello World!');
    res.sendFile(__dirname + '/index.html');
});

app.use("/static", express.static('./static/'));

io.on('connection', (socket) => {
    socket.on('username', (initials) => {
        console.log('Connected User'+initials);
    });

    socket.on('camera_move', (data) => {
        data.id = socket.id;
        io.emit('camera_move', data);
    });

    socket.on('disconnect', () => {
        console.log('User Disconnected');
    });
})

server.listen(process.env.PORT || 4000, () => {
    console.log('Listening on : 4000');
})
