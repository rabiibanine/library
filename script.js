const liblist = document.querySelector('.sidebar__libraries');
const lib = document.querySelector('.main__container')

class LibraryManager {

    constructor(root) {

        this.root = root;
        this.libraries = new Array();
        this.selectedLibrary = null;
        this.render();
        this.cacheDOM();
        this.bindEvents();
        this.bindEventsOnce();

    }

    addLibrary(library) {

        this.libraries.push(library);
        this.render();
        this.cacheDOM();

    }

    removeLibrary(libraryToRemove) {

        if (this.selectedLibrary === libraryToRemove) {
            this.selectedLibraryNameElement.textContent = 'Library Name';
            this.selectedLibrary.clearLibrary();
        };
        this.libraries = this.libraries.filter(library => library !== libraryToRemove);
        this.selectedLibrary = null;
        this.render();

    }

    render() {

        this.root.innerHTML =
        `
                ${this.libraries.map(library => 
                    `
                        <li class="sidebar__libraries-element" data-id="${library.id}">
                                <img class="sidebar__libraries-element-icon" src="public/bookshelf.svg" alt="bookshelf icon"/>
                                <p class="sidebar__libraries-element-title">${library.name}</p>
                            <img class="sidebar__libraries-element-remove" src="public/remove.svg" alt="remove library button"/>
                        </li>
                        `).join('')}
        `
        this.cacheDOM();
        this.bindEvents();
        if (this.selectedLibrary) this.selectedLibrary.render();
        
    }

    cacheDOM() {

        this.removeButtons = [...document.querySelectorAll('.sidebar__libraries-element-remove')];
        this.addButton = document.querySelector('.sidebar__header-icon');
        this.dialogElement = document.querySelector('.sidebar__create-library');
        this.dialogElementRemove = document.querySelector('.sidebar__create-library-icon');
        this.dialogElementCreate = document.querySelector('.sidebar__create-library-button');
        this.dialogElementInput = document.querySelector('.sidebar__create-library-input');
        this.selectedLibraryNameElement = document.querySelector('.header__title');
        this.libraryElements = [...document.querySelectorAll('.sidebar__libraries-element')];

    }

    bindEvents() {

        for (let libraryElement of this.libraryElements) {
            libraryElement.addEventListener('click', (event) => this.handleLibraryClick(event, libraryElement.dataset.id));
        }

    }

    bindEventsOnce() {

        this.addButton.addEventListener('click', () => this.dialogElement.showModal());
        this.dialogElementRemove.addEventListener('click', () => this.dialogElement.close());
        this.dialogElementCreate.addEventListener('click', this.handleCreate.bind(this));

    }

    handleCreate() {

        const libraryName = this.dialogElementInput.value;
        const library = new Library(lib, libraryName);
        libraryManager.addLibrary(library);

    }

    setLibrary(library) {

        this.selectedLibrary = library;
        this.selectedLibraryNameElement.textContent = library.name;
        this.render();

    }

    handleLibraryClick(event, Id) {
        
        const library = this.libraries.find(library => library.id === Id);
        const isRemove = event.target.classList.contains("sidebar__libraries-element-remove");
        isRemove ? this.removeLibrary(library) : this.setLibrary(library);

    }

}


class Library {

    constructor(root, name) {
        
        this.root = root
        this.name = name;
        this.books = new Array();
        this.id = crypto.randomUUID();
        this.cacheDOM();
        this.bindEvents();
        this.bindEventsOnce();

    }

    addBook(book) {

        this.books.push(book); 
        if (libraryManager.selectedLibrary === this) this.render();

    }

    removeBook(event) {

        const removeButtonId = event.target.dataset.id
        this.books = this.books.filter(book => book.id !== removeButtonId);
        if (libraryManager.selectedLibrary === this) this.render();

    }

    clearLibrary() {

        this.root.innerHTML = '';

    }

    render() {

        this.root.innerHTML = `
            ${this.books.map(book =>
                `
                <li class="main__book">
                    <img class="main__book-icon-remove" src="public/remove.svg" alt="remove book icon" data-id="${book.id}" />
                    <img class="main__book-icon" src="public/book-icon.svg" alt="image of a book" />
                    <div class="main__book-text">
                        <h3>Name: <span class="main__book-text--light">${book.name}</span></h3>
                        <h3>Author: <span class="main__book-text--light">${book.author}</span></h3>
                        <h3># of Pages: <span class="main__book-text--light">${book.pages}</span></h3>
                        <h3>Is it Read?: <span class="main__book-text--light">${book.isRead}</span></h3>
                    </div>
                    <button class="main__book-button" data-id="${book.id}">Read</button>
                </li>
                `
            ).join('')}
        `
        this.cacheDOM();
        this.bindEvents();

    }

    cacheDOM() {

        this.removeButtons = [...document.querySelectorAll('.main__book-icon-remove')];
        this.addBookButton = document.querySelector('.header__button');
        this.dialogElement = document.querySelector('.main__dialog');
        this.dialogFormElement = document.querySelector('.main__dialog-form');
        this.changeStatusButton = document.querySelector('.main__book-button');
        this.closeDialogButton = document.querySelector('.main__dialog-close');

    }

    bindEvents() {

        for (let removeButton of this.removeButtons) {
            removeButton.addEventListener('click', this.removeBook.bind(this));
        }

        if (this.changeStatusButton) {
            this.changeStatusButton.onclick = (e) => {
            const id = e.target.dataset.id;
            const book = this.books.find(book => book.id === id);
            book.changeStatus();
            }
        }
    }

    bindEventsOnce() {

        this.addBookButton.addEventListener('click', () => {
            if (libraryManager.selectedLibrary) this.dialogElement.showModal()
        });

        this.dialogFormElement.onsubmit = this.handleBookFormSubmit.bind(this);

        this.closeDialogButton.onclick = () => {
            this.dialogElement.close();
        }

    }

    handleBookFormSubmit() {
            const formData = new FormData(this.dialogFormElement);
            const data = Object.fromEntries(formData.entries());
            data.isRead = 'isRead' in data;
            const book = new Book(data.name, data.author, data.pages, data.isRead);
            libraryManager.selectedLibrary.addBook(book);
    }

}

class Book {

    constructor(name, author, pages, isRead) {
        
        this.bookElement = '';
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
        this.id = crypto.randomUUID();

    }

    changeStatus() {

        this.isRead = !this.isRead;
        libraryManager.selectedLibrary.render();

    }

}

const libraryManager = new LibraryManager(liblist);

const book1 = new Book("name", "author", 365, true);

const library1 = new Library(lib, "Library");

library1.addBook(book1);

libraryManager.addLibrary(library1);

