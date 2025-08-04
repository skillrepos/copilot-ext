// Import the Octokit library for interacting with the GitHub API
import { Octokit } from "@octokit/core";
// Import Express, a minimal web framework for Node.js
import express from "express";
// Import Readable from the Node.js stream module to handle streaming responses
import { Readable } from "node:stream";

// Create an instance of an Express application
const app = express()

// Define a GET endpoint at the root path ("/")
// When accessed, it sends a welcome message as the response
app.get("/", (req, res) => {
  res.send("Welcome to the Metafiles GitHub Copilot Extension!")
});

// Define a POST endpoint at the root path ("/")
// This endpoint expects a JSON payload and processes it asynchronously
app.post("/", express.json(), async (req, res) => {
  // Retrieve the GitHub API token from the custom request header "X-GitHub-Token"
  const tokenForUser = req.get("X-GitHub-Token");

  // Create a new Octokit instance authenticated with the user's token
  const octokit = new Octokit({ auth: tokenForUser });

  // Fetch the authenticated user's information from GitHub
  const user = await octokit.request("GET /user");
  // Log the user data to the console for debugging purposes
  console.log("User:", user.data);

  // (Unused) Define the GitHub API URL for fetching user info (not used below)
  const apiUrl = 'https://api.github.com/user';

  // Parse the JSON payload from the request body
  const payload = req.body;
  // Log the payload to the console for debugging
  console.log("Payload:", payload);

  // Extract the 'messages' array from the payload
  const messages = payload.messages;

  // Insert a system message at the beginning of the messages array
  // This message instructs the LLM to look for programming language names
  // and generate example .gitignore and .gitattributes files if found
  messages.unshift({
    role: "system",
    content: "Search for a programming language name in the message from the user. If you find one, generate example .gitignore and .gitattributes files for that programming language",
  });

  // Insert another system message at the beginning of the messages array
  // This message instructs the LLM to look for open source license names/types/abbreviations,
  // provide key bullet points about the license, and generate an example LICENSE file.
  // It also specifies how to replace placeholders like [NAME] and [YEAR] in the LICENSE file.
  messages.unshift({
    role: "system",
    content: "Search for an open source software license name, type, or abbreviation in the message from the user. If you find one, do the following: Provide a few key bullet points about the license and when it should/should not be used. Then generate an example LICENSE file for that license. If the example file contains the text [NAME] or [YOUR NAME], replace that text with " + user.data.name + ". If the LICENSE file contains the text [YEAR], replace [YEAR] with the current year.",
  });

  // Send a POST request to the GitHub Copilot LLM API to generate a response
  // The request includes the modified messages array and requests a streamed response
  const copilotLLMResponse = await fetch(
    "https://api.githubcopilot.com/chat/completions",
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${tokenForUser}`, // Pass the user's GitHub token for authentication
        "content-type": "application/json",      // Specify JSON content type
      },
      body: JSON.stringify({
        messages,   // The array of messages (including system instructions)
        stream: true, // Request a streamed response
      }),
    }
  );

  // Stream the LLM's response directly back to the client
  // This allows the client to receive the response as it is generated
  Readable.from(copilotLLMResponse.body).pipe(res);
})

// Determine the port to listen on (from environment variable or default to 3000)
const port = Number(process.env.PORT || '3000')

// Start the Express server and log a message indicating the port
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});
