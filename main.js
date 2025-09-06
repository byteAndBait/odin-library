let formElement = document.querySelector(".bookForm");
let unreadSectionElement = document.querySelector(".unreadSection");
let readSectionElement = document.querySelector(".readSection");

let dialog = document.querySelector(".dialog");
let listOfBooks = [];
function Book(title, author, read, genre, release, numberOfPages, id) {
  this.title = title;
  this.author = author;
  this.read = read;
  this.genre = genre;
  this.release = release;
  this.numberOfPages = numberOfPages;
  this.id = id;
}

Book.prototype.toggleRead = function () {
  this.read = this.read ? false : true;
};
formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  dialog.close();

  generateBook(
    formElement.querySelector("input[name='title']").value,
    formElement.querySelector("input[name='author']").value,
    formElement.querySelector("input[name='read']").checked,
    formElement.querySelector("select[name='genre']").value,
    formElement.querySelector("input[name='release']").value,
    formElement.querySelector("input[name='numberOfPages']").value
  );
});
function generateBook(author, title, read, genre, release, numberOfPages) {
  let book = new Book(
    author,
    title,
    read,
    genre,
    release,
    numberOfPages,
    randomID()
  );
  listOfBooks.push(book);
  displayBook(book);
}

function displayBook(book) {
  let card = document.createElement("div");
  card.dataset.id = book.id;
  card.classList.add("card");
  card.innerHTML = `
    
      <div class="release">${book.release}</div>
<i class="deleteBook fa-solid fa-trash-can"></i>
      <h1 class="title">
        ${book.title}
      </h1>
      
      <div class="bottomBorder">
    <div class="author">
          by: 
          ${book.author}</div>

      <div class="genre">
        ${book.genre}
      </div>
      <div class="numberOfPages">
        No. of pages: <span>${book.numberOfPages}</span>
      </div>
        
        <button class="read">${
          book.read
            ? `<i class="fa-solid fa-book-open"></i>You have read it already`
            : `<i class="fa-solid fa-book"></i> You didn't read it`
        }</button>
      </div>

    </div>
        `;
      handleDOMReadStatus(book,card)
}

function handleDeletion(e) {
  if (e.target.classList.contains("deleteBook")) {
    removeBook(e);
  } else if (e.target.classList.contains("read")) {
    toggleReadStatus(e);
  }
}
unreadSectionElement.addEventListener("click", (e) => handleDeletion(e));
readSectionElement.addEventListener("click", (e) => handleDeletion(e));

function removeBook(e) {
  let currentBookIndex = listOfBooks.findIndex(
    (o) => o.id == e.target.parentElement.dataset.id
  );
  console.log(e.target.parentElement);
  listOfBooks.splice(currentBookIndex, 1);
  e.target.parentElement.remove();
}

function toggleReadStatus(e) {
  let cardElement = e.target.parentElement.parentElement;
  let currentBook =
    listOfBooks[listOfBooks.findIndex((o) => o.id == cardElement.dataset.id)];
  currentBook.toggleRead();
  handleDOMReadStatus(currentBook,cardElement)
  e.target.innerHTML = currentBook.read
    ? `<i class="fa-solid fa-book-open"></i>You have read it already`
    : `<i class="fa-solid fa-book"></i> You didn't read it`;
}

function handleDOMReadStatus(book, element){
  if (book.read) {
    readSectionElement.appendChild(element);
    element.querySelector(".read").classList.add("haveRead");
  } else {
    unreadSectionElement.appendChild(element);
    element.querySelector(".read").classList.remove("haveRead");
  }
}

function randomID() {
  let randomID = "";
  for (let i = 0; i < 7; i++) {
    randomID += Math.round(Math.random() * 10);
  }
  return randomID;
}
function getRandomNumber(max) {
  return Math.round(Math.random() * max);
}

generateBook(
  "How to master Web Development",
  "Abdulrahman",
  false,
  "CS",
  2025,
  getRandomNumber(300)
);
generateBook(
  "Motivation and Mindset",
  "The Odin Project",
  true,
  "CS",
  2025,
  getRandomNumber(300)
);