# DBTL-List-Reveal
A one-page app to reveal list items, incorporating graphics and logic that allows several actions to occur with one click of the mouse.

# 'Don't Bury The Lead'
I made this app for the pro wrestling podcast I do with my friend.  It's called "Don't Bury The Lead" (https://www.youtube.com/@DontBuryTheLead/featured) because we like to get right to the top story when we recap a show or preview a big event.  We don't engage in the fake suspense of starting with the uninteresting stuff and making people wait around for the top news!

Our WrestleMania 39 preview show was set for a week before the big event, which would take place on April 1st & 2nd, 2023.  On March 24, we livestreamed our preview show here:  https://www.youtube.com/watch?v=w9yvfg_BGdY .  We wanted to reveal our Top 5 matches that we wanted to see, but couldn't find any free list-reveal apps that were suitable for our purposes and easy to use and customize.

So, I tried my hand at coding one!  Here it is!

This is a Vite app using React and lots of CSS.  Most of the code is in ListModular.jsx.  Using two .js files for our respective lists allowed my friend and I to make our Top 5 selections without the other person knowing them ahead of time.  We each made our picks in the dataDom.js and dataJohn.js files, which then exported our selections as innocuous variables to the ListModular component.

# How To Use It

Now for the real fun!

If you do clone the repo locally and install the dependencies, you can do . . .

npm install
npm run dev

. . . from the terminal in the project folder, and the app will launch in a localhost port.  The app works best when it's in full-screen mode in a 16:9 aspect ratio, though it also works as narrow as 12:9 (4:3), or as wide as 20:9.

⭐️ The one-page app begins with the headline text on top and bottom.  The top is cenetered (because of a spotlight graphic that will apear later), while the bottom is flush left to accomodate the picture-in-picture in the lower right corner for the livestream videoconferencing platform (we used Restream).
### ![image](https://user-images.githubusercontent.com/76451364/227739747-ccd2778c-de5b-4859-873d-d42c62f70731.png)

⭐️ From the opening screen, click the large logo in the center.  This will replace that large logo with the ListModular component containing both lists, the spotlight graphic and a staging area in the center that will house the dominant photo/image on the page.
### ![image](https://user-images.githubusercontent.com/76451364/227739756-8cf491ce-245b-410e-9299-1cc25c52604d.png)

The five list tems in each list should appear as plain rectangles.  All list items begin in "hide" mode, with the text invisible (it's there, but it's the same color as the background).

⭐️ If you click on a list item that's in "hide" mode:

    1. The text in that list item will become visible ("unhide" mode).

    2. The photo/image associated with that list item will appear in the center.

    3. This list item will be the "active" item and will appear larger.
### ![image](https://user-images.githubusercontent.com/76451364/227739981-0ad6933e-9566-41bb-aaac-c5533fd466d3.png)

        a. If a list item in "unhide" mode in the opposite list matches the active item, then each list item will appear larger.

        b. All other "unhide" list items will be considered "inactive" and will change to standard size while remaining in "unhide" mode.
### ![image](https://user-images.githubusercontent.com/76451364/227739894-150c7bc7-7cf8-405e-830e-640b726277ad.png)

⭐️ If you click on a list item that's in "unhide" mode:

    1. The list item reverts to its initial state of "hide" mode.

    2. The photo/image disappears, and this portion of the component reverts to its initial state (blank/"undefined").

    3. If this list item was also the "active" item, then no item will be considered "active."

⭐️ If you click on the photo/image in the center of the component:

    1. The photo/image disappears, and this portion of the component reverts to its initial state (blank/"undefined").

    2. Any "active" list item will be considered "inactive" and will change to standard size while remaining in "unhide" mode.
### ![image](https://user-images.githubusercontent.com/76451364/227739923-db1b0cfa-a09e-4977-ab4a-706fd4075e80.png)

Several actions happen with one click, which makes it simpler to use, I think.  And it's a fun way to do a list reveal!

# How the Data Works in the App

The images used are stored in an "art" directory, which also has a "matchphotos" subdirectory.  "matchphotos" has all the images that pertain to each match, plus an mp-index.js file to catalogue everything for simpler import coding.  This was a great suggestion from a colleague at Silicon Society!

## Data organization and exporting to the main app component

