const express =  require('express');
const app = express()
let count = 0;

//ejs template engine
app.set('view engine','ejs')

//providing static directory
app.use(express.static('public'))
app.get('/',(req,res) => {
    
    res.render('index.ejs');
})

server = app.listen(3000,'192.168.43.13');

//initialization of socket.io
const io = require("socket.io")(server)

//listen on every new connection
io.on('connection',(socket)=>{
    console.log('New user connected')
    //default username
    socket.username = "anonymousUser"
    count++;
    socket.on('disconnect',(socket)=>{
        count--;
        io.sockets.emit("newUser",{count:count});
    })
    io.sockets.emit('newUser',{count:count})
    socket.on('change_username',(data) => {
        socket.username = data.username;
        console.log(socket.username);
    })
    socket.on('newMessage',(data) =>{
        io.sockets.emit('newMessage',{message : data.message, username:socket.username})
    })
})


