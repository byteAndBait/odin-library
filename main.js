function Book(author,title,haveRead,genre,release){
    this.author = author;
    this.title = title;
    this.haveRead = haveRead;
    this.genre = genre;
    this.release = release;
}

function generateBook(author,title,haveRead,genre,release){
    let book = new Book(author,title,haveRead,genre,release);
}

function displayBook(){

}

function removeBook(){
    
}


function randomID(){
    let randomID = ''
    for(let i = 0; i < 7; i++){
        randomID += (Math.round(Math.random() * 10))
    }
    return randomID;
}
