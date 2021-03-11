# MyReads Project

Added interactivity to the app by refactoring the static code in the starter template for the final assessment project for Udacity's React Fundamentals course.

## To run the project

* Clone the repo to your local directory.
* Install all project dependencies with `npm install`
* Start the development server with `npm start`

## App Functionality

In this application, the main page displays a list of "shelves" (i.e. categories), each of which contains a number of books. The three shelves are:
* Currently Reading
* Want to Read
* Read

The homepage of the MyReads App shows the title "MyReads" and then three shelves, which are named "Currently Reading," "Want to Read," and "Read." There are books on each shelf. Each book has a green circle in the bottom right-hand corner. The app has a green plus sign icon in the bottom right-hand corner.

Each book has a control that lets you select the shelf for that book. When you select a different shelf, the book moves there. Note that the default value for the control should always be the current shelf the book is in.

The green circle in the right-hand cover of the first book is clicked. You see a menu that has the following options: "Move To," "Currently Reading," "Want to Read," Read," and "None." The "Move to" option is greyed out. There is a checkmark next to the "Currently Reading" option.
The main page also has a link to /search, a search page that allows you to find books to add to your library.

The search page has a text input that may be used to find books. As the value of the text input changes, the books that match that query are displayed on the page, along with a control that lets you add the book to your library.

When a book is on a bookshelf, it should have the same state on both the main application page and the search page.

The search page also has a link to / (the root URL), which leads back to the main page.

When you navigate back to the main page from the search page, you should instantly see all of the selections you made on the search page in your library.
