const currentLibrary = document.querySelector(".library");
const addBookButton = document.querySelector(".button.add");
const clearFormButton = document.querySelector(".button.clear");
const inputName = document.querySelector("#name");
const inputAuthor = document.querySelector("#author");
const inputNumberOfPages = document.querySelector("#number-of-pages");
const inputIsRead = document.querySelector("#is-read");

const myLibrary = [];

const book1 = new Book("Hacker's Delight", "Henry S. Warren", 306, false);
const book2 = new Book(
    "The Art of Computer Programming",
    "Donald Knuth",
    672,
    false
);

myLibrary.push(book1);
myLibrary.push(book2);

function Book(name, author, pages, isRead) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = crypto.randomUUID();
}

function displayLibrary(library) {
    clearLibrary();
    library.forEach((book) => {
        const bookElement = createBookElement(book);
        currentLibrary.appendChild(bookElement);
    });
}

function createBookElement(book) {
    const bookElement = document.createElement("li");
    bookElement.classList.add("book");
    const nameElement = document.createElement("h3");
    nameElement.textContent = `Name: ${book.name}`;
    bookElement.appendChild(nameElement);
    const authorElement = document.createElement("h3");
    authorElement.textContent = `Author: ${book.author}`;
    bookElement.appendChild(authorElement);
    const pagesElement = document.createElement("h4");
    pagesElement.textContent = `Number Of Pages: ${book.pages}`;
    bookElement.appendChild(pagesElement);
    const isReadElement = document.createElement("h4");
    isReadElement.textContent = `Did you read it yet? ${book.isRead ? 'yes' : 'no'}`
    bookElement.appendChild(isReadElement);
    const removeSelfButton = document.createElement("button");
    removeSelfButton.textContent = "Remove";
    removeSelfButton.classList.add("button", "remove");
    removeSelfButton.dataset.id = book.id;
    removeSelfButton.addEventListener("click", removeBookFromLibrary);
    bookElement.appendChild(removeSelfButton);
    const changeStatusButton = document.createElement("button");
    changeStatusButton.textContent = "Change Status";
    changeStatusButton.classList.add("button", "change-status");
    changeStatusButton.dataset.id = book.id;
    changeStatusButton.addEventListener("click", changeStatus);
    bookElement.appendChild(changeStatusButton);
    book.bookElement = bookElement;

    return bookElement;
}

function addBookToLibrary() {
    const name = inputName.value;
    const author = inputAuthor.value;
    const numberOfPages = inputNumberOfPages.value;
    const isRead = inputIsRead.checked;
    const book = new Book(name, author, numberOfPages, isRead);
    myLibrary.push(book);
    displayLibrary(myLibrary);
}

function clearLibrary() {
    currentLibrary.innerHTML = "";
}

function clearForm() {
    inputName.value = "";
    inputAuthor.value = "";
    inputNumberOfPages.value = "";
    inputIsRead.value = false;
}

function removeBookFromLibrary(event) {
    const bookId = event.target.dataset.id;
    for (book of myLibrary) {
        if (book.id === bookId) currentLibrary.removeChild(book.bookElement);
    }
}

function changeStatus(event) {
    const bookId = event.target.dataset.id;
    for (book of myLibrary) {
        if (book.id === bookId) {
            book.isRead ? book.isRead = false : book.isRead = true;
            displayLibrary(myLibrary);
        }
    }
}

displayLibrary(myLibrary);

addBookButton.addEventListener("click", addBookToLibrary);

clearFormButton.addEventListener("click", clearForm);
