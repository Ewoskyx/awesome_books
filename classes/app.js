// Book class
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}
// Display component class
class Display {
  static showBooks() {
    const booksData = [
      {
        title: 'Book1',
        author: 'Author1',
      },
      {
        title: 'Book2',
        author: 'Author2',
      },
    ];
    const books = booksData;
    books.forEach((book) => Display.addBook(book));
  }

  static addBook(book) {
    const bookList = document.querySelector("#book-list");
    const newRow = document.createElement("tr");
    const template = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td><a href="#" class="remove-btn remove">&times</a></td>
      `;
    newRow.innerHTML = template;
    bookList.appendChild(newRow);
  }

  static deleteBook (element) {
    if (element.classList.contains('remove')) {
        element.parentElement.parentElement.remove();
    }
  }

  static clearInput () {
    const title = document.querySelector('#title').value = '';
    const author = document.querySelector('#author').value = '';
  }
}

// Events

// Display
document.addEventListener('DOMContentLoaded',Display.showBooks)

// Add
document.querySelector('#input-form').addEventListener('submit', (e)=>{
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const book = new Book(title,author);
    Display.addBook(book);
    Display.clearInput();
});

// Remove
document.querySelector('#book-list').addEventListener('click',(e)=>{
    Display.deleteBook(e.target);
})
