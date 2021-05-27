document.addEventListener("DOMContentLoaded", function () {

const listOfBooksDiv = document.querySelector("#listOfBooksDiv");
const bookTable = document.querySelector("#bookTable");

// Book constructor
function newBook(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

let library = [];

function addBookToLibrary (book) {
    library.push(book);   
}

let hobbit = new newBook("Hobbit", "Tolkien", "230", "To Read");
let pokemon = new newBook("Pokemon", "Japan", "125", "Read");
addBookToLibrary(hobbit);
addBookToLibrary(pokemon);


function listOfBooks() {
    for (let book of library){
        let title = book.title;
        let author = book.author;
        let pages = book. pages;
        let readStatus = book.readStatus
    
    // Create table row
    let createRow = document.createElement("tr");
    createRow.id = title;

    // Create columns
    let titleCell = document.createElement("td");
    let authorCell = document.createElement("td");
    let pagesCell = document.createElement("td");
    let readStatusCell = document.createElement("td");
    
    // Give columns values
    titleCell.innerText = title;
    authorCell.innerText = author;
    pagesCell.innerText = pages;
    readStatusCell.innerText = readStatus;

    // Append columns to the row
    createRow.appendChild(titleCell);
    createRow.appendChild(authorCell);
    createRow.appendChild(pagesCell);
    createRow.appendChild(readStatusCell);
    
    // Append row to table
    console.log(createRow);
    bookTable.appendChild(createRow);
    }
}
listOfBooks();

});