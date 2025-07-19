class Library {

    constructor(name) {
        
        this.name = name;
        this.books = new Array();
        this.id = crypto.randomUUID();
        this.render();

    }

    addBook(book) {

        this.books.push(book); 
        this.render();

    }

    render() {

        this.root.innerHTML = `
            <li class="current-library" data-id="${this.id}">
                <img src="public/bookshelf.svg" alt="icon of a bookshelf">
                <h3>${this.name}</h3>
            </li>
        `

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
        this.render();

    }

    render() {

        this.bookElement = `
            <li class="book" data-id="${this.id}">
                <img src="public/book-icon.svg" alt="image of a book">
                <h3>
                    Name: 
                    <span class="light">${this.name}</span>
                </h3>
                <h3>
                    Author: 
                    <span class="light">${this.author}</span>
                </h3>
                <h3>
                    # Pages: 
                    <span class="light">${this.pages}</span>
                </h3>
                <h3>
                    Is it read?: 
                    <span class="light">${this.isRead}</span>
                </h3>
                <button class="button remove">Remove</button>
                <button class="button change-status">Change Status</button>
            </li>
            `

    }

}

const book1 = new Book("Hacker's Delight", "Henry S. Warren", 306, false);
const book2 = new Book("The Art of Computer Programming", "Donald Knuth", 672, false);

const library1 = new Library("mylibrary");
library1.addBook(book1);
library1.addBook(book2);


// function displayLibrary(library) {
//     clearLibrary();
//     library.forEach((book) => {
//         const bookElement = createBookElement(book);
//         currentLibrary.appendChild(bookElement);
//     });
// }

// function createBookElement(book) {
//     const bookElement = document.createElement("li");
//     bookElement.classList.add("book");
//     const imageElement = document.createElement("img");
//     imageElement.src = 'public/book-icon.svg';
//     imageElement.alt = 'image of a book';
//     bookElement.appendChild(imageElement);
//     const nameElement = document.createElement("h3");
//     nameElement.innerHTML = `Name: <span class="light">${book.name}</span>`;
//     bookElement.appendChild(nameElement);
//     const authorElement = document.createElement("h3");
//     authorElement.innerHTML = `Author: <span class="light">${book.author}</span>`;
//     bookElement.appendChild(authorElement);
//     const pagesElement = document.createElement("h3");
//     pagesElement.innerHTML = `# Pages: <span class="light">${book.pages}</span>`;
//     bookElement.appendChild(pagesElement);
//     const isReadElement = document.createElement("h3");
//     isReadElement.innerHTML = `Is it read?: <span class="light">${
//         book.isRead ? "yes" : "no"
//     }</span>`;
//     bookElement.appendChild(isReadElement);
//     const removeSelfButton = document.createElement("button");
//     removeSelfButton.textContent = "Remove";
//     removeSelfButton.classList.add("button", "remove");
//     removeSelfButton.dataset.id = book.id;
//     removeSelfButton.addEventListener("click", removeBookFromLibrary);
//     bookElement.appendChild(removeSelfButton);
//     const changeStatusButton = document.createElement("button");
//     changeStatusButton.textContent = "Change Status";
//     changeStatusButton.classList.add("button", "change-status");
//     changeStatusButton.dataset.id = book.id;
//     changeStatusButton.addEventListener("click", changeStatus);
//     bookElement.appendChild(changeStatusButton);
//     book.bookElement = bookElement;

//     return bookElement;
// }

// function addBookToLibrary() {
//     const name = inputName.value;
//     const author = inputAuthor.value;
//     const numberOfPages = inputNumberOfPages.value;
//     const isRead = inputIsRead.checked;
//     const book = new Book(name, author, numberOfPages, isRead);
//     myLibrary.push(book);
//     displayLibrary(myLibrary);
// }

// function clearLibrary() {
//     currentLibrary.innerHTML = "";
// }

// function clearForm() {
//     inputName.value = "";
//     inputAuthor.value = "";
//     inputNumberOfPages.value = "";
//     inputIsRead.value = false;
// }

// function removeBookFromLibrary(event) {
//     const bookId = event.target.dataset.id;
//     for (book of myLibrary) {
//         if (book.id === bookId) {
//             console.log("this ran");
//             currentLibrary.removeChild(book.bookElement);
//             myLibrary = myLibrary.filter((book1) => book1 !== book);
//             console.log(myLibrary);
//         }
//     }
// }

// function changeStatus(event) {
//     const bookId = event.target.dataset.id;
//     for (book of myLibrary) {
//         if (book.id === bookId) {
//             book.isRead ? (book.isRead = false) : (book.isRead = true);
//             displayLibrary(myLibrary);
//         }
//     }
// }