The dataJohn.js and dataDom.js files each import the information from mp-index.js, and then use that in building a data object for each match.  Each match object gets assigned a separate variable -- I kept it simple with lowercase letters, a through k -- and includes a title (string), a pix (variable pointing to a .png file), and a vis (string: "hide").  This vis string will be read as a className within the list items, to determine whether the item is in "hide" or "unhide" mode.

Side note:  I initially used arrays instead of objects for each match's data, because arrays were easy for me to code.  But it's eventually more semantic to use objects and be able to assign key-value pairs with a descriptive key;  makes the code easier to read.  This was also suggested by a colleague at Silicon Society.  It's good to have someone else read your code and give feedback, even if the code has no mistakes.  Even working code can be improved!

The completed file looks like this:
### ![image](https://user-images.githubusercontent.com/76451364/231040387-2582e40c-f551-48df-ac84-7cf4208fc2ee.png)

Back to the dataJohn.js and dataDom.js structures, having each match assigned to a one-letter variable made it very easy to give my friend instructions on how to select his matches.  I sent him a .txt file that looked like the eventual dataJohn.js file.  All he had to do was type the lowercase letter of each match into the space on the right side of the equals sign in lines 27 to 31.  Then he sent the .txt file back to me, and without opening the .txt file, I simply dropped it into the app's "src" folder and switched the file extension from .txt to .js.

The final line of code in the dataJohn.js file is the export line, which collects the header and matches 1 through 5 into a single array of objects.  Since my friend's list would be displayed on the left and mine would be on the right, the naming convention is simply to begin each variable with an "L" for his and an "R" for mine.  Putting the list header line first in the exported array (index 0 of the array) also means that the matches 1-5 will be indexed as 1-5 in the array;  this comes in handy later when the data is being parsed!

## Data manipulation by the ListModular component and subcomponents

In ListModular -- where most of the XML is -- you find the ListSingle sub-component and the FeaturedMatch sub-component.  ListSingle contains most of the data parsing, and also takes two arguments:  arr (an array of data objects, imported from the dataJohn.js and dataDom.js files as listL and listR, respectively), and L_R (string of one letter, "L" or "R" to be used in setting side-specific styling).

The ListSingle builds the list by putting the header (the 0 index of the array, and the only key-value pair that it contains, the title) into line 23.  Then the real work happens, thanks to the .map method in line 25:

### ![image](https://user-images.githubusercontent.com/76451364/231050472-fbd50db3-ed09-4dd8-803c-128791f645c2.png)

An important detail is line 26, where the index of the item being mapped is stored as a simple string value.  This gets used in generating the unique key for each button element (line 29), for the setLastClick state (line 39) and to be printed along with the item's title on the screen (line 48).  Some conditional logic updates state and styling.

I used a button element rather than a div for each list item, because the button tag has some built-in styling that's useful, like horizontal and vertical centering and smooth resizing based on the amount of text to be displayed.  Plus, sincethey are supposed to be clicked, they technically are buttons, heh!

And speaking of state, there are three sets of useState declared at the top of ListModular, along with two methods that combine two state changes into one method call.

*  State "active, setActive" is a string that has a default value when no match is active, and becomes the item.title when a match is active.
*  State "matchImage, setMatchImage" has a default of null -- the default image is part of the background of the div element, so it technically is always there but is simply covered hen there's a active match -- and becomes the item.pix when a match is active.
*  State "lastClick, setLastClick" is a string with a default value of an empty string, and becomes a tracker for the last click-generated action.

Since active and matchImage are always working in tandem, I made methods to combine those two state calls into a single method call:

### ![image](https://user-images.githubusercontent.com/76451364/231053309-e51b7556-da6b-4925-86bf-85c1e3c01898.png)

The FeaturedMatch subcomponent does comparatively little data manipulation, with only one possible clickable action that would change state.  Mostly, it's reading changes that have been made from clicking the buttons that comprise each list:

### ![image](https://user-images.githubusercontent.com/76451364/231053974-fc702958-8156-41e9-b117-65bd58870a87.png)

Since these subcomponents handle all the logic and state changes for ListModular, the ListModular return statement can be very short:

### ![image](https://user-images.githubusercontent.com/76451364/231054154-e32b0380-c9be-45cd-ac24-53aa46927a74.png)

# This Is My First App . . .

. . . that I built from scratch without copying a tutorial of some sort.  I didn't know if I could do this, until I did.  I'm proud of this build-from-scratch app, and I hope you like it, too!

--Dom
