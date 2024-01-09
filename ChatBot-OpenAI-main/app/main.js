const createMessage = (message, isResponse) => {
    let div = document.createElement("div");
  
    if (isResponse) div.classList.add("response");
    else div.classList.add("message");
  
    div.innerHTML = `<p>${message}</p>`;
    return div;
  };
  
  const craeteLoading = () => {
    let div = document.createElement("div");
    div.id = "loading";
    div.classList.add("response");
    div.classList.add("loading");
    div.innerHTML = ".";
    return div;
  };
  
  document.addEventListener("DOMContentLoaded", function () {
    const API_KEY = "";
    const chatBox = document.querySelector(".chat-box");
    const inputField = chatBox?.querySelector("input[type='text']");
    const button = chatBox.querySelector("button");
    const chatBoxBody = chatBox.querySelector(".chat-box-body");
  
    button.addEventListener("click", sendMessage);
    inputField.addEventListener("keypress", async function (event) {
      if (event.key === "Enter") {
        await sendMessage();
      }
    });
  
    async function sendMessage() {
      const message = inputField.value;
      inputField.value = "";
      chatBoxBody.appendChild(createMessage(message));
      chatBoxBody.appendChild(craeteLoading());
      scrollToBottom(chatBoxBody);
      window.dotsGoingUp = true;
      var dots = window.setInterval(function () {
        var wait = document.getElementById("loading");
        if (!wait) {
          window.clearInterval(dots);
          return;
        }
  
        if (window.dotsGoingUp) wait.innerHTML += ".";
        else {
          wait.innerHTML = wait.innerHTML.substring(1, wait.innerHTML.length);
          if (wait.innerHTML.length < 2) window.dotsGoingUp = true;
        }
        if (wait.innerHTML.length > 3) window.dotsGoingUp = false;
      }, 250);
  
      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: message }],
          max_tokens: 100,
        }),
      };
  
      try {
        const response = await fetch(
          "https://api.openai.com/v1/chat/completions",
          options
        );
        const data = await response.json();
        document.getElementById("loading").remove();
  
        if (data.error) {
          chatBoxBody.appendChild(createMessage(data.error.message));
          console.error(data.error.message);
        }
  
        chatBoxBody.appendChild(
          createMessage(data.choices[0].message.content, true)
        );
        scrollToBottom(chatBoxBody);
      } catch (error) {
        console.error(error.message);
      }
    }
  
    function scrollToBottom(chatBoxBody) {
      chatBoxBody.scrollTop = chatBoxBody.scrollHeight;
    }
  });
  