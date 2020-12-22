const socket = io('http://localhost:3000');
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById('message-input');
const messageContainer = document.getElementById('message-container');

const name = prompt('What is Your name?')
appendMessage("You Joined",1);
socket.emit('new-user',name);

socket.on('chat-message', data => {
    appendMessage(`${data.name} : ${data.message}`,0);
});

socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`,0);
});

socket.on('user-connected', name => {
    appendMessage(`${name} connected`,0);
});

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You : ${message}`,1);
    socket.emit('send-chat-message',message);
    messageInput.value = '';
})

function appendMessage(message,flag){
    // const messageElement = document.createElement('div');
    // messageElement.innerText = message;
    // messageContainer.append(messageElement);




    let card = document.createElement('div');
    if(flag){
        card.className = 'card text-white mb-3 d-inline-block float-right rounded';
        card.style.background = "#f50057";
    }
    else{
        card.className = 'card text-light mb-3 d-inline-block float-left rounded';
        card.style.background = "#FF8A80";
    }
    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let cardText = document.createElement('p');
    cardText.innerText = message;
    cardText.className = 'card-text text-center';

    card.style.clear = "both";
    card.style.width = "40%";
    cardBody.appendChild(cardText);
    card.appendChild(cardBody);

    messageContainer.append(card);
}

