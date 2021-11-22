const bookTitle = document.getElementById("title");
const bookAuthor = document.getElementById("author");
const addbtn = document.getElementById("add");
const dynamicBooksDiv = document.getElementById("books-wrapper");

let books = [];

function addBook() {
  const book = {
    title: bookTitle.value,
    author: bookAuthor.value,
  };
  books.push(book);
  localStorage.setItem("Books", JSON.stringify(books));
}

addbtn.addEventListener("click", (e) => {
  e.preventDefault();
  addBook();
  showBooks();
});

function showBooks() {
  let data = localStorage.getItem("Books");
  data = JSON.parse(data);
  const lastAddedBook = data[data.length - 1];
  dynamicBooksDiv.innerHTML += `
      <div class='book-div'>
       <h4><strong>Title:</strong> ${lastAddedBook.title}</h4>
       <h4>Author: ${lastAddedBook.author}</h4>
       <button>Remove</button>
      </div>
      `;
}
