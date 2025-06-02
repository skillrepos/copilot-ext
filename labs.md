# Incorporating AI into your SDLC
## Leveraging AI tooling across the phases of your software development lifecycle
## Session labs 
## Revision 1.0 - 06/01/25

**Versions of dialogs, buttons, etc. shown in screenshots may differ from current version of Copilot**

**Follow the startup instructions in the README.md file IF NOT ALREADY DONE!**

**NOTES:**
1. We will be working in the public GitHub.com, not a private instance.
2. Chrome may work better than Firefox for some tasks.
3. Substitute the appropriate key combinations for your operating system where needed.
4. The default environment will be a GitHub Codespace (with Copilot already installed). If you prefer to use your own IDE, you are responsible for installing Copilot in it. Some things in the lab may be different if you use your own environment.
5. To copy and paste in the codespace, you may need to use keyboard commands - CTRL-C and CTRL-V.**
6. VPNs may interfere with the ability to run the codespace. It is recommended to not use a VPN if you run into problems.
7. If you use the new free Copilot plan (no signup), some advanced functionality may not be available.
</br></br></br>

**Lab 1 - Using AI in Planning**

**Purpose: In this lab, we’ll see some ideas of how we can use AI in the Planning phase**

1. For our labs in this workshop, we have a set of code that implements a simple to-do app written in Python with a toolkit called *Flask*.
   The files for this app are in a subdirectory named *app*.  Change into that directory in the terminal and take a look at the app's files.
   To view the files, you can either click on them in the file list on the left or you can open them with the *code* commands below. But make sure to switch into the *app* directory.) 

```
cd app
code app.py
code auth.py
code datastore.py
```

![Viewing app files](./images/sdlc2.png?raw=true "Viewing app files")

2. Let's see how we can create a standalone index for the code that the AI can leverage to get more details. In the *extra* directory in the project are a set of python tools for this. Run the command below to create a standalone index using ChromaDB for our code. (If you want to understand more about how these work, you can look at the actual code in the Python files in *extra*).
   
```
python ../extra/index_code.py
```

3. This created an index that is persisted in a *ChromaDB* database. Now we can run a simple search tool that will take whatever prompt/query we enter and return the primary match that it finds in the index of our codebase. Run the first command below. Then you can enter prompts like the next two lines. Type "exit" to quit.

```
python ../extra/search.py
Where does the code use authentication?
Is there already a module that implements our data store?
```

![Searching vector DB](./images/sdlc3.png?raw=true "Searching vector DB")

