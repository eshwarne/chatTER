$(function(){
let socket = io.connect('http://192.168.43.13:3000',{transports: ['websocket']});
let message = $("#message");
let sendMessage = $("#sendMessage");
let username = $("#username");
let sendUsername = $("#sendUsername");
var chatArea=$("#chatArea") ;
let userCountDisplay = $("#userCountDisplay")

// emitting in sockets

// emit and receive event
socket.on('newUser',(data)=>{
    userCountDisplay.html(data.count);
})
sendMessage.click((event) => {
    
    socket.emit('newMessage',{message:message.val()});
    message.val("")
})
socket.on('newMessage',(data)=>{
    
    chatArea.append("<div class='displayDiv'><p class='userNameDisplay'>"+data.username+"</p>"+"<p class='messageDisplay'>"+data.message+"</p></div>")
})

//only emit event
sendUsername.click(()=>{
    socket.emit('change_username',{username:username.val()})
})
});