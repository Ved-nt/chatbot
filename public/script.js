async function sendMessage() {
  const userMessage = document.getElementById('userInput').value.trim();
  const chatBox = document.getElementById('chat-box');

  if (!userMessage) return;

  // Format the current time
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Add user's message as a bubble with timestamp
  chatBox.innerHTML += `
    <div style="margin-top: 1em; display: flex; justify-content: flex-end;">
      <div style="max-width: 70%; background-color: #DCF8C6; padding: 10px 15px; border-radius: 15px; text-align: right;">
        <div><strong>You:</strong> ${userMessage}</div>
        <div style="font-size: 0.75em; color: gray;">${timeString}</div>
      </div>
    </div>
  `;

  // Show loading bubble
  chatBox.innerHTML += `
    <div id="loading" style="margin-top: 0.5em; display: flex; justify-content: flex-start;">
      <div style="max-width: 70%; background-color: #F1F0F0; padding: 10px 15px; border-radius: 15px; text-align: left;">
        <strong>GitaBot:</strong> <em>Typing...</em>
      </div>
    </div>
  `;

  try {
    const start = performance.now();

    const response = await fetch('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await response.json();
    const botReply = data.result || "Sorry, I didn't understand that.";

    document.getElementById('loading').remove();

    // Add bot's reply as a bubble with timestamp
    const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    chatBox.innerHTML += `
      <div style="margin-top: 0.5em; display: flex; justify-content: flex-start;">
        <div style="max-width: 70%; background-color: #F1F0F0; padding: 10px 15px; border-radius: 15px; text-align: left;">
          <div><strong>GitaBot:</strong> ${botReply}</div>
          <div style="font-size: 0.75em; color: gray;">${replyTime}</div>
        </div>
      </div>
    `;

    const end = performance.now();
    console.log(`Response took ${(end - start).toFixed(0)} ms`);

    document.getElementById('userInput').value = '';
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('loading').innerHTML = `
      <div style="max-width: 70%; background-color: #F1F0F0; padding: 10px 15px; border-radius: 15px;">
        <strong>GitaBot:</strong> Error retrieving response.
      </div>
    `;
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}
