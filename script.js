const currentLibrary = document.querySelector(".library");
const myLibrary = [];

function Book(name, author, pages, isRead) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(name, author, pages, isRead, myLibrary) {
    const book = new Book(name, author, pages, isRead);
    myLibrary.push(book);
}

function displayLibrary(library) {
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
    const isreadElement = document.createElement("h4");
    isreadElement.textContent = `Did you read it yet?: ${book.isRead}`;
    bookElement.appendChild(isreadElement);

    return bookElement;
}

const book1 = new Book("Hacker's Delight", "Henry S. Warren", 306, false);
const book2 = new Book(
    "The Art of Computer Programming",
    "Donald Knuth",
    672,
    false
);

myLibrary.push(book1);
myLibrary.push(book2);

displayLibrary(myLibrary);
