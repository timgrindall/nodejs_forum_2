# nodejs_forum_2
Forum software created using Node.js

## Creation
This software took me about a week to create and creates a usable forum using Node.js and a MongoDB database. It supports creating user accounts and logging in and out and uses bcrypt.js to hash the passwords and store them that way.

On the front page there is a list of most recent posts along with a short string saying how long ago they were each created. This is pulled directly from the database and is a fast operation.

Each user account also has a list of the most recent count of the posts in each subforum which is compared to the current number of posts when they log in again. I use JQuery to update the number of unread posts on each subforum. The count for each subforum is updated when that subforum is visited (updated in the user account) and updates the count for the whole subforum (I couldn't figure out a way to update the count based on whether new threads had been visited without using large database collections just for this purpose).

This software was designed with 3D artists in mind and therefore includes support for uploading images and image modals on the thread pages. First image uploaded for each post becomes the thumbnail and is optimized for that purpose (scaled down and saved as a new file).

Styling is minimal as I didn't want to spend a lot of time on it but you could change that yourself if you so wished.

## Setup
Please run the command 'npm install' to install the modules used in this project. I did not want to upload the modules to save on file space.

Don't forget to create the MongoDB database before you run the code (read the setup section below for how to create the collections for the database). Please note the database name should be 3DArtistsForum but you can change that if you wish in the routes/index.js file.

In the routes/index.js file you will find a section of code which only runs if the variable setup is True. set this variable to true and run the code/start the server to create the MongoDB collections for the forums and related subforums. You will also need to set the setup2 variable to True and run the code again as a second step to setup the parentID's of the subforums with their related forum IDs.

Each subforum points to its parent subforum using a parentID which points to the parent forum's _id field. Similar approach was used for the threads and posts.
