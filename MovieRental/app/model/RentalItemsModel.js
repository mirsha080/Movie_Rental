Ext.define('MovieRental.model.RentalItemsModel', {
    extend: 'Ext.data.Model',
    alias: 'model.rentalitemsmodel',
    storeId: 'rentalitems',
    fields: [
        'items_id',
        'rental_id',
        'movie_id',
        'status',
        'date_returned'
    ],
   
    // associations: [
    //     {
    //         type: 'belongsTo',
    //         model: 'MovieRental.model.MovieModel',
    //         name: 'movie',
    //         reference: 'MovieModel',
           
    //     },
    //     {
    //         type: 'belongsTo',
    //         model: 'MovieRental.model.RentalModel',
    //         name: 'rental',
    //         reference: 'RentalModel',
     
    //     }
    // ]

    // belongsTo: 'MovieRental.model.RentalModel',
    // associations: [
    //     {
    //         type: 'hasOne',
    //         model: 'MovieRental.model.MovieModel',
    //         getterName: 'getMovie',
    //         setterName: 'setMovie',
    //         associationKey: 'Movie'
    //     }
    // ]
});