4. What you are seeing here is just the hits from searching the vector database that we created. To make this more useful, we would get these hits to an LLM by adding to the prompt to give it more specific context. We can see the end results of that by letting Copilot index our code in the codespace environment. Click on the Copilot icon at the bottom. If you see a blue button to Setup Copilot, go ahead and click on that. Then check the two checkboxes for "Code Completions (all files)" and "Code Completions (Python)".  After a few moments, if you click the icon again, you should see a line at the top of that dialog that says "Locally indexed". (There will also be a link next to it that says "Build remote index". That can be used to build an index on the GitHub side. We don't need to do that right now.)

![Copilot locally indexed](./images/sdlc4.png?raw=true "Copilot locally indexed")

5. With the local index in place, let's see how Copilot responds to a generic request. Go to the Copilot Chat interface (on the right) and type in the prompt below. (Note we are using the chat variable **#codebase** to tell Copilot to look at the complete set of code in our app.) 

```
Where in this #codebase do we enforce authentication?
```

7. Note that the answers that come back have the information, but are also more conversational in their response. (The answer may vary in format and text depending on several factors.)

![Copilot response to authentication](./images/sdlc5.png?raw=true "Copilot response to authentication")

8. We can also try our other example. Enter the prompt below. After running, you should see something like the screenshot below.
```
Is there a module in our #codebase that handles data storage?
```

![Copilot response to datastore](./images/sdlc6.png?raw=true "Copilot response to datastore")

9. Let's try one more query here. To demonstrate further how AI can help with planning, prompt Copilot with the prompt below (JWT = JSON Web Token):

```
What would it take to change #codebase to use JWT for authentication?
```

10. After this runs, you should see an answer in the chat screen similar to what's shown in the screenshot below. Notice that it includes not only text explanations, but also the changed code.

![Copilot response to JWT](./images/sdlc7.png?raw=true "Copilot response to JWT")


12. Finally, let's run our app and see it in action. To start it, run the command below in the terminal.

```
python app.py
```
10. Now add a second terminal via ...

11. You can try the various curl commands below to see the functionality. You can copy and paste each item separately.

```
# 1) Create an item:
curl -i \
  -H "Authorization: Bearer secret-token" \
  -H "Content-Type: application/json" \
  -d '{"name":"Buy milk"}' \
  http://127.0.0.1:5000/items

# 2) List items:
curl -i \
  -H "Authorization: Bearer secret-token" \
  http://127.0.0.1:5000/items


# 3) Update an item:
curl -i \
  -X PATCH \
  -H "Authorization: Bearer secret-token" \
  -H "Content-Type: application/json" \
  -d '{"name":"Buy almond milk"}' \
  http://127.0.0.1:5000/items/1

# 4) Delete an item:
curl -i \
  -X DELETE \
  -H "Authorization: Bearer secret-token" \
  http://127.0.0.1:5000/items/1

 <p align="center">
**[END OF LAB]**
</p>
</br></br></br>
Lab 2: Using AI during the development phase
Purpose: In this lab, we'll see how to use an AI assistant to help implement a feature request to our codebase.

1. Our code is missing a *search* feature currently. Try the following command in the terminal.

```
# Search items:
curl -i \
  -H "Authorization: Bearer secret-token" \
  http://127.0.0.1:5000/items/search?q=milk
```

2. Notice that we get a 500 response indicating that the function cannot be completed.

3. In our repository, we already have a GitHub Issue for this feature. Take a look at it by clicking on this link:  <add link for GitHub Issue #1>

4. In order to use this information as context for the AI, we'll add the text of the issue to the AI's prompt context. First, we need to get the text from the issue.
We have a script for this in our project. Run the command below to do this. (The "1" is the number of the GitHub Issue.)

```
./get-issue-info.sh 1
```

5. The output of running this file should be a new file in your project named FIX_ISSUE_1.md. You can click on it and open it up to view the contents.

6. In Copilot's Chat interface, change the mode to "Agent" by clicking on the drop-down labeled "Ask" at the bottom.

7. We now want to add this file as context for our prompt in the Chat panel. If you already have it open, then it may show up as the current context in the chat interface.
If not, you can click on the "Add context" item in the prompt area and select it from the list that pops up. (You may have to scroll down to find it.)

8. With the FIX_ISSUE_1.md file attached as context, enter the following prompt in the chat area and then submit it.

```
Here's the full text of GitHub Issue #1. Propose a diff to our Python codebase (implementation only) that implements the requested feature."
```

9. After Copilot processes the prompt, it should show two files changed - *app.py* and *datastore.py*.  Take a look at the diffs. When you are satisfied with
the proposed changes, click on the *Keep* button in the *Files changed* dialog.

10. Now, let's try the *search* operation again. In the terminal where you started the app running in Lab 1, kill the process (CTRL+C). Then run the app again.

```
python app.py
```

11. You can try the search operation with the same curl command as before. This time, it should run to completion (indicating whether or not the item you are
searching for is found in the list).

```
# Search items:
curl -i \
  -H "Authorization: Bearer secret-token" \
  http://127.0.0.1:5000/items/search?q=milk
```
 <p align="center">
**[END OF LAB]**
</p>
</br></br></br>

Lab 3: Fixing bugs with AI
Purpose: In this lab, we'll see how to fix bugs with AI.

1. Let's see what happens if we try to delete a non-existent item in our list. Run the command below.

```
# Delete an item:
curl -i \
  -X DELETE \
  -H "Authorization: Bearer secret-token" \
  http://127.0.0.1:5000/items/4
```

2. Notice that the attempt returns a 500 return code indicating *server error*. We'd rather have it return a 404 error indicating *Not found*.

3. So we have more control over changes, switch Copilot back to "Ask mode" by clicking on the drop-down at the bottom of the chat input dialog.

4. Now, let's let Copilot have a try at fixing this. Enter and submit the following prompt.

```
Fix the delete endpoint so that deleting a missing item returns 404 JSON {error: 'Not found'} instead of a server error.
```

5. After Copilot processes this, you should see some changed files again. Before we review them, let's add Copilot as a reviewer to have it take a look. Go to the first diff and right-click and select the menu item "Copilot" -> "Review and comment".

6. Copilot should review the proposed changes and offer any suggestions. If it does have suggestions, you can choose to Accept/Keep or Discard/Undo them. Repeat this same process to have Copilot review all changes and Accept/Keep or Discard/Undo each one.

7. Once you are satisfied with the set of changes and reviews, go ahead and click the Accept/Keep button for all the changes

8. Now, you can repeat step #1 and hopefully you'll see a 404 error instead of a 500 one.


 <p align="center">
**[END OF LAB]**
</p>
</br></br></br>
Lab 4: Testing
Purpose: In this lab, we'll see how to use AI to generate tests for our code.

1. For this lab, we'll utilize Copilot's Agent functionality again. To make sure we aren't carry over any of the previous chat conversation, start a new chat by clicking on the "+" sign in the upper right.

2. Switch chat to "Agent mode" by clicking the drop-down next to Ask in the bottom of the text entry area.

3. We want Copilot to generate unit tests for our datastore code and integration tests for each of our endpoints. Enter the prompt below into chat.

```
Write pytest unit tests for DataStore (all CRUD + search) and Flask integration tests for each endpoint (including auth failure).
```

4. As this runs, if you encounter points where Copilot wants to run commands in the terminal and offers a "Continue" button, go ahead and accept that. If it simply notes commands and stops, go ahead and copy and paste those into the terminal and run them.


5. You should now see test files for app integration tests and unit tests for the datastore pieces. Make sure to save your testing files.

6. If you have any failing tests, you can try adding a prompt of "Tests do not run cleanly" and submit that to Copilot. Again, accept any attempts to run things in the terminal.

7. Now, let's see how else AI can help us with testing by entering a prompt (in the Chat panel and still in "Agent" mode) asking what else to test. Y

```
What else should we test? 
```

8. Copilot should suggest some other test cases and then ask if it should add them. You can tell it to add the most important ones with a prompt like the one below.

```
Yes, but just add the most important ones.
```

9. After this, it may also suggest a command in the terminal to run to verify the tests. If so, click on Continue.

10. If the command fails, it should suggest a fix. If so, you can accept that and then complete the cycle. Save files with any changes.

11. (Optional) If you have time and want, you can prompt the AI with other prompts for other testing, such as the following:

```
What edge cases should I test?
How do I test for performance?
How do I test for security?
```

 <p align="center">
**[END OF LAB]**
</p>
</br></br></br>

Lab 5: Refactoring
Purpose: In this lab, we'll see how to use the AI to refactor our code, breaking out some common functionality.

1. Look at the code in the app.py file and notice that we have duplicate error-handling code for the *update_item* and *delete_item* call.

2. Let's get Copilot to refactor the duplicate code into its own routine. Enter the prompt below:

```
Refactor app.py to remove duplicate error handling in update_item and delete_item by introducing a get_or_404 helper.
```

3. After this runs, you'll have suggested changes to the code.  Add Copilot as a reviewer again and see what it says.

4. Now review the suggested changes and Copilot's review and decide what to keep or not.

5. Now, let's look at another feature that Copilot can do to help with refactoring, called Copilot Edits. Switch the chat mode to "Edits" from "Agent" by clicking on the drop-down at the bottom of the chat dialog.

6. Now let's add our *datastore.py* and *app.py* files as context. Select the *Attach context* item and select those two files.

7. Let's add logging to our functions. In the prompt area, add the prompt "Add logging for all endpoints". When ready, click Submit.

8. Review the changes and Accept/Keep them if they look good.

9. Now you can stop the running instance of the app and start another one.

10. Now, you can try some of the same curl operations as you used previously and see if the results are logged.

 <p align="center">
**[END OF LAB]**
</p>
</br></br></br>

Lab 6: Documentation

Purpose: In this lab, we'll see how to use AI to quickly and easily create different kinds of documentation for our project.

1. Let's start out by telling our AI to generate basic doc. In the inline chat, enter the following shortcut command:

```
/doc
```

2. Notice after this, that only the function/method headers have comments.


3. To get comments in the body of the code, we need to further prompt the AI. Let's tell Copilot to verbosely comment the code. Enter the prompt below in Copilot.

```
Verbosely comment all code so it is easy to follow and understand
```

4. In the main chat window, switch the mode back to "Ask". Also, open a new chat window using the "+" control again in the top right.

5. Now, in the main chat window, enter the prompt below:

```
Generate Sphinx-style .rst API documentation for this Flask service
```

6. Review the documentation generated in the Chat. Let's save this. Highlight the output and then copy and save the output as a .md file.

7. Let's try another example. Let's have the AI generate functional documentation that we can share with others. Use the prompt below for this:

```
Generate functional documentation for all API endpoints
```
8. Take a look at the output and save it if you want.

 <p align="center">
**[END OF LAB]**
</p>
</br></br></br>

Lab 7: Onboarding/Explaining code

Purpose: To show how AI can be used to explain code and also help with onboarding those new to a codebase.

1. Switch back to Agent mode for this lab. (If you do it in Ask mode, it will try to answer for all the different types of files in the project, rather than just the "app" code.

2. Let's start out having Copilot explain the code to us. Enter the prompt below in one of the chat interfaces.
```
Explain in simple terms how this code works
```

3. Someone just starting out with this code would need to also know how to run it, so let's have the AI explain how to do that as well.
```
Provide examples of how to run this code
```

4. Let's also use the AI to try and anticipate any potential issues new users may run into. Here's a prompt for that.
```
What are the most likely problems someone new to this codebase would run into. Explain the issue clearly and succinctly.
```

5. Let's take this a step further and have the AI create a general guide for new users to the code. You can use the prompt below:
```
Create an onboarding guide for anyone brand new to this code who will be working with it or maintaining it.
```

6. Finally, let's have the AI generate some basic Q&A to check understanding and learning for someone looking at the code. Try this prompt:
```
Construct 10 questions to check understanding of how the code works. Then prompt the user on each question and check the answer. If the answer is correct, provide positive feedback. If the answer is not correct, explain why and provide the correct answer.
```

 <p align="center">
**[END OF LAB]**
</p>
</br></br></br>

**THE END**
