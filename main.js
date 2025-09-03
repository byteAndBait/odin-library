/*
we want an app that can create, remove , modify and change read status for books
all books should be listed in an array with a unique ID
then all books should be displayed in DOM
every book should have author,title , close button and read status button
every book object should have author,title, ID and read properties


we make a constructor that generates objects
then we make a function that will use the constructor and display the book
we will link the object with the object in DOM with the ID
close button will have an event listener that when clicked,
a for loop will start to identify the parent's object ID
we remove the book from DOM using ID
then remove that object from the list


we make a protoype for a method that changes the read status 
when read status button is clicked
we get the ID of the parent and call the method to change the read status  
then change the styling of the button 


*/


/*
  let book = {
  author: "boody",
  title: "shit",
  read: false,
  ID : 1343251
  }

 */


let listOfBooks = []
let containerElement = document.querySelector(".container");
let addButton = containerElement.querySelector(".addButton")
let sideForm = document.querySelector(".sideForm");
let submitButton = sideForm.querySelector(".submit")
let cancelButton = sideForm.querySelector(".cancel");

function Book(author, title, read,id){
    this.author = author;
    this.title = title;
    this.read = read;
    this.id = id
}
Book.prototype.readBook = function(){
    this.read == "Didn't Read" ?  this.read = "Have Read" : this.read = "Didn't Read";
}

addButton.addEventListener("click",()=>{
    sideForm.classList.add("open")
})

cancelButton.addEventListener("click",()=>{
    sideForm.classList.remove("open")
})

submitButton.addEventListener("click", (e)=>{
    generateBook(
    sideForm.querySelector("#bookAuthorInput").value,
    sideForm.querySelector("#bookTitleInput").value,
    sideForm.querySelector("#bookReadInput").checked ? "Have Read" : "Didn't Read"
    )
    sideForm.classList.remove("open")
})



function generateBook(author, title, read){
    if(author.length < 1 || title.length < 1){
        alert("Cant leave fields empty")
        return
    }
    let book = new Book(author, title, read , randomID());
    listOfBooks.push(book);
    let card = document.createElement("div")
    let authorElement = document.createElement("div")
    let titleElement = document.createElement("h1")
    let closeButton = document.createElement("button")
    let readButton = document.createElement("button")
        authorElement.textContent = book.author;
        titleElement.textContent = book.title;
        closeButton.textContent = "X"
        readButton.textContent = book.read

        card.appendChild(authorElement);
        card.appendChild(titleElement);
        card.appendChild(closeButton);
        card.appendChild(readButton);

        card.id = book.id;
        card.className = "card";
        containerElement.querySelector(".books").appendChild(card);

        
}








function randomID(){
    let randomID = ''
    for(let i = 0; i < 7; i++){
        randomID += (Math.round(Math.random() * 10))
    }
    return randomID;
}

