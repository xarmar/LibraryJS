document.addEventListener("DOMContentLoaded", function () {

const libraryContainer = document.querySelector("#libraryContainer");

// Form constants
const titleInput = document.querySelector("#titleInput");
const authorInput = document.querySelector("#authorInput");
const pagesInput = document.querySelector("#pagesInput");
const addBookButton = document.querySelector("#addBookButton");
let deleteButton;
let toggleStatusButton;


let library = [];

// Book Class
class Book {
    constructor(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readStatus = "Still Reading"
        this.id = title
    }


    populateLibraryContainerWithBook() {
        let title = this.title;
        let author = this.author;
        let pages = this.pages;
        let readStatus = this.readStatus;

        // Create Div
        let newDiv = document.createElement("div");
        newDiv.classList.add("bookDiv");
    
        // Create p elements
        let deleteBookP = document.createElement("p")
        let titleP = document.createElement("p");
        let authorP = document.createElement("p");
        let pagesP = document.createElement("p");
        let readStatusP = document.createElement("p")

        // Add CSS to p elements
        deleteBookP.classList.add("deleteBook")
        titleP.classList.add("title");
        authorP.classList.add("author");
        pagesP.classList.add("pages");
        readStatusP.classList.add("readStatus");
        
        // Give <p> elements values
        deleteBookP.innerHTML = "\&#9746"
        titleP.innerText = title;
        authorP.innerText = author;
        pagesP.innerText = pages;
        readStatusP.innerText = readStatus;

        // Give newDiv element a unique Id which === Title + Author
        newDiv.id = title.split(" ").join("") + author.split(" ").join("");
    
        // Append <p> elemnts to the Div
        newDiv.appendChild(deleteBookP);
        newDiv.appendChild(titleP);
        newDiv.appendChild(authorP);
        newDiv.appendChild(pagesP);
        newDiv.appendChild(readStatusP);
        
        // Append div to Library Container
        libraryContainer.appendChild(newDiv);

        // Add option to delete book from array
        deleteButton = document.querySelectorAll(".deleteBook");
        deleteButton.forEach(button => {
            button.addEventListener("click", deleteBook)
        });
        // Add option to toggle ReadStatus
        toggleStatusButton = document.querySelectorAll(".readStatus");
        toggleStatusButton.forEach(button => {
            button.addEventListener("click", toggleReadStatus);
        });
    }

    addBookToLibrary () {
        library.push(this);   
    }
}

// Update Array and Show Books on libraryContainer Ater Clicking "Add Book"
addBookButton.addEventListener("click", pushBookToArray);

function pushBookToArray() {
        // Validation to make sure fields are NOT empty and "pages" is a number.
        if (!titleInput.value || !authorInput.value || !pagesInput.value || isNaN(pagesInput.value)) {
            return
        }

        let newBook = new Book(titleInput.value, authorInput.value, pagesInput.value);

        // if book by same title already exists don't add to library and don't populate
        if(!bookAlreadyInArray(newBook.title, newBook.author)) {
            newBook.populateLibraryContainerWithBook();
            newBook.addBookToLibrary();
        }
        resetBookForm();  

        // save array in local storage
        if (storageAvailable('localStorage')) {
            saveLocalStorage();
        }
        
}

function resetBookForm() {
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
}

// Checks if book is present in array
function bookAlreadyInArray(title, author) { 
    for (let i = 0; i < library.length; i++) {
        // if book has same title and same author, it's already in library
        if (library[i].title === title && library[i].author === author) {
            return true;
        }
    }
    return false
}

// Deletes bookDiv node and calls "deleteBookFromArray" to delete from array
function deleteBook() {
    let bookDiv = this.parentNode;
    let title = getTitleOfBookDiv(bookDiv);
    let author = getAuthorOfBookDiv(bookDiv);
    deleteBookFromArray(title, author);
    // remove bookDiv from DOM
    bookDiv.remove();  
}

// Deletes a book from the array
function deleteBookFromArray(title, author) {
    for (let i = 0; i < library.length; i++) {
        // if book has same title and same author, it's delete from Array
        if (library[i].title === title && library[i].author === author) {
            library.splice(i, 1);
        }
    }
    // save array in local storage
    if (storageAvailable('localStorage')) {
        saveLocalStorage();
    }
}

// Toggles readStatus from "Still Reading" to "Finished" and vice versa in the page. Calls function to change readStatus in array.
function toggleReadStatus() {
    let bookDiv = this.parentNode;
    let title = getTitleOfBookDiv(bookDiv);
    let author = getAuthorOfBookDiv(bookDiv);
    if(this.textContent === "Still Reading") {
        changeBookReadStatusInTheArray(title, author);
        this.textContent = "Finished";
        this.classList.add("finished");
        
    }
    else {
        changeBookReadStatusInTheArray(title, author);
        this.textContent = "Still Reading";
        this.classList.remove("finished");

    }
}

function changeBookReadStatusInTheArray(title, author) {
    for (let i = 0; i < library.length; i++) {
        if (library[i].title === title && library[i].author === author) {
            if(library[i].readStatus === "Still Reading") {
                library[i].readStatus = "Finished";
            }
            else {
                library[i].readStatus = "Still Reading";
            }
                // save array in local storage
            if (storageAvailable('localStorage')) {
                saveLocalStorage();
            }
        }
    }    
}

// Gets title of the book in the div
function getTitleOfBookDiv(bookDiv) {
    let childOfBookDiv = bookDiv.childNodes;
    let title;
    for (let child of childOfBookDiv) {
        if(child.className === "title") {
            title = child.outerText;
            return title
        }
    }
}
// Gets author of the book in the div
function getAuthorOfBookDiv(bookDiv) {
    let childOfBookDiv = bookDiv.childNodes;
    let author;
    for (child of childOfBookDiv) {
        if(child.className === "author") {
            author = child.outerText;
            return author
        }
    }
}


// Local Storage

// Check if localStorage is supported in current browser
// source: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}
 
// if localStorage is supported by current Browser then restore it.
if (storageAvailable('localStorage')) {
    restoreLocal();
  }


function saveLocalStorage() {
    localStorage.setItem("library", JSON.stringify(library));
  }
  
  function restoreLocal() {
    library = JSON.parse(localStorage.getItem("library"));
    if (library === null) {
        library = [];
    }
    else {
        populateLibraryContainerWithLocalStorage(library);
    }
  }

function populateLibraryContainerWithLocalStorage(library) {
    for (book of library){
        let title = book.title;
        let author = book.author;
        let pages = book.pages;
        let readStatus = book.readStatus;

        // Create Div
        let newDiv = document.createElement("div");
        newDiv.classList.add("bookDiv");
    
        // Create p elements
        let deleteBookP = document.createElement("p")
        let titleP = document.createElement("p");
        let authorP = document.createElement("p");
        let pagesP = document.createElement("p");
        let readStatusP = document.createElement("p")

        // Add CSS to p elements
        deleteBookP.classList.add("deleteBook")
        titleP.classList.add("title");
        authorP.classList.add("author");
        pagesP.classList.add("pages");
        readStatusP.classList.add("readStatus");
        if(readStatus === "Finished") {
            readStatusP.classList.add("finished");
        }

        
        // Give <p> elements values
        deleteBookP.innerHTML = "\&#9746"
        titleP.innerText = title;
        authorP.innerText = author;
        pagesP.innerText = pages;
        readStatusP.innerText = readStatus;
        

        // Give newDiv element a unique Id which === Title + Author
        newDiv.id = title.split(" ").join("") + author.split(" ").join("");
    
        // Append <p> elemnts to the Div
        newDiv.appendChild(deleteBookP);
        newDiv.appendChild(titleP);
        newDiv.appendChild(authorP);
        newDiv.appendChild(pagesP);
        newDiv.appendChild(readStatusP);
        
        // Append div to Library Container
        libraryContainer.appendChild(newDiv);

        // Add option to delete book from array
        deleteButton = document.querySelectorAll(".deleteBook");
        deleteButton.forEach(button => {
            button.addEventListener("click", deleteBook)
        });
        // Add option to toggle ReadStatus
        toggleStatusButton = document.querySelectorAll(".readStatus");
        toggleStatusButton.forEach(button => {
            button.addEventListener("click", toggleReadStatus);
        });
    }   
    }
})



