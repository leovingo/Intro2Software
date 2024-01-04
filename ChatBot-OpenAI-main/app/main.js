const API_KEY = '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';
const chatBox = document.querySelector('.chat-box');
const inputField = chatBox.querySelector("input[type='text']");
const button = chatBox.querySelector('button');
const chatBoxBody = chatBox.querySelector('.chat-box-body');

button.addEventListener('click', sendMessage);
inputField.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

async function sendMessage() {
    const message = inputField.value;
    inputField.value = '';
    chatBoxBody.innerHTML += `<div class="message"><p>${message}</p></div>`;
    chatBoxBody.innerHTML += `<div id="loading" class="response loading">.</div>`;
    scrollToBottom();
    window.dotsGoingUp = true;
    var dots = window.setInterval(function () {
        var wait = document.getElementById('loading');
        if (window.dotsGoingUp)
            wait.innerHTML += '.';
        else {
            wait.innerHTML = wait.innerHTML.substring(1, wait.innerHTML.length);
            if (wait.innerHTML.length < 2)
                window.dotsGoingUp = true;
        }
        if (wait.innerHTML.length > 3)
            window.dotsGoingUp = false;
    }, 250);

    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: message }],
            max_tokens: 100,
        }),
    };

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options);
        const data = await response.json();
        document.getElementById('loading').remove();
        chatBoxBody.innerHTML += `<div class="response"><p>${data.choices[0].message.content}</p></div>`;
        scrollToBottom();
    } catch (error) {
        console.error(error);
    }
}

function scrollToBottom() {
    chatBoxBody.scrollTop = chatBoxBody.scrollHeight;
}
