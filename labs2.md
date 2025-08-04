# Creating GitHub Copilot Extensions
## Extend Copilot with your own apps
## Workshop labs 
## Revision 1.01 - 08/04/25

**Lab 1: Exploring and Installing Marketplace Extensions**

**Purpose: Learn to discover, install, and use publicly available GitHub Copilot extensions from the GitHub Marketplace.**

### Steps:
1. Open your browser and navigate to [GitHub Marketplace](https://github.com/marketplace)
   
2. In the left sidebar, click on "Copilot" to filter for Copilot extensions
   
3. Browse the available extensions and select the "Models (GitHub)" extension (this is free and requires no additional signup)

![GitHub models extension](./images/ext15.png?raw=true "Copilot models extension")
   
5. Click on the extension to view its details page

![GitHub models details](./images/ext16.png?raw=true "Copilot models details")

6. Click the "Add" button to install the extension and then select the "Install it for free" button on the selected account.

![GitHub models add](./images/ext17.png?raw=true "Copilot models add")

7. Click through any confirmation dialogs for install.

![GitHub models add](./images/ext18.png?raw=true "Copilot models add")

8. Afterwards, you should see a screen that tells you the extension was installed for your account.

![GitHub models installed](./images/ext19.png?raw=true "Copilot models installed")

9. To see the extension in action, go to https://github.com/copilot in your browser. (Make sure this is in the browser where you are logged in to GitHub with the same GitHub userid as you used in the previous steps.) Then, in the chat area, you can enter a prompt for the new extension, such as the one below.

```
@models What models are available?
```

![Copilot models prompt](./images/ext20.png?raw=true "Copilot models prompt")

10. If prompted, click on "Connect" to connect your account with Models. Then proceed through any other authorization screens.

![Connect](./images/ext21.png?raw=true "Connect")

![Authorize user](./images/ext22.png?raw=true "Authorize user")

![Permissions](./images/ext23.png?raw=true "Permissions")
   
11. After the authorization steps are completed, you should be able to return to Copilot in the browser and see the results of your query.

![Extension output](./images/ext24.png?raw=true "Extension output")
   

<p align="center">
**[END OF LAB]**
</p>
</br></br></br>


## Lab 2: Creating Your First Agent-Based Extension

**Purpose**: Build a custom Copilot extension using the agent architecture to generate development meta-files like .gitignore and LICENSE files.

### Steps:
1. Open a GitHub Codespace and clone the repository: `git clone https://github.com/techupskills/learning-github-copilot.git`
2. Navigate to the chapter 10 directory: `cd learning-github-copilot/chapter10/agent-extension`
3. Compare the complete and partial implementations: `code -d complete/index.js partial/index.js`
4. Study the differences, particularly the prompt engineering sections and the Express.js setup
5. Copy the missing code from `complete/index.js` to `partial/index.js`, focusing on the system message prompts
6. Install dependencies: `npm install`
7. Start the server: `npm start`
8. In the Codespace, go to the Ports tab and make port 3000 public
9. Click to open/visit port 3000
10. Give permission to access someone else's codespace
11. Should see message in browser "Welcome to the Metafiles GitHub Copilot Extension"

---

## Lab 3: Configuring the GitHub App for Your Agent Extension

**Purpose**: Learn to create and configure a GitHub App to bridge your agent extension with Copilot Chat.

### Steps:
1. Navigate to [GitHub Developer Settings](https://github.com/settings/apps/new) while logged into GitHub
2. Fill in the GitHub App form:
   - **App Name**: `meta-files-generator` (must be unique)
   - **Homepage URL**: Your codespace repository URL
   - **Callback URL**: Your public codespace URL + `/callback`
3. Disable webhooks and set app visibility to "Only on this account"
4. Click "Create GitHub App"
5. Generate and download a private key when prompted
6. Navigate to "Permissions & Events" on left, select "Account permissions" and grant "Copilot Chat: Read" permissions
7. Go to the "Copilot" settings page, Accept Terms, and change app type from "Disabled" to "Agent"
8. Add your public codespace URL in the URL field under Agent Definition
9. Add an inference description: "Generates .gitignore, .gitattributes, and LICENSE files for programming projects"
10. Click on "Install App" on left and install the app on your account and test it in Copilot Chat with: `@meta-files-generator Python`

---

## Lab 4: Building a Skillset-Based Extension

**Purpose**: Create a simpler Copilot extension using the skillset architecture to query Go language version information.

### Steps:
1. Navigate to the skillset extension directory: `cd ../gover-ext`
2. Compare implementations: `code -d complete/main.go partial/main.go`
3. Notice the HTTP handler functions and API integration patterns
4. Copy the missing handler implementations from complete to partial, focusing on the JSON parsing logic
5. Build the Go application: `go build -o gover-ext main.go`
6. Start the server: `./gover-ext`
7. Make port 8080 public in your Codespace ports tab
8. Open in browser and test by going to <your-url>/latest-version-go

## Lab 5: Configuring GitHub App for your Skillset Extension
1. Navigate to [GitHub Developer Settings](https://github.com/settings/apps/new) while logged into GitHub
2. Fill in the GitHub App form:
   - **App Name**: `gover` (must be unique)
   - **Homepage URL**: Your codespace repository URL
   - **Callback URL**: Your public codespace URL + `/callback`
3. Disable webhooks and set app visibility to "Only on this account"
4. Click "Create GitHub App"
5. Generate and download a private key when prompted
6. Navigate to "Permissions & Events" on left, select "Account permissions" and grant "Copilot Chat: Read" permissions
7. Go to the "Copilot" settings page, Accept Terms, and change app type from "Disabled" to "Skillset"
8. Scroll down to "Skill definitions" section and click on "Add new skill".
9.   - **Skill 1**: Name: "Latest-Go-Version", URL: `<your-url>/latest-version-go`, Description: "Get the latest version of Go"
10. Add new skill - - **Skill 2**: Name: "Supported-Versions", URL: `<your-url>/supported-versions-go`, Description: "Get currently supported Go versions"
11. Add new skill -     - **Skill 3**: Name: "Version-Support", URL: `<your-url>/is-supported-or-eol`, Description: "Check if a Go version is supported or EOL"
12. Click on "Install App" on left and install the app on your account and test it in Copilot Chat with: `@meta-files-generator Python`
13. Test each skill: `@go-versions latest`, `@go-versions supported versions`, `@go-versions 1.21`
14. Compare the simplicity of skillsets vs agents for API-based functionality

---

## Lab 5: Creating a VS Code Extension for Copilot

**Purpose**: Develop a VS Code-specific Copilot extension that creates a chat participant for finding and documenting APIs.

### Steps:
1. Navigate to the VS Code extension directory: `cd ../vscode-extension`
2. Compare the TypeScript implementations: `code -d complete/src/extension.ts partial/src/extension.ts`
3. Examine the differences in VS Code API usage, chat participant creation, and prompt handling
4. Copy the missing code sections, particularly the chat handler logic and participant registration
5. Install the extension dependencies: `npm install`
6. Compile the TypeScript code: `npm run compile`
7. Open the VS Code Command Palette (Ctrl+Shift+P) and run "Developer: Reload Window"
8. Press F5 to launch a new VS Code window with your extension loaded (must have .vscode/launch.json)
9. In the new window, open Copilot Chat and test your participant: `@apifinder weather APIs`
10. Try the examples command: `@apifinder /examples payment processing Go`

---

## Summary

These labs have guided you through the complete spectrum of GitHub Copilot extensions:

- **Lab 1**: Installing and using marketplace extensions
- **Lab 2**: Creating agent-based extensions for complex interactions
- **Lab 3**: Configuring GitHub Apps for extension deployment
- **Lab 4**: Building skillset-based extensions for simple API calls
- **Lab 5**: Developing VS Code-specific extensions with rich IDE integration

Each approach has its own strengths: agents for complex logic, skillsets for simple API calls, and VS Code extensions for deep IDE integration. Choose the architecture that best fits your specific use case and complexity requirements.
