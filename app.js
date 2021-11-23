/* eslint-disable max-classes-per-file */

// const formContainer = document.getElementById('formContainer');
const dynamicBooksDiv = document.getElementById('books-wrapper');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
}

class store {
  static getBooks() {
    let booksList;
    if (localStorage.getItem('booksDetails') === null) {
      booksList = [];
    } else {
      booksList = JSON.parse(localStorage.getItem('booksDetails'));
    }
    return booksList;
  }

  static addBooks(book) {
    const newbooksList = store.getBooks();
    newbooksList.push(book);
    localStorage.setItem('booksDetails', JSON.stringify(newbooksList));
  }

  static removeBooks(bookID) {
    const books = store.getBooks();
    books.forEach((book, index) => {
      if (book.id === bookID) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('booksDetails', JSON.stringify(books));
  }
}

class Displaying {
  static addBooksToList(book) {
    const div = document.createElement('div');
    const h3 = document.createElement('h3');
    const h4 = document.createElement('h4');
    const button = document.createElement('button');

    div.className = 'book-div';
    h3.innerText = `Title   ${book.title}`;
    h4.innerText = `Author   ${book.author}`;
    button.innerHTML = 'remove';
    button.id = book.id;
    button.type = 'button';
    button.className = 'rmv';

    div.append(h3, h4, button);
    dynamicBooksDiv.appendChild(div);
  }

  static showBooks() {
    const booksCreated = store.getBooks();
    booksCreated.forEach((book) => Displaying.addBooksToList(book));
  }

  static clearInputs() {
    bookTitle.value = '';
    bookAuthor.value = '';
  }

  static deleteBook(book) {
    if (book.classList.contains('rmv')) {
      book.parentElement.remove();
    }
  }
}

document.addEventListener('DOMContentLoaded', Displaying.showBooks);

document.querySelector('#formContainer').addEventListener('submit', (e) => {
  e.preventDefault();
  if (bookTitle.value === '' || bookAuthor.value === '') {
    Displaying.clearInputs();
  } else {
    const book = new Book(bookTitle.value, bookAuthor.value);

    Displaying.addBooksToList(book);
    store.addBooks(book);
    Displaying.clearInputs();
  }
});

document.querySelector('.books-wrapper').addEventListener('click', (e) => {
  Displaying.deleteBook(e.target);
  store.removeBooks(e.target.id);
});
