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
        
}

function resetBookForm() {
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
}

// Functions that check and delete from library array
function bookAlreadyInArray(title, author) { 
    for (let i = 0; i < library.length; i++) {
        // if book has same title and same author, it's already in library
        if (library[i].title === title && library[i].author === author) {
            return true;
        }
    }
    return false
}

function deleteBookFromArray(title, author) {
    for (let i = 0; i < library.length; i++) {
        // if book has same title and same author, it's delete from Array
        if (library[i].title === title && library[i].author === author) {
            library.splice(i, 1);
        }
    }
}

// delete bookDiv node and delete object from array
function deleteBook() {
    let bookDiv = this.parentNode;
    let title = getTitleOfBookDiv(bookDiv);
    let author = getAuthorOfBookDiv(bookDiv);
    deleteBookFromArray(title, author);
    // remove bookDiv from DOM
    bookDiv.remove();   
}

function toggleReadStatus() {
    let bookDiv = this.parentNode;
    let title = getTitleOfBookDiv(bookDiv);
    let author = getAuthorOfBookDiv(bookDiv);
    if(this.textContent === "Still Reading") {
        this.textContent = "Finished";
        this.classList.add("finished");
        changeBookReadStatusInTheArray(title, author);
        
    }
    else {
        this.textContent = "Still Reading";
        this.classList.remove("finished");
        changeBookReadStatusInTheArray(title, author);

    }
}

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

function changeBookReadStatusInTheArray(title, author) {
    for (let i = 0; i < library.length; i++) {
        if (library[i].title === title && library[i].author === author) {
            if(library[i].readStatus === "Still Reading") {
                library[i].readStatus = "Finished";
            }
            else {
                library[i].readStatus = "Still Reading";
            }
        }
    }    
}

})



