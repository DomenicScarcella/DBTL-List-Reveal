# DBTL-List-Reveal
A one-page app to reveal list items, incorporating graphics and logic that allows several actions to occur with one click of the mouse.

# 'Don't Bury The Lead'
I made this app for the pro wrestling podcast I do with my friend.  It's called "Don't Bury The Lead" (https://www.youtube.com/@DontBuryTheLead/featured) because we like to get right to the top story when we recap a show or preview a big event.  We don't engage in the fake suspense of starting with the uninteresting stuff and making people wait around for the top news!

Our WrestleMania 39 preview show was set for a week before the big event, which would take place on April 1st & 2nd, 2023.  On March 24, we livestreamed our preview show here:  https://www.youtube.com/watch?v=w9yvfg_BGdY .  We wanted to reveal our Top 5 matches that we wanted to see, but couldn't find any free list-reveal apps that were suitable for our purposes and easy to use and customize.

So, I tried my hand at coding one!  Here it is!

This is a Vite app using React and lots of CSS.  Most of the code is in ListModular.jsx.  Using two .js files for our respective lists allowed my friend and I to make our Top 5 selections without the other person knowing them ahead of time.  We each made our picks in the dataDom.js and dataJohn.js files, which then exported our selections as innocuous variables to the ListModular component.

# How To Use It

Now for the real fun!

If you clone the repo to your local computer, you can do . . .

npm install

npm run dev

. . . from the terminal in the project folder, and the app will launch in a localhost port.  The app works best when it's in full-screen mode in a 16:9 aspect ratio, though it also works as narrow as 12:9 (4:3), or as wide as 20:9.

⭐️ The one-page app begins with the headline text on top and bottom.  The top is cenetered (because of a spotlight graphic that will apear later), while the bottom is flush left to accomodate the picture-in-picture in the lower right corner for the livestream videoconferencing platform (we used Restream).
### ![image]![01-OpenLogo](https://user-images.githubusercontent.com/76451364/232341256-59038f1c-9320-4cab-be78-2da1cf388abd.png)

⭐️ From the opening screen, click the large logo in the center.  This will replace that large logo with the ListModular component containing both lists, the spotlight graphic and a staging area in the center that will house the dominant photo/image on the page.
### ![image]![02-ListModularOpen](https://user-images.githubusercontent.com/76451364/232341263-3e7cd887-7393-4e87-a67b-4c90f6c6d0f6.png)

The five list tems in each list should appear as plain rectangles.  All list items begin in "hide" mode, with the text invisible (it's there, but it's the same color as the background).

⭐️ If you click on a list item that's in "hide" mode:

    1. The text in that list item will become visible ("unhide" mode).

    2. The photo/image associated with that list item will appear in the center.

    3. This list item will be the "active" item and will appear larger.
### ![image]![03-ListItemUnhide](https://user-images.githubusercontent.com/76451364/232341270-ff680fae-b2dc-4fe9-9846-11826899358e.png)

        a. If a list item in "unhide" mode in the opposite list matches the active item, then each list item will appear larger.

        b. All other "unhide" list items will be considered "inactive" and will change to standard size while remaining in "unhide" mode.
### ![image]![04-DualActives](https://user-images.githubusercontent.com/76451364/232341279-b1a9742a-4768-449d-9e73-713c9f99cefd.png)

⭐️ If you click on a list item that's in "unhide" mode:

    1. The list item reverts to its initial state of "hide" mode.

    2. The photo/image disappears, and this portion of the component reverts to its initial state (blank/"undefined").

    3. If this list item was also the "active" item, then no item will be considered "active."

⭐️ If you click on the photo/image in the center of the component:

    1. The photo/image disappears, and this portion of the component reverts to its initial state (blank/"undefined").

    2. Any "active" list item will be considered "inactive" and will change to standard size while remaining in "unhide" mode.
### ![image]![05-AllUnhideNoFeatured](https://user-images.githubusercontent.com/76451364/232341322-dc83f3d2-e99e-428c-b1a2-3f80ba3c6be1.png)

Several actions happen with one click, which makes it simpler to use, I think.  And it's a fun way to do a list reveal!

# How the Data Works in the App

The images used are stored in an "art" directory, which also has a "matchphotos" subdirectory.  "matchphotos" has all the images that pertain to each match, plus an mp-index.js file to catalogue everything for simpler import coding.  This was a great suggestion from a colleague at Silicon Society!

## Data organization and exporting to the main app component

The dataJohn.js and dataDom.js files each import the information from mp-index.js, and then use that in building a data object for each match.  Each match object gets assigned a separate variable -- I kept it simple with lowercase letters, a through k -- and includes a title (string), a pix (variable pointing to a .png file), and a vis (string: "hide").  This vis string will be read as a className within the list items, to determine whether the item is in "hide" or "unhide" mode.

