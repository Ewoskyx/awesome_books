// Book class
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  }
}
// Display component class
class Display {
  static showBooks() {
    const books = LocalData.getData(); // Get books array from local storage
    books.forEach((book) => Display.addBook(book));
  }

  static addBook(book) {
    const bookList = document.querySelector("#book-list");
    const newRow = document.createElement("tr");
    const template = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td><a href="#" class="remove-btn remove" id="${book.id}">&times</a></td>
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

class LocalData {
  static getData(){
    let booksData;
    // null check for books data ...
    if(localStorage.getItem('books') === null) {
      booksData = []
    }else {
      booksData = JSON.parse(localStorage.getItem('books'));
    }
    return booksData; // returns array of book objects ...
  }
  static addData (data){
    const bookData = LocalData.getData();
    bookData.push(data); // add book object to books array ...
    localStorage.setItem('books',JSON.stringify(bookData));
  }
  static removeData(id){ // unique id needs to be set to book object !!!
    const bookData = LocalData.getData();
    bookData.forEach((item,index)=>{
      if (item.id === id) {
        bookData.splice(index,1);
      }
    });
    localStorage.setItem('books', JSON.stringify(bookData));
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
    Display.addBook(book); // add to UI
    LocalData.addData(book); // add to Localstorage
    Display.clearInput();
});

// Remove
document.querySelector('#book-list').addEventListener('click',(e)=>{
    Display.deleteBook(e.target); // remove from UI
    LocalData.removeData(e.target.id); // remove from Localstorage
    
})
