# MapTool Add-On Template
This is a template for creating a GitHub repository that is prepared for 
developing one or more [MapTool][MapTool] add-on libraries.

## How to use it
It is quite simple to use. Simple click the large green *Use this template* 
button above the file list, select *Create a new repository* and name it. 
That's basically it. 

## Using your new repository
I am not going into how to use the repository, as this is explained
elsewhere in the [GitHub documentation][GitHubDocs].

Once your new repository has cloned to your local machine, the magic can begin. 
Personally, I work in Windows, so I cannot tell you how to use things on MacOs
or Linux, but I imagine the basics are more or less the same. 

> [!NOTE]
> Important to note though, is that the template is optimized for 
[Visual Studio Code][VSCode], although I imagine you can make it work with 
other editors as well. 

It is by no means necessary, but once upon a time, I made an extremely basic and
very unmaintained VSCode add-in for adding syntax highlighting for 
[MapTool script][MTCode]. It doesn't do much, but it at least enables a bit
of syntax highlighting, and who knows, I may one day work on it again. 


## Getting Started
Once the local repository is ready, fire up VS Code and open the folder 
containing the repository. 

There are a number of files and folders in the repository, explained below: 
```
Root                     // The root of your repository
├─ .vscode               // Special folder for VS Code.
│    └─ tasks.json       //     Tasks for VS Code.
├─ build                 // folder for task scripts etc.
│    ├─ build.ps1        //     Script for building add-on libraries. 
│    └─ new-library.ps1  //     Script for adding new add-on library.
├─ release               // Folder for the packaged libraries.
│    └─ delete-me.txt    //     Just delete this file.
├─ source                // Folder for the source of all add-on libraries.
│    └─ delete-me.txt    //     Just delete this file.
├ .gitignore             // Special file for Git. 
├ CHANGELOG.md           // Changelog file, replace with your own or delete.
├ LICENSE                // LICENSE file, replace with your own or delete.
└ README.md              // This file, replace with your own or delete.
```

The *.vscode/tasks.json* file is a special file used by VS Code to define 
tasks. Press `Ctrl+Shift+P` to open the command list and select `Tasks: Run task`.
You will now see two tasks at the top of the list: 
* Build Library: *Builds the add-on library*
* New Library: *Adds a new library with necessary files and folders set up.*

### New Library

This task will prompt you for a name, and will then set up a new folder in 
the `source` folder with all the necessary files and folders for a new add-on 
library. You can see more [here][CreateAddOn].

### Build Library

This task will prompt you for a name, and optionally a version. It will then
proceed to create an add-on library from the named library. 

This task is configured as the *default build task*, so it can also be activated with 
`Ctrl+Shift+B`.


If e.g. you have a library called `notebook` and you enter that, and a version 
value of `0.2`, two files will be created in the `release`folder.

* `notebook.mtlib`
* `notebook-latest.txt`

When the `mtlib` ìs imported into MapTool, you will see the entered version in 
the add-on information. 

The `notebook-latest.txt` contains the last entered version, and can e.g. be
used for checking the version of the add-on library. This *could* be done with 
a macro like this: 
```
[h:uri="https://raw.githubusercontent.com/<your-name>/<your-repo>/build/<library>-latest.
txt"]
[h:latest= REST.get(uri)]
```
Or if you prefer javascript, something like this: 
```js
function getLatestVersion() {
    const updateLink = "https://raw.githubusercontent.com/<your-name>/<your-repo>/build/<library>-latest.
txt";
    const latest = MTScript.evalMacro(`[r:REST.get("${updateLink}")]`);
    return latest;
}
```
## Continuing the adventure
Well, that is just about as much text as I can think of for this readme. I aim
to keep the template up-to-date, but as Real-Life:tm: has a habit of interfering
with the fun stuff, maintenance may be spotty. 

### Roadmap
I have a few ideas for improving the template, or rather the tasks for VS Code. 
These are found on the [issues][issues] page, and if you have any ideas, issues, wishes 
etc. feel free to add an issue as well.

[VSCode]: https://code.visualstudio.com/
[MTCode]: https://github.com/Tdue21/mtscript-vscode
[issues]: https://github.com/Tdue21/MapTool-AddOn-Template/issues
[MapTool]: https://rptools.net
[GitHubDocs]: https://docs.github.com/en
[CreateAddOn]: https://wiki.rptools.info/index.php/Creation_of_add-on_libraries
