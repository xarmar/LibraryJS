document.addEventListener("DOMContentLoaded", function () {

const libraryContainer = document.querySelector("#libraryContainer");

// Form constants
const titleInput = document.querySelector("#titleInput");
const authorInput = document.querySelector("#authorInput");
const pagesInput = document.querySelector("#pagesInput");
const addBookButton = document.querySelector("#addBookButton");
let deleteButton;


let library = [];

// Book Class
class Book {
    constructor(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readStatus = "Not Finished"
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

        // Give newDiv element a unique Id which = Title and Author)
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
    }
    addBookToLibrary () {
        library.push(this);   
    }
}

// Update Array and Show Books on libraryContainer Ater Clicking "Add Book"
addBookButton.addEventListener("click", pushBookToArray);

function pushBookToArray() {
        if (!titleInput.value || !authorInput.value || !pagesInput.value ) {
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
            library.splice(i, 1)
        }
    }
}

// Delete bookDiv when user clicks "X"

// delete bookDiv node and delete object from array
function deleteBook() {
    let bookDiv = this.parentNode;
    console.log(bookDiv);
    bookDiv.remove();   
}

})



