# Advanced features in GitHub Copilot 
## Hands-on Workshop for AI in Production
## Session labs 
## Revision 1.3 - 07/01/25

**Versions of dialogs, buttons, etc. shown in screenshots may differ from current version of Copilot**

**Follow the startup instructions in the README.md file IF NOT ALREADY DONE!**

**IMPORTANT NOTES:**
1. We will be working in the public GitHub.com, not a private instance.
2. You must have a public GitHub userid. (Can go to github.com/signup if needed.)
3. Chrome may work better than Firefox for some tasks.
4. Substitute the appropriate key combinations for your operating system where needed.
5. We will be using the free version of GitHub Copilot for some steps.
6. The default environment will be a GitHub Codespace (with Copilot already installed). If you prefer to use your own IDE, you are responsible for installing Copilot in it. Some things in the lab may be different if you use your own environment.
7. To copy and paste in the codespace, you may need to use keyboard commands - CTRL-C and CTRL-V.**
8. VPNs may interfere with the ability to run the codespace. It is recommended to not use a VPN if you run into problems.

</br></br></br>
**If you are opening a file and the cursor is in the file, make sure to switch back to (click in) the terminal before running commands!**

</br></br></br>

**Lab 1: Using Copilot For Onboarding, Explaining and Running Projects**

**Purpose: In this lab, we'll look at how to use Copilot to help quickly get up to speed on any project**

1. For our labs in this workshop, we have a set of code that implements a simple to-do app, written in Python with a toolkit called *Flask*. We interact with it via curl commands for simplicity. The files for this app are in a subdirectory named app. Change into that directory in the terminal.

```
cd app
```

![cd](./images/ac4.png?raw=true "cd")

2. If the Copilot Chat panel is not visible on the right side of the codespace, open it by clicking on the small Copilot icon at the top. We need to be in "Ask" mode, so if the chat panel comes up with either "Edit" or "Agent" mode, click on the dropdown at the bottom and select "Ask". (See screenshot.)

![open chat](./images/ac5.png?raw=true "open chat")

3. Since this is a new project to us, let's have Copilot produce some "onboarding" documentation for us. We'll use the #codebase chat variable to indicate it should do this against the contents of the current project. Enter the following prompt in the Copilot Chat dialog box and then submit it or hit *Enter*. (If you see a momentary flash about "Sign in to access Copilot", just wait till the dialog returns and enter the prompt again.)

```
Create an onboarding guide for #codebase. Do not create a separate block for it.
```
![Onboarding prompt](./images/ac11.png?raw=true "Onboarding prompt")

4. After Copilot completes its processing, you should the onboarding documentation displayed in the Chat output area. You can scroll through it to learn more about the project if you want. (You could also copy and paste the contents into a .md (markdown) file if you wanted to save it separately.)

![Viewing the onboarding guide](./images/ac12.png?raw=true "Viewing the onboarding guide")


5. Next, let's ask Copilot to explain how to demo the code. Enter the following prompt in the Chat dialog.

```
Tell me how you would most easily demo the #codebase.
```

![Asking how to demo](./images/ac13.png?raw=true "Asking how to demo")

6. In the Chat output, you'll see it reference a command to start the server and one to run an example usage script. Hover over the command to start the server. If you see a popup icon that looks like a terminal, click on that to insert it into the terminal. If you don't see a terminal icon when you hover over it, click on the "..." at the end of the popup and select "Insert into terminal".

![Enter command to start server](./images/ac14.png?raw=true "Enter command to start server")

7. In the terminal, hit Enter to actually start the server.

![Enter command to start server](./images/ac15.png?raw=true "Enter command to start server")

8. Because the running server is using this terminal, we need to open a second terminal to run the script. Do this by right-clicking in the terminal and select "Split Terminal".

![Split terminal](./images/ac16.png?raw=true "Split terminal") 

9. Back in the chat interface, find the output section with the command to run the usage script. Hover over that command and click the popup icon that looks like a terminal or use the "..." and "Insert into terminal" sequence to insert it into the terminal.

![Enter command to run script](./images/ac17.png?raw=true "Enter command to run script")


10. Hit *Enter* and you can see the script executing running commands against the server. If you want to look more at what the script is doing, you can [view use-app.sh](scripts/use-app.sh)

![Script output](./images/ac18.png?raw=true "Script output")


  

