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

2. Let's see how we can create a standalone index for the code. In the *extra* directory in the project are a set of python tools for this.
   Run the command below to create a standalone index using ChromaDB for our code. (If you want to understand more about how these work, you can look at the actual code in the Python files in *extra*).
   
```
python ../extra/index_code.py
```
3. This created an index that is persisted at <insert location>. Now we can run a simply search tool to find out more about our code. Run the commands below and note the top hits that are returned.

```
python ../extra/search.py "Where does the code use authentication"?
python ../extra/search.py "Is there already a module that implements our data store?"
```

4. After reviewing the results of the query, you can try out other queries if you want. What you are seeing here is just the hits from searching the vector
   database that we created. To make this more useful, we would feed these hits to an LLM by adding to the prompt to give it more specific context. We can see how that works out by
   letting Copilot in the codespace environment index our code. Click on the Copilot icon at the bottom and note that it does not say anything about an existing index.

<insert screenshot of clicking on Copilot icon and status pop-up>

5. Now, let's have Copilot generate its own *index* of the code we have open in the IDE. 

6. Let's see how Copilot responds to a generic request. Go to the Copilot Chat interface (on the right) and type in the prompt below.

```
@workspace Where in this codebase do we enforce authentication?
@workspace Is there already a module that implements our data store?
```

7. Note that the answers that come back have the information, but are also more conversational in their response.


8. If you click on the Copilot icon again at the bottom, you can see that the pop-up dialog now shows the repository is indexed.

9. Finally, let's run our app and see it in action. To start it, run the command below in the terminal.

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

Lab 4: Testing
Purpose: In this lab, we'll see how to use AI to generate tests for our code.



4. Hit return and notice the code that Copilot suggested. This is likely more generic than we want, but hit tab to select that line. (Note that you should give Copilot a second to provide code suggestions before moving on to the next line.)
   
5. After hitting tab, Copilot will generate another part of the function. (If not, you may need to hit return.) Hit tab to accept it. Continue until you get a complete function (or Copilot stops generating additional code suggestions). One example of what code may look like is below.

![Copilot generated function](./images/cpho5.png?raw=true "Copilot generated function")
   
6. This prompt is not specific enough for Copilot to interpret what we want to do.  Highlight the code and delete it, so we can try again.

7. Now type a comment at the top that says

```
// function to parse url
```
8. Hit enter and you will probably see a similar line to

```
function parseURL(url) {
```

9. Just hit Tab to accept it and Enter again. Copilot should continue to respond with another suggestion. *Only if you're not getting responses from Copilot, hit return and type the comment below to nudge Copilot.*

```
// parse url
```
![nudge comment](./images/cdd3.png?raw=true "nudge comment")   

10. Continue to iterate with Copilot suggesting lines and you hitting *Tab* to accept each line and then *Enter* until the function is complete. You may get some blank lines along the way or for some lines you might need to hit Tab twice to accept the code if it is indented more. But just hit return until you get to the end of a function. (You will be at the end when the indentation is done.  Also Copilot may start to suggest another function in comments like // test...)
 
11. Let's do one more pass at getting a specific prompt for Copilot. Delete all the code currently in index.js. This time we will not enter a comment, but will enter a specific function name.
Type the following in the empty file. (There are no parentheses after the *splitURLandReturnComponents* text.)  Do not hit tab or return yet.

```
function splitURLandReturn
```

12.  With this function name, Copilot should suggest a full function definition - in fact it may suggest several.  To see the options, hover over the first line and a small window should appear. This window will show many options there are and provide "<" and ">" links to toggle between them.  If there is more than one, click on the "<" and ">" buttons to see the differences in the available suggestions.

![alternative suggestions inline](./images/cdd221.png?raw=true "alternative suggestions inline")   

When you find an alternative you like, go ahead and tab to select it. Note that some may be incomplete.

 <p align="center">
**[END OF LAB]**
</p>
</br></br></br>
