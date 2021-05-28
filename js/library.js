document.addEventListener("DOMContentLoaded", function () {

const generalContainer = document.querySelector("#generalContainer");
const libraryContainer = document.querySelector("#libraryContainer");
const addBookButton = document.querySelector("#addBookButton");
const titleInput = document.querySelector("#titleInput");
const authorInput = document.querySelector("#authorInput");
const pagesInput = document.querySelector("#pagesInput");

let library = [];

// Book Class
class Book {
    constructor(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readStatus = "Not Finished"
    }


    populateLibraryContainerWithBooks() {
        for (let book of library){
            let title = book.title;
            let author = book.author;
            let pages = book.pages;
            let readStatus = book.readStatus;

        // have to right a function here that checks if book is already in library and returs blank
        
        // Create Div
        let newDiv = document.createElement("div");
        newDiv.classList.add("bookExample");
    
        // Create p elements
        let deleteBookP = document.createElement("p")
        let titleP = document.createElement("p");
        let authorP = document.createElement("p");
        let pagesP = document.createElement("p");
        let readStatusP = document.createElement("p")

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
    
        // Append <p> elemnts to the Div
        newDiv.appendChild(deleteBookP);
        newDiv.appendChild(titleP);
        newDiv.appendChild(authorP);
        newDiv.appendChild(pagesP);
        newDiv.appendChild(readStatusP);
        
        // Append div to General Container
        libraryContainer.appendChild(newDiv);
        }

    }


    addBookToLibrary () {
        library.push(this);   
    }

    sameTitle(thisBookTitle, library) {
        for (let i = 0; i < library.length; i++) {
            if (library[i].title === thisBookTitle) {
                return true;
            }
        }
    
        return false;
    }
    
}

// Update Array and Show Books Ater Clikcing "Add Book"
addBookButton.addEventListener("click", pushBookToArray);

function pushBookToArray() {
        if (!titleInput.value || !authorInput.value || !pagesInput.value ) {
            return
        }
        let newBook = new Book(titleInput.value, authorInput.value, pagesInput.value);
        
        // if book by same title already exists don't add to library
        if(!newBook.sameTitle(newBook.title, library)) {
            newBook.addBookToLibrary();
        }

        newBook.populateLibraryContainerWithBooks();  
        titleInput.value = "";
        authorInput.value = "";
        pagesInput.value = "";
}


})



