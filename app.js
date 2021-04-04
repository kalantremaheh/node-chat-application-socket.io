const express = require('express');
const path = require('path')
const app = express();
const PORT = process.env.PORT|| 4000;
const server = app.listen(PORT,() => console.log(`server running on port ${PORT}`));
const io = require('socket.io')(server)
app.use(express.static(path.join(__dirname,'public')));

// io.on('connection',(socket) =>{
//     console.log(socket.id);
// })
let scocketConnect = new Set()

io.on('connection',onConnected)


function onConnected(socket){
    console.log(socket.id);
    scocketConnect.add(socket.id)


io.emit('client-total',scocketConnect.size)

socket.on('disconnect',()=>{
    console.log('Socket disconected',socket.id);
    scocketConnect.delete(socket.id)
    io.emit('client-total',scocketConnect.size)
})


socket.on('message',(data) =>{
    console.log(data);
    socket.broadcast.emit('chat-message',data);
})

socket.on('feedback',(data) =>{
    console.log(data);
    socket.broadcast.emit('feedback',data);
})

}