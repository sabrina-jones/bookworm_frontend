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
      const bookData = book.data.attributes
      // render JSON response
      const bookMarkup = `
      <div data-id=${book.id}>
        <img src=${bookData.image_url} height="200" width="250">
        <h3>${bookData.title}</h3>
        <p>${bookData.category.name}</p>
        <button data-id=${bookData.id}>edit</button>
      </div>
      <br><br>`;

    document.querySelector('#book-container').innerHTML += bookMarkup;
    })
  }