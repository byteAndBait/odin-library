let formElement = document.querySelector(".bookForm")
let booksGridElement = document.querySelector(".booksGrid")
let dialog = document.querySelector(".dialog") 
let listOfBooks = [];

function Book(author,title,haveRead,genre,release,numberOfPages,id){
    this.author = author;
    this.title = title;
    this.haveRead = haveRead;
    this.genre = genre;
    this.release = release;
    this.numberOfPages = numberOfPages;
    this.id = id;
}

Book.prototype.toggleRead = function(){
  this.read = this.read == "read" ? "unread" : "read"
}
formElement.addEventListener("submit" , (e)=>{
    e.preventDefault();
    dialog.close();
    
    generateBook(
        formElement.querySelector("input[name='title']").value,
        formElement.querySelector("input[name='author']").value,
        formElement.querySelector("input[name='haveRead']").checked ? "read" : "unread",
        formElement.querySelector("select[name='genre']").value,
        formElement.querySelector("input[name='release']").value,
        formElement.querySelector("input[name='numberOfPages']").value
    )

})
function generateBook(author,title,haveRead,genre,release,numberOfPages){
    let book = new Book(author,title,haveRead,genre,release,numberOfPages,randomID());
    listOfBooks.push(book);
    displayBook(book)
}

function displayBook(book){
        let card = document.createElement("div")
        card.dataset.id = book.id
        card.innerHTML = `
    <div class="upperBorder">
          <div class="author">by ${book.author}</div>
          <div class="release">${book.release}</div>
      </div>
      <h1 class="title">
        ${book.title}
      </h1>
      <div class="genre">
        ${book.genre}
      </div>
      <div class="numberOfPages">
        No. of pages <span>${book.numberOfPages}</span>
      </div>
      <div class="buttons">
        <button class="deleteBook">Delete</button>
        <button class="read">${book.haveRead == "read" ? "unread" : "read"}</button>
      </div>
    </div>
        `
        booksGridElement.appendChild(card)
}

booksGridElement.addEventListener("click", (e)=>{

  if(e.target.classList.contains("deleteBook")){
  removeBook(e)
}else if(e.target.classList.contains("read")){
  toggleReadStatus(e);
}

})

function removeBook(e){
    let currentBookIndex = listOfBooks.findIndex((o) => o.id == e.target.parentElement.parentElement.dataset.id);
    listOfBooks.splice(currentBookIndex,1);
    e.target.parentElement.parentElement.remove();
}

function toggleReadStatus(e){
    let currentBook = listOfBooks[listOfBooks.findIndex((o) => o.id == e.target.parentElement.parentElement.dataset.id)];
    currentBook.toggleRead();
    e.target.textContent = currentBook.read;
}

function randomID(){
    let randomID = ''
    for(let i = 0; i < 7; i++){
        randomID += (Math.round(Math.random() * 10))
    }
    return randomID;
}
