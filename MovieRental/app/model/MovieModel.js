Ext.define('MovieRental.model.MovieModel',{
    extend: 'Ext.data.Model',
    alias: 'model.moviemodel',
    fields: [
        'movie_id',
        'title',
        'genra',
        'cast',
        'date_released',
        'number_of_copies',
        'available_copies',
        'rented_copies'
    ],
   
   
})