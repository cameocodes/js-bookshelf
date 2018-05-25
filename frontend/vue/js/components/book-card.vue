<template>
  <div class="col s12 m6">
    <div class="card blue-grey darken-1">
      <div class="card-content white-text">
        <span class="card-title">{{book.title}}</span>
        <p>{{book.description}}</p>
      </div>
      <div class="card-action">
        <a on:click.prevent='deleteBook(book.id)'>Delete Book</a>
      </div>
    </div>
  </div>

</template>

<script>
module.exports={
    name: 'book-card',
    props: ['book', 'delete-book']
}
</script>