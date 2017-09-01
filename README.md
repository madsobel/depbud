# Depbud

This is Depbud! (like [Leonidas](https://en.wikipedia.org/wiki/300_(film)) would have said it)..

Ok, bad joke. Depbud is a nifty little dashboard that helps you manage your npm dependencies. There are two main features in Depbud; a quick overview of the version status of your dependencies and showing you in which files these dependencies are used.

![Depbud](http://i.imgur.com/1KomTBU.png "Depbud")

### Dependencies and Dev Dependencies
From here you can see a list of all your dependencies as they are stated in our package.json file.
Before each dependency there's a little badge. They each represent the state that your dependency is in from looking at which version you're relying on and comparing that to the newest stable version available on NPM.

* ![green dot](http://i.imgur.com/Z0Xw0pz.jpg "green dot") Says that there's a newer major version available.
* ![yellow dot](http://i.imgur.com/u9m702k.jpg "yellow dot") Says that there's a newer major version available.
* ![red dot](http://i.imgur.com/LVqD9I6.jpg "red dot") Says that there's a newer major version available.
 
If you expand a dependency you'll see some meta data on that dependency, link to NPM, author, description and some more along with a list of all the files where that dependency is required from.
This makes it easier to know where you're using that, in the event of breaking changes because of an update.

### Unused Dependencies and Unused Dev Dependencies
From here you'll get a list of all the dependencies stated in your package.json file, which you're not using in your codebase.
The tabs also include a "quick-fix" command you can fire off, if you want to clean up your package.json file.
**Note: Use the "quick-fix" command with caution, as there could be false positives**

### Missing Dependencies
Here you'll get a list of requried dependencies in your codebase, which was not found in you package.json file
This helps you consider which dependencies you might want to add to you package.json file.
**Note: This is still being worked on, so there could be some false positives here**

## Installing
Depbud must be installed as a global package and can be installed with the `npm install -g depbud` command.

## Usage
Depbud assumes that the working directory from which it's being runned has at least a package.json file. From there it analyzes the codebase recursively
