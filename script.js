const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');

function sendMessage() {
    const message = userInput.value.trim();
    if (message !== '') {
        appendMessage('user', message);
        analyzeMessage(message);
        userInput.value = '';
    }
}

function analyzeMessage(message) {
    if (message.toLowerCase().includes('call') || message.toLowerCase().includes('telephone help')) {
        window.location.href = 'tel:+1234567890'; // Replace with your phone number
        return;
    } else if (message.toLowerCase().includes('email support')) {
        window.location.href = 'mailto:support@smsrinikethan@gmail.com'; // Replace with your email address
        return;
    }

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const response = findResponse(data, message);
            if (response.startsWith('http')) {
                window.location.href = response; // Redirect to the link
            } else {
                appendMessage('bot', response);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function findResponse(data, message) {
    // Analyze the message and find a suitable response from the JSON data
    if (message.toLowerCase().includes('hello')||(message.includes('hi')) ){
        return getRandomResponse(data.greetings);

    } else if (message.toLowerCase().includes('goodbye')) {
          return getRandomResponse(data.farewells);
         
    } 
    else if(message.toLowerCase().includes('scheme')){
        // return getRandomResponse(data.pension_scheme);
    }
    
    
    
    else  {
        // Check if the message contains a link
        for (const key in data.links) {
            if (message.toLowerCase().includes(key)) {
                return data.links[key];
            }
        }
        return "I'm sorry, I don't understand.";
    }
}

function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

function appendMessage(sender, message) {
    const messageDiv = document.createElement('div');
    if (message.startsWith('http')) {
        // If the message is a link, create a clickable link
        const link = document.createElement('a');
        link.href = message;
        link.textContent = message;
        messageDiv.appendChild(link);
    } else {
        messageDiv.textContent = `${sender}: ${message}`;
    }
    messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    chatLog.appendChild(messageDiv);
}

