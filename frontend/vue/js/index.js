window.addEventListener('DOMContentLoaded', main)

function main() {
    httpVueLoader.register(Vue, './js/components/book-card.vue');
    httpVueLoader.register(Vue, './js/components/books-list.vue');
    httpVueLoader.register(Vue, './js/components/loader.vue');

    new Vue ({
        el: '#app',
        
        data() {
            return {
                books: [],
                book: {
                    id: 1,
                    title: 'The Cat In The Hat',
                    description: 'About a cat. In a hat',
                    isbn: '9483657697'
                }
            }
        },
        created() {
            this.fetchBooks()
        },
        methods: {
            async fetchBooks(){
                try {
                    const response = await fetch('http://localhost:3000/books')
                    const books = await response.json()
                    this.books = books
                } catch(err) {
                    console.error(err)
                }
            },
            postBook(book){
                const options = {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(book)
                }
                fetch('http://localhost:3000/books')
                    .then(response => response.json())
                    .then(book => {
                        this.books = this.books.concat(book)
                    })
                    .catch(err => {
                        console.error(err)
                    })
            },
            deleteBook(id){
                const options = {
                    method: 'delete'
                }
                const url = `http://localhost:3000/books/${id}`
                fetch(url, options)
                    .then(response => response.json())
                    .then(book => {
                        this.books = this.books.filter(b => b.id != book.id)
                    })
                    .catch(err => console.error(err))
            }
        }
    })
}