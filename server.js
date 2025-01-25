const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Webhook endpoint
app.post("/webhook", (req, res) => {
    const intentName = req.body.queryResult.intent.displayName; // Get the intent name
    const userInput = req.body.queryResult.queryText; // Get the user's input

    let responseText = "Hello! How can I assist you?"; // Default response

    // Handle specific greetings
    if (intentName === "GreetingIntent") {
        if (userInput.toLowerCase().includes("morning")) {
            responseText = "Good morning! How can I assist you today?";
        } else if (userInput.toLowerCase().includes("afternoon")) {
            responseText = "Good afternoon! How can I make your day better?";
        } else if (userInput.toLowerCase().includes("evening")) {
            responseText = "Good evening! What can I do for you today?";
        }
    }

    // Send the response back to Dialogflow
    res.json({
        fulfillmentText: responseText,
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
