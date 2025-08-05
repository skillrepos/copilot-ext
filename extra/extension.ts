import * as vscode from 'vscode';

// This is the base prompt used to instruct the language model to act as an API finder.
// It tells the model to find and document the top 3 APIs matching the user's prompt,
// including basic documentation, usage, parameters, and sources.
const BASE_PROMPT = 'You are a helpful API finder. Your job is to locate and provide documentation on the top 3 APIs that match the prompt. Respond with basic documentation about the API, how to call it, and its parameters. Cite your sources and provide links to more information where appropriate.  Use bullet points in explanations wherever possible. If the user asks a question that is not relevant to APIs, politely decline to respond.';

// This prompt is used when the user requests example code for APIs.
// It instructs the model to provide short, relevant code samples for the top 3 matching APIs.
const SAMPLE_CODE_PROMPT = 'You are a helpful source of API examples. Your job is to locate the top 3 APIs that match the prompt and provide simple example code for how to call them. Keep the code as short as possible to still provide a usable, relevant example. If the user asks a question that is not relevant to APIs, politely decline to respond.';

// This function is called when the extension is activated.
// It registers the chat participant and sets up the chat handler logic.
export function activate(context: vscode.ExtensionContext) {

	// Define the chat handler function, which processes chat requests from the user.
	const handler: vscode.ChatRequestHandler = async (
		request: vscode.ChatRequest,           // The incoming chat request from the user.
		context: vscode.ChatContext,           // The chat context, including history.
		stream: vscode.ChatResponseStream,     // The stream to send responses back to the user.
		token: vscode.CancellationToken        // Token to signal cancellation.
	) => {

		// Start with the base prompt.
		let prompt = BASE_PROMPT;

		// If the user issued the 'examples' command, switch to the sample code prompt.
		if (request.command === 'examples') {
			prompt = SAMPLE_CODE_PROMPT;
		}

		// Initialize the messages array with the system/user prompt as the first message.
		const messages = [
			vscode.LanguageModelChatMessage.User(prompt),
		];

		// Retrieve all previous messages from the chat history that are responses from the assistant.
		const previousMessages = context.history.filter(
			(h) => h instanceof vscode.ChatResponseTurn
		);

		// For each previous assistant message, reconstruct the full message text and add it to the messages array.
		previousMessages.forEach((m) => {
			let fullMessage = '';
			m.response.forEach((r) => {
				const mdPart = r as vscode.ChatResponseMarkdownPart;
				fullMessage += mdPart.value.value;
			});
			messages.push(vscode.LanguageModelChatMessage.Assistant(fullMessage));
		});

		// Add the current user's prompt as the last message in the messages array.
		messages.push(vscode.LanguageModelChatMessage.User(request.prompt));

		// Send the constructed messages to the language model and await its response.
		const chatResponse = await request.model.sendRequest(messages, {}, token);

		// Stream the response fragments back to the user as markdown.
		for await (const fragment of chatResponse.text) {
			stream.markdown(fragment);
		}

		return; // End of handler.
	};

	// Register the chat participant with a unique ID and the handler function.
	const apifinder = vscode.chat.createChatParticipant("chat-tutorial.api-finder", handler);

	// Set the icon for the chat participant using a local image file.
	apifinder.iconPath = vscode.Uri.joinPath(context.extensionUri, 'apifinder.jpeg');
}

// This function is called when the extension is deactivated.
// It is currently empty but can be used for cleanup if needed.
export function deactivate() { }
