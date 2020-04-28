document.addEventListener("DOMContentLoaded", function() {
    renderBooks()
});

function fetchBooks(){
    return fetch("http://localhost:3000/books")
    .then(function(response){
        return response.json()
    })
}

function renderBooks(){
    fetchBooks()
    .then(function(books){
       for (let i = 0; i < books.length; i++)
        renderBook(books[i])
    })
}
const theUl = document.querySelector("#list-panel")
const theShowDiv = document.querySelector("#show-panel")



function renderBook(book){
    
    let theImg = document.createElement("img")
    theImg.src = book.img_url
    const theLi = document.createElement("li")
    theLi.innerText = book.title
    theLi.appendChild(theImg)
    theUl.appendChild(theLi)
    
   

    theLi.addEventListener("click", function(e){
        showBook(book)
        })
    } 


function showBook(book){
    theShowDiv.innerText = ""
        const newDiv = document.createElement("div")
        const theShowUl = document.createElement("ul")
        theShowDiv.append(theShowUl, newDiv)
        likeButton(book)
        newDiv.innerText = book.description;
        book.users.forEach(user => {
            const userLi = document.createElement("li")
            userLi.innerText = user.username
            theShowUl.appendChild(userLi) 
})
}

function likeButton(book){
    const currentUser = {"id":1, "username":"pouros"}
    const allUsers = [...book.users, currentUser]
    console.log(book)
    const configObj = {method: "PATCH",
headers:{
Accept: "application/json",
"Content-type": "application/json"},
body: JSON.stringify({
    users: allUsers
}) 
}
    const likeBtn = document.createElement("button")
    likeBtn.innerText = "Like"
    theShowDiv.appendChild(likeBtn)
    likeBtn.addEventListener("click", function(e){
        fetch(`http://localhost:3000/books/${book.id}`, configObj)
        .then(function(response){
            return response.json()
        })
        .then(function(book){
            return showBook(book)   
        })
    })
}



