const formElement = document.querySelector(".bookForm");
const unreadSectionElement = document.querySelector(".unreadSection");
const readSectionElement = document.querySelector(".readSection");

const dialogElement = document.querySelector(".dialog");
const listOfBooks = [];

class Book {
  static #isConstructable = false;

  constructor(title, author, read, genre, release, numberOfPages, id) {
    if (!Book.#isConstructable) {
      throw new TypeError("Book is not constructable");
    }
    Book.#isConstructable = false
    this.title = title;
    this.author = author;
    this.read = read;
    this.genre = genre;
    this.release = release;
    this.numberOfPages = numberOfPages;
    this.id = id;
  }
  toggleInternalReadProperty() {
    this.read = this.read ? false : true;
  }
  static generateBook(title, author, read, genre, release, numberOfPages, id) {
    Book.#isConstructable = true;
    let generatedBook = new Book(title, author, read, genre, release, numberOfPages, id)
    listOfBooks.push(generatedBook);
    displayBook(generatedBook);
  }
}

class Library {
  
}
formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  dialogElement.close();

  Book.generateBook(
    formElement.querySelector("input[name='title']").value,
    formElement.querySelector("input[name='author']").value,
    formElement.querySelector("input[name='read']").checked,
    formElement.querySelector("select[name='genre']").value,
    formElement.querySelector("input[name='release']").value,
    formElement.querySelector("input[name='numberOfPages']").value,
    crypto.randomUUID()
  );
});


function displayBook(book) {
  
  let card = document.createElement("div");
  card.dataset.id = book.id;
  card.classList.add("card");
  const release = document.createElement("div");
  release.className = "release";
  release.textContent = book.release;
  card.appendChild(release);

  const deleteBtn = document.createElement("i");
  deleteBtn.className = "deleteBook fa-solid fa-trash-can";
  card.appendChild(deleteBtn);

  const title = document.createElement("h1");
  title.className = "title";
  title.textContent = book.title;
  card.appendChild(title);

  const bottomBorder = document.createElement("div");
  bottomBorder.className = "bottomBorder";

  const author = document.createElement("div");
  author.className = "author";
  author.textContent = `by: ${book.author}`;
  bottomBorder.appendChild(author);

  const genre = document.createElement("div");
  genre.className = "genre";
  genre.textContent = book.genre;
  bottomBorder.appendChild(genre);

  const pages = document.createElement("div");
  pages.className = "numberOfPages";
  pages.innerHTML = `No. of pages: <span>${book.numberOfPages}</span>`;
  bottomBorder.appendChild(pages);

  const readBtn = document.createElement("button");
  readBtn.className = "read";
  readBtn.textContent = book.read
    ? `📖 You have read it already`
    : `📘 You didn't read it`;
  bottomBorder.appendChild(readBtn);

  card.appendChild(bottomBorder);
  handleDOMReadStatus(book, card);
  handleDOMReadStatus(book, card)
}


document.querySelector("main.libraryBody").addEventListener("click", (e)=>{
  if (e.target.classList.contains("deleteBook")) {
    removeBook(e);
    return;
  }
  if (e.target.classList.contains("read")) {
    toggleReadStatus(e);
    return;
  }
})

function removeBook(e) {
  let currentBookIndex = listOfBooks.findIndex(
    (book) => book.id == e.target.parentElement.dataset.id
  );
  listOfBooks.splice(currentBookIndex, 1);
  e.target.parentElement.remove();
}

function toggleReadStatus(e) {
  let cardElement = e.target.parentElement.parentElement;
  let currentBookIndex = listOfBooks.findIndex((book) => book.id == cardElement.dataset.id)
  let currentBook = listOfBooks[currentBookIndex];
  currentBook.toggleInternalReadProperty();
  handleDOMReadStatus(currentBook, cardElement)
  e.target.textContent = currentBook.read
    ? `📖 You have read it already`
    : `📘 You didn't read it`;
}

function handleDOMReadStatus(bookObject, element) {
  if (bookObject.read) {
    readSectionElement.appendChild(element);
    element.querySelector(".read").classList.add("haveRead");
  } else {
    unreadSectionElement.appendChild(element);
    element.querySelector(".read").classList.remove("haveRead");
  }
}


Book.generateBook(
  "How to master Web Development",
  "Abdulrahman",
  false,
  "CS",
  2025,
  231,
  crypto.randomUUID()
);

Book.generateBook(
  "Motivation and Mindset",
  "The Odin Project",
  true,
  "CS",
  2025,
  23,
  crypto.randomUUID()
);