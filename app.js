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
    const newbooksList = Book.getBooks();
    newbooksList.push(book);
    localStorage.setItem('booksDetails', JSON.stringify(newbooksList));
  }

  static removeBooks(bookID) {
    const books = Book.getBooks();
    books.forEach((book, index) => {
      if (book.id === bookID) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('booksDetails', JSON.stringify(books));
  }

  static addBooksToList(book) {
    const div = document.createElement('div');
    const h3 = document.createElement('h3');
    const h4 = document.createElement('h4');
    const button = document.createElement('button');

    div.className = 'book-div';
    h3.innerText = `Title : ${book.title}`;
    h4.innerText = `Author :  ${book.author}`;
    button.innerHTML = 'remove';
    button.id = book.id;
    button.type = 'button';
    button.className = 'rmv';

    div.append(h3, h4, button);
    dynamicBooksDiv.appendChild(div);
  }

  static showBooks() {
    const booksCreated = Book.getBooks();
    booksCreated.forEach((book) => Book.addBooksToList(book));
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

document.addEventListener('DOMContentLoaded', Book.showBooks);

document.querySelector('#formContainer').addEventListener('submit', (e) => {
  e.preventDefault();
  if (bookTitle.value === '' || bookAuthor.value === '') {
    Book.clearInputs();
  } else {
    const book = new Book(bookTitle.value, bookAuthor.value);

    Book.addBooksToList(book);
    Book.addBooks(book);
    Book.clearInputs();
  }
});

document.querySelector('.books-wrapper').addEventListener('click', (e) => {
  Book.deleteBook(e.target);
  Book.removeBooks(e.target.id);
});

//styles d4
const booklistBtn = document.getElementById('booklist');
const addbookBtn = document.getElementById('addbook');
const contactinfoBtn = document.getElementById('contactinfo');
const booklistSection = document.getElementById('booklistsection');
const header = document.getElementById('header');
const inputSection = document.querySelector('.input-wrapper');
const contactinfoSection = document.querySelector('.contactinfo-section');
const booklistOpen = () => {
  booklistSection.classList.remove('dis-none');
  inputSection.classList.add('dis-none');
  booklistBtn.style.backgroundColor = 'white';
  contactinfoBtn.style.backgroundColor = 'unset';
  addbookBtn.style.backgroundColor = 'unset';
  contactinfoSection.classList.add('dis-none');
}
const addbookOpen = () => {
  booklistSection.classList.add('dis-none');
  inputSection.classList.remove('dis-none');
  booklistBtn.style.backgroundColor = 'unset';
  contactinfoBtn.style.backgroundColor = 'unset'
  addbookBtn.style.backgroundColor = 'white';
  contactinfoSection.classList.add('dis-none');
}
const contactinfoOpen = () => {
  booklistSection.classList.add('dis-none');
  inputSection.classList.add('dis-none');
  booklistBtn.style.backgroundColor = 'unset';
  contactinfoBtn.style.backgroundColor = 'white';
  addbookBtn.style.backgroundColor = 'unset';
  contactinfoSection.classList.remove('dis-none');
}
booklistBtn.addEventListener('click',booklistOpen);
addbookBtn.addEventListener('click',addbookOpen);
contactinfoBtn.addEventListener('click',contactinfoOpen);
