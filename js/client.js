const socket = io('http://localhost:8000');
// get dom elemetn in respective of js variable
const form = document.getElementById('send-container')
const messageinput = document.getElementById('messageinp')
const messagecontainer = document.querySelector(".container")
 
// audio that will play on receiveing the message !
var audio = new Audio('ting.mp3');

// function which will append event info to the container
const append = (message, position)=>{
    const messageElement = document.createElement('div')
    messageElement.innerHTML = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messagecontainer.append(messageElement);
    if(position == "left"){
          audio.play();
    }
}

// ask his/her name to the user, let the  server know !
 const name = prompt("Enter your name to join server")

       
       socket.emit("new-user joined", name);


// if new user join the chat, receive his name from server
socket.on('user-joined',name=>{
    append(`${name} joined the chat `,`right`)
    
})
// if server send the message , receive it
socket.on('receive',data=>{
    append(`${data.name}: ${data.message}`, 'left')
})

// if server leave the chat ,append the info to the container
socket.on('leave',name=>{
    append(`${name} left the chat`, 'left')
})

// if form get submitted send message to server
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageinp.value;
    append(`YOU: ${message}`, 'right');
    socket.emit('send', message);
    messageinp.value= ''
})


