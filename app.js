const formContainer = document.getElementById('formContainer');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const addbtn = document.getElementById('add');
const dynamicBooksDiv = document.getElementById('books-wrapper');

let books = JSON.parse(localStorage.getItem('booksDetails')) || [];
console.log(books);

const addBook = (title, author, id) => {
  if(title && author){
  books.push({
    title,
    author,
    id,
  });
  localStorage.setItem('booksDetails', JSON.stringify(books));
  return { title, author, id };
}};

const createBook = ({ title, author, id }) => {
  const div = document.createElement('div');
  const h3 = document.createElement('h3');
  const h4 = document.createElement('h4');
  const button = document.createElement('button');

  div.className = 'book-div';
  h3.innerText = 'Title'+ " " +title;
  h4.innerText = 'Author'+ " " +author;
  button.innerHTML = 'remove';
  button.dataset.id = id;
  button.type = 'button';
  button.className = 'rmv';

  div.append(h3, h4, button);
  dynamicBooksDiv.appendChild(div);
};

books.forEach(createBook);

formContainer.onsubmit = (e) => {
  e.preventDefault();
  let id = Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  const newBook = addBook(bookTitle.value, bookAuthor.value, id);
  createBook(newBook);
  location.reload();
  bookTitle.value = '';
  bookAuthor.value = '';
  id = '';
};

const deleteBook = (id) => {
  books.filter((book, index) => {
    if (book.id === id) {
      return books.splice(index, 1);
    }
  });
  localStorage.setItem('booksDetails', JSON.stringify(books));
  location.reload();
};

document.querySelectorAll('.rmv').forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    deleteBook(button.dataset.id);
  });
});
