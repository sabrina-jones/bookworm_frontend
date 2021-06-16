class Book {
    constructor(book, bookAttributes){
        this.id = book.id
        this.title = bookAttributes.title
        this.author = bookAttributes.author
        this.image_url = bookAttributes.image_url
        this.overview = bookAttributes.overview
        this.category = bookAttributes.category
        Book.all.push(this)
    } 

     renderBook() {
        return `
        <div data-id=${this.id}>
            <p>${this.category.name}</p>
            <p>${this.title}</p>
            <p>${this.author}</p>
            <img src=${this.image_url} height="200" width="250">
            <p>${this.overview}</p>
            <button data-id=${this.id}>edit</button>
        </div>
        <br><br> `
     }
}
 
Book.all = [];