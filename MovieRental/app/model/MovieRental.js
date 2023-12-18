Ext.define('MovieRental.model.MovieRentalModel', {
    extend: 'Ext.data.Model',
    fields: [
      'Id',
      'rental_id',
      'movie_id',
      'status',
      'date_returned'
     
    ],
    belongsTo: 'MovieRental.model.MovieModel'
  });