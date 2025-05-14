import express from 'express';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name for the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());


// Define your API endpoint to handle user messages
app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;
  console.log('User Message:', userMessage); // Log user message

  const options = {
    method: 'POST',
    url: 'https://chatgpt-42.p.rapidapi.com/deepseekai',
    headers: {
      'x-rapidapi-key': 'f308760dc0msh6c9667f3cd31944p11e3e9jsn273b1a3058cf', // Replace with your RapidAPI key
      'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
      'Content-Type': 'application/json',
    },
    data: {
      messages: [
        {
          role: 'user',
          content: userMessage,
        },
      ],
      web_access: false,
    },
  };

  try {
    const response = await axios.request(options);
    console.log('API Response:', response.data); // Log API response
    res.json(response.data); // Send the response back to the frontend
  } catch (error) {
    console.error('Error from API:', error);
    res.status(500).send('Error from the API');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
