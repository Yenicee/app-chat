const express = require("express")
const app = express()
const http = require("http")
const cors = require("cors")
const { Server } = require("socket.io")

app.use(cors())

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log(`current user: ${socket.id}`)

    socket.on("join_room", (data) => {
        socket.join(data)
        console.log(`user with id: ${socket.id} joined the chat room: ${data} `)

    })

    socket.on("send_message", (data) => {
        console.log('Message received');
        console.log(data);
    
        // Envía el mensaje a todos los clientes en la misma sala
        io.to(data.room).emit('receive_message', data);
    })
    
    socket.on("disconnect", () => {
        console.log("user disconnet", socket.id)
    })
})

server.listen(3001, () => {
    console.log('server running')
})