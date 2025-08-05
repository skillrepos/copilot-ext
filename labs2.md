# Creating GitHub Copilot Extensions
## Extend Copilot with your own apps
## Workshop labs 
## Revision 1.02 - 08/04/25

## Lab 1: Exploring and Installing Marketplace Extensions

**Purpose**: Learn to discover, install, and use publicly available GitHub Copilot extensions from the GitHub Marketplace.

### Steps:
1. Open your browser and navigate to [GitHub Marketplace](https://github.com/marketplace)
   
2. In the left sidebar, click on "Copilot" to filter for Copilot extensions
   
3. Browse the available extensions and select the "Models (GitHub)" extension (this is free and requires no additional signup)

![GitHub models extension](./images/ext15.png?raw=true "Copilot models extension")
<br><br>
  
4. Click on the extension to view its details page

![GitHub models details](./images/ext16.png?raw=true "Copilot models details")
<br><br>

5. Click the "Add" button to install the extension and then select the "Install it for free" button on the selected account.

![GitHub models add](./images/ext17.png?raw=true "Copilot models add")
<br><br>

6. Click through any confirmation dialogs for install.

![GitHub models add](./images/ext18.png?raw=true "Copilot models add")
<br><br>

7. Afterwards, you should see a screen that tells you the extension was installed for your account.

![GitHub models installed](./images/ext19.png?raw=true "Copilot models installed")
<br><br>

8. To see the extension in action, go to https://github.com/copilot in your browser. (Make sure this is in the browser where you are logged in to GitHub with the same GitHub userid as you used in the previous steps.) Then, in the chat area, you can enter a prompt for the new extension, such as the one below.

```
@models What models are available?
```
<br><br>
![Copilot models prompt](./images/ext20.png?raw=true "Copilot models prompt")
<br><br>

9. If prompted, click on "Connect" to connect your account with Models. Then proceed through any other authorization screens.

![Connect](./images/ext21.png?raw=true "Connect")
<br><br>
![Authorize user](./images/ext22.png?raw=true "Authorize user")
<br><br>
![Permissions](./images/ext23.png?raw=true "Permissions")
 <br><br>
 
10. After the authorization steps are completed, you should be able to return to Copilot in the browser and see the results of your query.

![Extension output](./images/ext24.png?raw=true "Extension output")

<br><br>

<p align="center">
**[END OF LAB]**
</p>
</br></br></br>


## Lab 2: Creating Your First Agent-Based Extension

**Purpose**: Build a custom Copilot extension using the agent architecture to generate development meta-files like .gitignore and LICENSE files.

### Steps:
1. Switch to the GitHub Codespace in your browser and, working in the TERMINAL, cd into the *genmeta-ext* subdirectory.

```
cd genmeta-ext
```

![cd](./images/ext25.png?raw=true "cd")
 <br><br>


2. To keep things simple and avoid challenges with typing in code, we'll be building out files in this workshop by using a *compare and merge* process. The idea is to show a side-by-side final and partial implementation. To open this view, run the command below in the TERMINAL. Afterwards you should see an image like the one in the screenshot in your codespace.

```
code -d ../extra/index.js index.js
```

![diff](./images/ext26.png?raw=true "diff")
<br><br>

3. For each section that is in the final version on the left but not yet in the local version (on the right), take a look at the contents and try to understand what is being done. When ready, hover over the middle bar and you should see an arrow show up. Click on this arrow to merge the change from the file version on the left to the version on the right. Repeat the process for the other differences.

![diff](./images/ext27.png?raw=true "diff")
<br><br>

4. When you are done merging all the changes in, the files should be identical. Click on the "x" in the tab at the top to close the diff view and save the changes.

![done](./images/ext28.png?raw=true "done")
<br><br>
   
5. Also, take a look at the *package.json* file to see how the app and operations are configured. No changes need to be made. 

```
code package.json
```

![package.json](./images/ext29.png?raw=true "package.json")
<br><br>

6. Now, we are ready to run the extension.  First in the TERMINAL, install the extensions and start the server with the commands below. After they run, you should see output indicating that the server is running on port 3000.

```
npm install
npm start
```
![starting server](./images/ext30.png?raw=true "starting server")
<br><br>

7. We need to make the port 3000 *public* before continuing. Switch to the *PORTS* tab in the codespace. Then locate the row for port 3000. Right-click on the row and select *"Port Visibility"* from the pop-up menu and then select *"Public"*.

![making port public](./images/ext31.png?raw=true "making port public")
<br><br>

8. In preparation for the next lab, while we are here in the *PORTS* tab, in the row for port 3000, right-click and select "Copy local address". Save the value you copy for use in the next lab.

![copying address](./images/ext42.png?raw=true "copying address")
<br><br>

9. Now you can open the page for the server process. Still in the *PORTS*, in the row for port 3000, hover over the *Forwarded Address* column. You should see several additional icons show up. Click on the one that looks like a sphere/globe to open the webpage.

![opening page](./images/ext32.png?raw=true "opening page")
<br><br>

10. At this point, you will probably encounter a page warning you about accessing a development port served by someone's codespace. Just go ahead and click the green *Continue* button.

![confirmation](./images/ext33.png?raw=true "confirmation")
<br><br>

11. Finally, you should see the welcome message from the server in the webpage. (In the next lab, we'll complete gettings things setup to use this as an extension.)

![confirmation](./images/ext34.png?raw=true "confirmation")
<br><br>
 

<p align="center">
**[END OF LAB]**
</p>
</br></br></br>


## Lab 3: Configuring the GitHub App for Your Agent Extension

**Purpose**: Learn to create and configure a GitHub App to bridge your agent extension with Copilot Chat.

### Steps:
1.  Navigate to [GitHub Developer Settings](https://github.com/settings/apps/new) while logged into GitHub. Authenticate as needed.
   
2. On that page, fill in the GitHub App form (for the last item, paste the local address you saved from lab 2 and add "/callback" at the end.
   - **App Name**: `metafiles-generator`
   - **Description**: `Metafiles Generator` (or whatever text you want)
   - **Homepage URL**: `https://github.com/skillsrepos/copilot-ext`
   - **Callback URL**: <local address with "/callback" on the end>
  
![app form part 1](./images/ext35.png?raw=true "app form part 1")
<br><br>

3. Scroll down on the page to the **Webhook** section and uncheck the *Active* box there.

![app form part 2](./images/ext36.png?raw=true "app form part 2")
<br><br>

4. Scroll down to the **Permissions** section. Under *Account permissions*, select *Copilot Chat* and select *Read-only*.

![app form part 3](./images/ext37.png?raw=true "app form part 3")
<br><br>

5. At the bottom of the page, click on *Create GitHub App*.

![app form part 4](./images/ext38.png?raw=true "app form part 4")
<br><br>

6. You'll now be on a page where it should say *"Registration successful. You must generate a private key in order to install your GitHub App."* in a yellow box at the top. Click on the link to "generate a private key" and then, on the next screen, click on the green button to "Generate a private key." After that you should see a screen where your private key has been added.

![app form part 5](./images/ext39.png?raw=true "app form part 5")
<br><br>

![app form part 6](./images/ext40.png?raw=true "app form part 6")
<br><br>

7. On the top left of that page, select "Copilot" from the menu on the left and change the *App Type* from "Disabled" to "Agent".

![app form part 7](./images/ext41.png?raw=true "app form part 7")
<br><br>

8. Scroll down to the **Agent Definition** section and paste the local address you saved from lab 2 into the *URL* field. (Just as-is - you don't need to add anything to it.)
    
9. In the *Inference description* field, add an inference description such as the one below and then click on the *"Save"* button. Afterwards, you should see a screen that says *"Your GitHub App's Agent configuration has been updated."*.

```
Generates .gitignore, .gitattributes, and LICENSE files for programming projects
```

![app form part 8](./images/ext43.png?raw=true "app form part 8")
<br><br>

10. Now we need to install the app. In the left top menu again, click on *"Install App"* and then click the green *Install* button on the next screen. Click "Install" again on the screen after that.

![app form part 9](./images/ext46.png?raw=true "app form part 9")
<br><br>

![app form part 10](./images/ext47.png?raw=true "app form part 10")
<br><br>

![app form part 11](./images/ext48.png?raw=true "app form part 11")
<br><br>

11. Make sure that your server is still running on port 3000 back in your codespace. If not, do the steps below again. If it is still running, you do not need to do these steps. Also double-check that port 3000 is still marked *public*.

```
cd genmeta-ext
npm start
```

12. Go to https://github.com/copilot and enter *@metafiles-generator* into the chat dialog. You will then be prompted to *Connect*. Click the green button and proceed through the dialog(s).

![app form part 9](./images/ext44.png?raw=true "app form part 9")
<br><br>

13. You're now ready to try using the new extension.  Go to https://github.com/copilot again and, in the chat dialog, enter a prompt like the ones below to try the extension.

```
@metafiles-generator python
@metafiles-generator MIT
```

![prompt example 1](./images/ext49.png?raw=true "prompt example 1")
<br><br>

![prompt example 2](./images/ext50.png?raw=true "prompt example 2")
<br><br>

14. When you are done, you can stop the server running in the codespace with 'Ctrl+C'.

<p align="center">
**[END OF LAB]**
</p>
</br></br></br>


## Lab 4: Building a Skillset-Based Extension

**Purpose**: Create a simpler Copilot extension using the skillset architecture to query Go language version information.

### Steps:
1. Navigate to the skillset extension directory.

```
cd ../gover-ext
```

2. The code for this one is more straightforward. Take a look at the main.go file either by clicking to open it or using the command below. Notice that it basically dispatches the endpoints to separate handlers.

```
code main.go
```

3. Now you can look at the handlers, viewing the "latest version" one first. Notice that the code for it simply gets data from "https://go.dev/dl/?mode=json", checks for any errors and parses it for the response.

```
code handlers/latest_version.go
```

4. The code for the "supported versions" one does a similar process using results from "https://endoflife.date/api/go.json".

```
code handlers/supported_versions.go
```

5. Now we are ready to build the Go application. Run the command below in the *TERMINAL* from the *gover-ext* directory.

```
go build -o gover-ext main.go
```

6. When your build finishes, you should have an executable file named *gover-ext* in the current directory. Start the server by running this with the command below.

```
./gover-ext
```

![building and running server](./images/ext51.png?raw=true "building and running server")
<br><br>


7. As we did before, we need to make the port where the server is running public. Change to the *PORTS* tab, find the row for port 8080, right-click and select "Port Visibility" and then "Public".

![changing port visibility](./images/ext52.png?raw=true "changing port visibility")
<br><br>

8. Also, while we're on the *PORTS* tab, let's copy the codespace local address again to use in the next lab (where'll we setup the corresponding GitHub app). In list of ports, right-click and select "Copy Local Address". Save the resulting value also to use in the next step.

![Copying local address](./images/ext53.png?raw=true "copying local address")
<br><br>

9. Finally, let's verify that our server is working. Open a new tab, paste the copied address in for the URL and then add "/latest-version-go" onto the end of it. You will probably see a "warning" screen noting that you are about to access a development port served by someone's codespace.  Just click "Continue".

```
<copied local address>/latest-version-go
```

![Visiting endpoint](./images/ext54.png?raw=true "visiting endpoint")
<br><br>

10. At this point, you should see a response on the webpage showing the latest go version. If not, double-check that your server is still running in the codespace, the port is *public*, and that you have the correct URL.

![Visiting endpoint](./images/ext55.png?raw=true "visiting endpoint")
<br><br> 

<p align="center">
**[END OF LAB]**
</p>
</br></br></br>

## Lab 5: Configuring GitHub App for your Skillset Extension
**Purpose**: Learn to create and configure a GitHub App to bridge your agent extension with Copilot Chat.

1.  Navigate to [GitHub Developer Settings](https://github.com/settings/apps/new) while logged into GitHub. Authenticate as needed.
   
2. On that page, fill in the GitHub App form (for the last item, paste the local address you saved from lab 4 and add "/callback" at the end.
   - **App Name**: `go-ver`
   - **Description**: `Go Version Helper` (or whatever text you want)
   - **Homepage URL**: `https://github.com/skillsrepos/copilot-ext`
   - **Callback URL**: <local address with "/callback" on the end>
  
![app form part 1](./images/ext57.png?raw=true "app form part 1")
<br><br>

3. Scroll down on the page to the **Webhook** section and uncheck the *Active* box there.

![app form part 2](./images/ext36.png?raw=true "app form part 2")
<br><br>

4. Scroll down to the **Permissions** section. Under *Account permissions*, select *Copilot Chat* and select *Read-only*.

![app form part 3](./images/ext37.png?raw=true "app form part 3")
<br><br>

5. At the bottom of the page, click on *Create GitHub App*.

![app form part 4](./images/ext38.png?raw=true "app form part 4")
<br><br>

6. You'll now be on a page where it should say *"Registration successful. You must generate a private key in order to install your GitHub App."* in a yellow box at the top. Click on the link to "generate a private key" and then, on the next screen, click on the green button to "Generate a private key." After that you should see a screen where your private key has been added.

![app form part 5](./images/ext58.png?raw=true "app form part 5")
<br><br>

![app form part 6](./images/ext40.png?raw=true "app form part 6")
<br><br>

7. On the top left of that page, select "Copilot" from the menu on the left and change the *App Type* from "Disabled" to "Skillset".

![app form part 7](./images/ext59.png?raw=true "app form part 7")
<br><br>

8. Scroll down to the **Skill definitions** section and click the "Add new skill" button.

![app form part 8](./images/ext60.png?raw=true "app form part 8")
<br><br>

9. For the first skill, you can fill in the fields as follows:
   - **Name**: `Latest-Go-Version`
   - **Inference description**: `Get the lastest version of Go` 
   - **URL**: `<local address with "/latest-version-go" appended at end>`
  
   Then click "Add Definition".

![app form part 9](./images/ext61.png?raw=true "app form part 9")
<br><br>  

10. Now, we need to enter the other skillset definitions. Click on the "Add new skill" button.

![app form part 10](./images/ext62.png?raw=true "app form part 10")
<br><br>  


11. For the second skill, you can fill in the fields as follows:
   - **Name**: `Supported-Versions`
   - **Inference description**: `Get currently supported Go versions` 
   - **URL**: `<local address with "/supported-versions-go" appended at end>`
  
   Then click "Add Definition".

![app form part 11](./images/ext63.png?raw=true "app form part 11")
<br><br>  

12. Save your changes with the "Save" button at the bottom of the page. You should see a blue banner appear at the top of the page letting you know that your app's configuration has been updated.

![app form part 12](./images/ext64.png?raw=true "app form part 12")
<br><br>  

13. Now we need to install the app. In the left top menu again, click on *"Install App"* and then click the green *Install* button on the next screen. Click "Install" again on the screen after that. You should then see a banner indicating that it was installed for your account.

![app form part 13](./images/ext65.png?raw=true "app form part 13")
<br><br>

![app form part 14](./images/ext66.png?raw=true "app form part 14")
<br><br>

![app form part 15](./images/ext67.png?raw=true "app form part 15")
<br><br>

14. Make sure that your ./go-ver server is still running on port 8080 back in your codespace. If not, do the steps below again. If it is still running, you do not need to do these steps. Also double-check that port 8080 is still marked *public*.

```
cd gover-ext
./gover-ext
```

15. Go to https://github.com/copilot and enter *@go-ver* into the chat dialog. You will then be prompted to *Connect*. Click the green button and proceed through the dialog(s).

![app form part 16](./images/ext68.png?raw=true "app form part 16")
<br><br>

16. You're now ready to try using the new extension.  Go to https://github.com/copilot again and, in the chat dialog, enter a prompt like the ones below to try the extension.

```
@go-ver latest version
@go-ver supported versions
```

![prompt example 1](./images/ext49.png?raw=true "prompt example 1")
<br><br>

![prompt example 2](./images/ext50.png?raw=true "prompt example 2")
<br><br>

17. When you are done, you can stop the server running in the codespace with 'Ctrl+C'.

<p align="center">
**[END OF LAB]**
</p>
</br></br></br>


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
