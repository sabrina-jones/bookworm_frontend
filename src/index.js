const endPoint = "http://localhost:3000/api/v1/books"

document.addEventListener('DOMContentLoaded', () =>{ 
    //fetch and load books
    getBooks()

    //event listner and handler for create book form
    const createBookForm = document.querySelector("#create-book-form")

    createBookForm.addEventListener("submit", (e) => createFormHandler(e))

    //event listner for deleting book
    const bookContainer = document.getElementById("book-container")

    bookContainer.addEventListener("click", deleteBookHandler)
    
    //event listner for dark mode
    const darkModeButton = document.getElementById("dark-mode")

    darkModeButton.addEventListener("click", toggleScreenColor)

   });
   
   function getBooks(){
    fetch(endPoint)
    .then(response => response.json())
    .then(books => {
      books.data.forEach(book => {
        let newBook = new Book(book, book.attributes);
        document.querySelector('#book-container').innerHTML += newBook.renderBook()
        })
   })
}

function createFormHandler(e) {
    e.preventDefault()
    const titleInput = document.querySelector('#input-title').value
    const authorInput = document.querySelector('#input-author').value
    const overviewInput = document.querySelector('#input-overview').value
    const imageInput = document.querySelector('#input-url').value
    const categoryId = parseInt(document.querySelector('#categories').value)
    postFetch(titleInput, authorInput, overviewInput, imageInput, categoryId)
  }

  function postFetch(title, author, overview, image_url, category_id) {
    fetch(endPoint, {
      // POST request
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        title: title, 
        author: author, 
        overview: overview, 
        image_url: image_url, 
        category_id: category_id,
    })
  })
    .then(response => response.json())
    .then(book => {
      console.log(book);
      const bookData = book.data
      let newBook = new Book(bookData, bookData.attributes)
     document.querySelector('#book-container').innerHTML += newBook.renderBook()
    })
  }
  
    function deleteBookHandler(e) {
      e.preventDefault()
      const id =  e.target.parentElement.dataset.id
      const url = endPoint + "/" + id
          fetch(url, {
              method: "DELETE"
          })
        e.target.parentElement.remove()
    }

    function toggleScreenColor (e){
      if (document.body.style.backgroundColor == "white" || document.body.style.backgroundColor == "" ){
        document.body.style.backgroundColor = "black"
        document.body.style.color = "white"
      }
      else {
        document.body.style.backgroundColor = "white"
        document.body.style.color = "black"
      }
      
    }

    
    // notes on arrow function variations

    //variation 1
    // const toggleScreenColor = (e) => 'hi'

    // variation 2
    // const toggleScreenColor = (e) => {
    //   if (document.body.style.backgroundColor == "white" || document.body.style.backgroundColor == "" ){
    //     document.body.style.backgroundColor = "black"
    //     document.body.style.color = "white"
    //   }
    //   else {
    //     document.body.style.backgroundColor = "white"
    //     document.body.style.color = "black"
    //   }
    // }