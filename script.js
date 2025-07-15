const myLibray = [];

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

}

const book1 = new Book('Hacker\'s Delight', 'Henry S. Warren', 306, false);
const book2 = new Book('The Art of Computer Programming', 'Donald Knuth', 672, false);