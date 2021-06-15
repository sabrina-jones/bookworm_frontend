const endPoint = "http://localhost:3000/api/v1/books"

document.addEventListener('DOMContentLoaded', () =>{ 
    //fetch and load books
    getBooks()

    // event listner and handler for create book form
    const createBookForm = document.querySelector("#create-book-form")
    
    createBookForm.addEventListener("submit", (e) => createFormHandler(e))
   });
   
   function getBooks(){
    fetch(endPoint)
    .then(response => response.json())
    .then(books => {
      books.data.forEach(book => {
        const bookMarkup = `
          <div data-id=${book.id}>
            <p>${book.attributes.category.name}</p>
            <img src=${book.attributes.image_url} height="200" width="250">
            <h3>${book.attributes.title}</h3>
            <p>${book.attributes.author}</p>
            <p>${book.attributes.overview}</p>
            <button data-id=${book.id}>edit</button>
          </div>
          <br><br>`;
          document.querySelector('#book-container').innerHTML += bookMarkup
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