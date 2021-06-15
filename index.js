const endPoint = "http://localhost:3000/api/v1/books"

document.addEventListener('DOMContentLoaded', () =>{ 
    getBooks()
   });
   
   function getBooks(){
    fetch(endPoint)
    .then(response => response.json())
    .then(books => {
      books.data.forEach(book => {
        // double check how your data is nested in the console so you can successfully access the attributes of each individual object
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