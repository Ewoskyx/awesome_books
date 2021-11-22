const bookTitle = document.getElementById('title');
const formContainer = document.getElementById('formContainer');
const bookAuthor = document.getElementById('author');
const addbtn = document.getElementById('add');
const dynamicBooksDiv = document.getElementById('books-wrapper');

let books = JSON.parse(localStorage.getItem('books')) || [];
console.log(books);

const showBooks = () => {
  books.map((book) => {
    const bookTest = `
    <div class='book-div'>
    <h4><strong>Title:</strong> ${book.title}</h4>
    <h4>Author: ${book.author}</h4>
    <button type='button'  class="rmv-btn" data-delete=${book.id}>Remove</button>
    `;
    return dynamicBooksDiv.insertAdjacentHTML('beforeend', bookTest);
  });
};

const addBook = (title, author, id) => {
  books.push({
    title,
    author,
    id,
  });

  localStorage.setItem('books', JSON.stringify(books));

  return { title, author, id };
};

formContainer.onsubmit = (e) => {
  const newBook = addBook(
    bookTitle.value,
    bookAuthor.value,
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1),
  );

};

window.onload = showBooks;

const removeBook = (bookId) => {
  books = books.filter((book) => book.id !== bookId);
};
const rmvBtn = document.querySelector('.rmv-btn');
dynamicBooksDiv.addEventListener('click', (r) => {
  if (r.target.classList.contains('rmv-btn')) {
    r.target.parentElement.remove();
    removeBook(r.target.id);
    localStorage.removeItem(books[0])
  }
});