Side note:  I initially used arrays instead of objects for each match's data, because arrays were easy for me to code.  But it's eventually more semantic to use objects and be able to assign key-value pairs with a descriptive key;  makes the code easier to read.  This was also suggested by a colleague at Silicon Society.  It's good to have someone else read your code and give feedback, even if the code has no functional failures.  Even correctly working code can be improved!

The completed file looks like this:
### ![image](https://user-images.githubusercontent.com/76451364/231040387-2582e40c-f551-48df-ac84-7cf4208fc2ee.png)

Back to the dataJohn.js and dataDom.js structures, having each match assigned to a one-letter variable made it very easy to give my friend instructions on how to select his matches.  I sent him a .txt file that looked like the eventual dataJohn.js file.  All he had to do was type the lowercase letter of each match into the space on the right side of the equals sign in lines 27 to 31.  Then he sent the .txt file back to me.  Without opening the .txt file, I simply dropped it into the app's "src" folder and switched the file extension from .txt to .js.

The final line of code in the dataJohn.js file is the export line, which collects the header and matches 1 through 5 into a single array of objects.  Since my friend's list would be displayed on the left and mine would be on the right, the naming convention is simply to begin each variable with an "L" for his and an "R" for mine.  Putting the list header line first in the exported array (index 0 of the array) also means that the matches 1-5 will be indexed as 1-5 in the array;  this comes in handy later when the data is being parsed!

## Data manipulation by the ListModular component and subcomponents

In ListModular -- where most of the XML is -- you find the ListSingle sub-component and the FeaturedMatch sub-component.  ListSingle contains most of the data parsing, and also takes two arguments:  arr (an array of data objects, imported from the dataJohn.js and dataDom.js files as listL and listR, respectively), and L_R (string of one letter, "L" or "R" for when the side of the screen matters to the display and/or data tracking).

The ListSingle builds the list by putting the header (the 0 index of the array, and the only key-value pair that it contains, the title) into line 23.  Then the real work happens, thanks to the .map method in line 25:

### ![image]![ListSingle](https://user-images.githubusercontent.com/76451364/232350928-4b09169a-0036-442d-8af7-bf71d38ff7d0.png)

An important detail is line 26, where the index of the item being mapped is stored as a simple string value "i".  This gets used in generating the unique key for each button element (line 29), for the setLastClick state (line 39), and to appear on screen along with the item.title (line 48).  Some conditional logic updates state and styling.

I used a button element rather than a div for each list item, because the button tag has some built-in styling that's useful, like horizontal and vertical centering and smooth resizing based on the amount of text to be displayed.  Plus, since they are supposed to be clicked, they technically are buttons, heh!

And speaking of state, there are three sets of useState declared at the top of ListModular, along with two methods.

*  State "active, setActive" is a string that has a default value when no match is active, and becomes the item.title when a match is active.
*  State "matchImage, setMatchImage" has a default of null -- the default image is part of the background of the div element, so it technically is always there but is simply covered when there's a active match -- and becomes the item.pix when a match is active.
*  State "lastClick, setLastClick" is a string with a default value of an empty string, and becomes a tracker for the last click-generated action.

Since active and matchImage are always working in tandem, I made methods to combine those two state calls into single method calls (clearFeaturedMatch and newFeaturedMatch):

### ![image]![LMState](https://user-images.githubusercontent.com/76451364/232351049-74829bca-1d24-4656-ab99-4333a35a63ad.png)

The FeaturedMatch subcomponent does comparatively little data manipulation, with only one possible clickable action that would change state.  Mostly, it's reading changes that have been made from clicking the buttons that comprise each list:

### ![image]![FeaturedMatch](https://user-images.githubusercontent.com/76451364/232351074-1bd17ef8-4b6b-45de-84a2-8cea2c0228d2.png)

Since these subcomponents handle all the logic and state changes for ListModular, the ListModular return statement can be very short:

### ![image]![LMReturn](https://user-images.githubusercontent.com/76451364/232351191-c1027d2b-ba97-4d1c-b828-4824fd861c31.png)

# Tests Added

There are now unit tests in the __tests__ folder, since I wanted this to have automated tests rather than simply me manually testing everything.  You can do . . .

npm run test

. . . or, to get a browser version of the test results, . . .

npm run test:ui

. . . from the terminal in the project folder.

# This Is My First App . . .

. . . that I built from scratch without copying a tutorial of some sort.  I didn't know if I could do this, until I did.  I'm proud of this build-from-scratch app, and I hope you like it, too!

--Dom