**Lab 2: Using Copilot's Agent Functionality to Implement a New Feature**

**Purpose: In this lab, we'll see how to use Copilot to automatically implement a feature request to our codebase.**

1. Our code is missing a *search* feature currently. Try the following command in the second terminal.

```
# Search items:
curl -i \
  -H "Authorization: Bearer secret-token" \
  http://127.0.0.1:5000/items/search?q=milk
```

2. Notice that we get a 404 response and a message indicating that the URL was not found on the server.

![404 response](./images/ac19.png?raw=true "404 response")

3. In our repository, we already have a GitHub Issue for this feature. Take a look at it by clicking on this link: [GitHub Issue #1](https://github.com/skillrepos/copilot-adv/issues/1)

![Open issue](./images/ac20.png?raw=true "Open issue")

4. Let's let Copilot's Agent mode have a shot at implementing the feature. Open a new chat by clicking on the large "+" symbol in the top row of the Chat interface. Then, in Copilot's Chat entry area, change the mode to "Agent" by clicking on the drop-down labeled "Ask" at the bottom.

![Start new chat](./images/ac23.png?raw=true "Start new chat")

![Switch to Agent mode](./images/ac21.png?raw=true "Switch to Agent mode")

5. Once in Agent mode, enter the following prompt in the chat area and then submit it.

```
Referencing the issue at https://github.com/skillrepos/copilot-adv/issues/1, propose a diff to our Python codebase that implements the requested feature. Do not create or add any tests.
```
![Context and prompt](./images/ac22.png?raw=true "Context and prompt")

6. After Copilot processes the prompt, it should show two files changed - *app.py* and *datastore.py* - in a box above the Chat text entry area. Click on the "+ -"  icon on the right of the "2 files changed" area in the dialog. (See figure below).  

![View all edits](./images/ac24.png?raw=true "View all edits")

7. Take a look at the diffs (#1 and #2 in screenshot). When you are satisfied with the proposed changes, click on the *Keep* button in the *Files changed* dialog (#3 in screenshot). Then you can close the tab that was opened to show the comparisons.(#4 in screenshot)

![Review edits](./images/ac25.png?raw=true "Review edits")


8. Now, let's try the *search* operation again. If your app was running when you made the changes in step 7, it should have automatically reloaded. If you see a message in its output of the sort "Detected change ... reloading", you should be good to go. But if you don't have that you can kill the process (CTRL+C) and then run the app again.

9. You can try the search operation with the same curl command as before. This time, it should run and return a 200 code rather than 404 since the search endpoint is implemented. If the item is found, it will return the found item. If not, it returns the empty set "[]".

```
# Search items:
curl -i \
  -H "Authorization: Bearer secret-token" \
  http://127.0.0.1:5000/items/search?q=milk
```

![Review edits](./images/ac26.png?raw=true "Review edits")

<p align="center">
**[END OF LAB]**
</p>
</br></br></br>


**Lab 3: Refactoring and Updating Code via Copilot Edits**

**Purpose: In this lab, we'll see how to use Copilot Edits functionality to refactor targeted sets of code, both for efficiency and improvements.**

1.  Open a new chat and change Copilot's mode to "Edit".

![Change to Edit](./images/sdlc75.png?raw=true "Change to Edit")

2. Now let's give the AI a targeted set of context to work with.  Add the 3 files (app/app.py, app/auth.py, and app/datastore.py) as context. You can do this in a couple of ways. You can drag and drop the files from the explorer file list on the left into the dialog area or you can use the "Add Context" button and select the files. (You may need to click on "Files and Folders" in the context picker dialog.) **If other files show up as context, you can click on them in the dialog and an "X" should show up to remove them. (Or you can close them if they're open in the current tab in the IDE.)**

![Selecting files for context](./images/sdlc76.png?raw=true "Selecting files for context")
![Add context](./images/sdlc45.png?raw=true "Add context")
   
3. Let's ask Copilot to refactor our selected files to be more efficient. Enter the prompt below and submit it.

```
Refactor the files to make them more efficient.
Add logging for all endpoints. 
```

![Refactor prompts](./images/ac27.png?raw=true "Refactor prompts")

4. After this runs, you will likely see output like the screenshot below. Copilot will analyze the targeted files and suggest changes for efficiency and to add logging.

![Change suggestions](./images/ac28.png?raw=true "Change suggestions")

5. You can go ahead and review the changes if you want, and then Keep or Undo. To do the final step (where we show the logging, you need to Keep those changes at least.) After making the changes, let's stash the current state of the commands below. (This will give us a fallback in case subsequent steps happen to change anything in a way that breaks something.)

```
git stash
```

6. Now, let's have Copilot review our current app code. Click on the *app.py* file and select all the code (either highlight it all or use CTRL+A). Then right-click and select *Copilot -> Review and Comment* from the menu.

![Having Copilot review](./images/ac29.png?raw=true "Having Copilot review")
   

7. After this runs, if Copilot has items worth noting, it will add them inline. You can scroll through the code to find the items that Copilot identified, along with any suggested changes.  If you want to apply the change you can select the "Apply and Go to Next" button. If you want to skip the change, you can click on the "Discard and Go to Next" button. If you look in the *COMMENTS* panel at the bottom (next to *TERMINAL*), you'll see all the comments listed. **If there are several, for the sake of time, it's suggested you pick just a couple to really inspect and discard the others**.

![Reviewing suggestions](./images/ac30.png?raw=true "Reviewing suggestions")


8. (Optional) To show that the logging works, you can use the script we used previously in the "scripts" directory named use-app.sh. Running it now should cause INFO messages to be output to stderr. (Don't forget to make sure the app is running first in a separate terminal via *python app.py* If you hit errors running the app, it's possible that some edits could have affected the app code. If you hit errors, you can ask Copilot to /fix the code or compare against the original app code at https://github.com/skillrepos/ai-sdlc/blob/main/app/app.py. Alternatively, you can do a "git stash pop" to get back to the code before review.)

```
../scripts/use-app.sh
```

![Logging events](./images/ac32.png?raw=true "Logging events")

 <p align="center">
**[END OF LAB]**
</p>
</br></br></br>

**Lab 4 - Extending Copilot's Utility via MCP Servers**

**Purpose: In this lab, we'll see how to connect GitHub Copilot to the GitHub MCP Server.**

1. For authentication to GitHub, we will need a GitHub personal access token (PAT). When logged into GitHub, click on the link below, provide a note and click the green "Generate token" button at the bottom.

Link:  Generate classic personal access token (repo & workflow scopes) https://github.com/settings/tokens/new?scopes=repo,workflow

![Creating token](./images/mcp10.png?raw=true "Creating token")
   
2. On the next screen, make sure to copy the generated token and save it for use later in the lab. You will not be able to see the actual token again!

![Copying token](./images/mcp11.png?raw=true "Copying token")

3. Switch to *Agent* mode in the Copilot Chat panel via the drop-down at the bottom.

![Switching to Agent mode](./images/mcp12.png?raw=true "Switching to Agent mode")

4. Now we need to add the GitHub MCP Server configuration in our IDE. You could fill most of this out via IDE prompts, but for simplicity, we already have a sample configuration file that we can just copy in. Run the commands below in the terminal. The last one will open the file in the editor.

```
cd /workspaces/copilot-adv
mkdir .vscode
cp extra/mcp.json  .vscode/mcp.json
open .vscode/mcp.json
```

5. Now, we can start the local MCP server. In the editor in the *mcp.json* file, above the name of the server, click on the small *Start* link (see figure below). A dialog will pop up for you to paste in your PAT. Paste the token in there and hit *Enter*. (Note that the token will be masked out.)

![Starting the server](./images/mcp23.png?raw=true "Starting the server")

After this, you should see the text above the server name change to "√Running | Stop | Restart | (*some number*) tools | More...".

![Starting the server](./images/mcp24.png?raw=true "Starting the server")

6. To see the tools that are available, in the Copilot Chat dialog, click on the small *tool* icon (see figure) and then scroll down to the *MCP Server: GitHub* section. You'll see the available tools we picked up under that.

![Starting the server](./images/ac33.png?raw=true "Starting the server")

7. Now that we have these tools available, we can use them in Copilot's Chat interface. (Again, you must be in *Agent* mode.) Here are some example prompts to try (note references in output to "> Ran <tool name> - GitHub (MCP Server)":

```
Find username for <your name> on GitHub
Show info on recent changes in skillrepos/copilot-adv on GitHub
```
</br></br>
![Example usage](./images/ac34.png?raw=true "Example usage")
 <p align="center">
**[END OF LAB]**
</p>
</br></br></br>

**THE END**
