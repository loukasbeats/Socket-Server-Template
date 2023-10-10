let ws = new WebSocket('wss://loukas-1b70ae73d90a.herokuapp.com//:443');

let inputText = document.querySelector('.inputText');
let sendButton = document.querySelector('.sendButton');

sendButton.addEventListener('click', (event) => {
  let textToSend = inputText.value;
  ws.send(JSON.stringify({ 'text': textToSend }));
  inputText.value = ''; // Clear the input after sending
}, false);

ws.addEventListener('open', (event) => {
  console.log('Socket connection open');
  ws.send('pong');
});

ws.addEventListener('message', (message) => {
  if (message && message.data) {
    if (message.data === "ping") {
      console.log("got ping");
      ws.send("pong");
      return;
    }
    let data = JSON.parse(message.data);
    if (data) {
      if ("text" in data) {
        // Do something with the received text data
        console.log("Received text:", data["text"]);
      }
      console.log("got data", data);
    }
  }
  console.log("message", message)
});

ws.addEventListener('error', (error) => {
  console.error('Error in the connection', error);
  alert('error connecting socket server', error);
});

ws.addEventListener('close', (event) => {
  console.log('Socket connection closed');
  alert('closing socket server');
});
