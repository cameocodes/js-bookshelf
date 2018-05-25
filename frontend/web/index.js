// 1. fetchBooks async function
// 2. addBooksToList(books) function
// 3. add a submit event listener to form 
// 4. submitBook or submitForm
// another tip: don’t submit data if any form field is empty
// tip: reset form if successfull
// 5. postBook async function
// 6. prepend new book to bookList 
const bookList = document.getElementById('book-list')

    function createBookItem(book) {
        const bookDiv = document.createElement('div')
        const bookDataDiv = document.createElement('div')
        const buttonDiv = document.createElement('div')
        const titleSpan = document.createElement('span')

        bookDiv.dataset.id = book.id
        buttonDiv.classList.add('right-align')
        
        const viewButton = document.createElement('a')
        viewButton.classList.add('waves-effect', 'waves-light', 'btn', 'indigo', 'btnDelete')
        viewButton.innerText = 'VIEW'
        viewButton.id = book.id

        titleSpan.classList.add('card-title')
        titleSpan.textContent = book.title

        // const descriptionElement = document.createElement('p')
        // descriptionElement.textContent = book.description
    
        // const isbnElement = document.createElement('p')
        // isbnElement.textContent = `IBSN: ${book.isbn}`

        buttonDiv.appendChild(viewButton)

        bookDataDiv.appendChild(titleSpan)
        // bookDataDiv.appendChild(descriptionElement)
        // bookDataDiv.appendChild(isbnElement)

        bookDiv.appendChild(bookDataDiv)
        bookDiv.appendChild(buttonDiv)
        return bookDiv
    }

    async function fetchBooks(){
        const response = await fetch('http://localhost:3000/books')
        const books = await response.json()
        return books
    }

    fetchBooks()
        .then(addToBookList)
        .catch(err => console.log(err.message))


    function addToBookList(books) {
        books.forEach(book => {
            const outerDiv = document.createElement('div')
            const innerDiv = document.createElement('div')
            // const bookList = document.getElementById('book-list')

            outerDiv.classList.add('card', 'grey', 'lighten-2')
            innerDiv.classList.add('card-content')

            innerDiv.appendChild(createBookItem(book))
            outerDiv.appendChild(innerDiv)
            bookList.insertAdjacentElement('afterbegin', outerDiv)
        })
    }

                                                                                                    // SUBMIT BOOK

    const form = document.querySelector('form')
    form.addEventListener('submit', submitBook)

    function submitBook(e){
        e.preventDefault();
        const form = e.target.elements;
        const newBook = {
            title: form.title.value,
            description: form.description.value,
            isbn: form.isbn.value
        }
        
        postBook(newBook)
            .then(fetchBooks)
            .then(addToBookList)
            .catch(err => console.log(err.message))
    }

    async function postBook(newBook){
        const url = 'http://localhost:3000/books';
        const options = {method: 'POST', // or 'PUT'
            body: JSON.stringify(newBook),
            headers: {
            'Content-Type': 'application/json'
            }}
        const response = await fetch(url, options)
        const book = await response.json()
        return book;
    }


                                                                                                        // DELETE BOOK
    // bookList.addEventListener("click", function(e) {
    //     if(e.target && e.target.nodeName == "A") {
    //         const bookID = e.target.id;
    //         const bookDivToDelete = e.target.offsetParent
    //     deleteBook(bookID)
    //         .then(bookID => {
    //             bookList.removeChild(bookDivToDelete)
    //         })
    //         .catch(err => console.log(err.message))
    //     }
    // }, false);


    async function deleteBook(bookID){
        const url = `http://localhost:3000/books/${bookID}`;
        const options = {method: 'DELETE', // or 'PUT'
        }
        await fetch(url, options)
        return bookID
    }

    // function removeBookFromList(book){
        
    // }


                                                                                                        // VIEW BOOK

    bookList.addEventListener("click", function(e) {
        if(e.target && e.target.nodeName == "A") {
            const bookID = e.target.id;
            fetchBook(bookID)
                .then(displayBook)
                .catch(err => console.log(err.message))
        }
    }, false);

    async function fetchBook(book){
        const response = await fetch(`http://localhost:3000/books/${book}`)
        const bookDetails = await response.json()
        return bookDetails
    }

    function createBookDisplay(book){
        const viewBookDiv = document.createElement('div')
        const viewTitleSpan = document.createElement('span')
        const viewBookDataDiv = document.createElement('div')

        viewBookDiv.dataset.id = book.id

        viewTitleSpan.classList.add('card-title')
        viewTitleSpan.textContent = book.title

        const viewISBN = document.createElement('p')
        const viewDescription = document.createElement('p')

        viewDescription.innerText = book.description;
        viewISBN.innerText = book.isbn;

        viewBookDataDiv.appendChild(viewDescription)
        viewBookDataDiv.appendChild(viewISBN)

        viewBookDiv.appendChild(viewTitleSpan)
        viewBookDiv.appendChild(viewBookDataDiv)
        return viewBookDiv
    }

    function displayBook(book){
        const outerDiv = document.createElement('div')
        const innerDiv = document.createElement('div')
        const displayDiv = document.getElementsByClassName('view-book').item(0)
        const bookDivToDelete = document.querySelectorAll(`[data-id='${book.id}']`).parentNode
        console.log(bookDivToDelete)
        outerDiv.classList.add('card', 'grey', 'lighten-2')
        innerDiv.classList.add('card-content')

        const delButton = document.createElement('a')
        delButton.classList.add('waves-effect', 'waves-light', 'btn', 'indigo', 'btnDelete')
        delButton.innerText = 'DELETE'
        delButton.id = book.id
        delButton.addEventListener("click", function() {
                deleteBook(book.id)
                .then(() => {
                    displayDiv.innerHTML = ""
                })
                .then(() => {
                    bookList.removeChild(bookDivToDelete)
                })
                .catch(err => console.log(err.message))
            }, false);

        innerDiv.appendChild(createBookDisplay(book))
        innerDiv.appendChild(delButton)
        outerDiv.appendChild(innerDiv)
        displayDiv.innerHTML = "";
        displayDiv.appendChild(outerDiv)

        
        
    }