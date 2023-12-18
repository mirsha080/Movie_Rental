Ext.define('MovieRental.model.RentalModel', {
  extend: 'Ext.data.Model',
  requires: ['MovieRental.model.CustomerModel'],
  fields: [
    'rental_id',
    'rent_date',
    'customer_id'
  ],
  associations: [
    {
      type: 'belongsTo',
      model: 'MovieRental.model.CustomerModel',
      name: 'Customer',
      associationKey: 'Customer',
      instanceName: 'Customer',
      getterName: 'getCustomer',
      setterName: 'setCustomer'
    },
    {
      type: 'hasMany',
      model: 'MovieRental.model.RentalItemsModel',
      name: 'movieRentals',
      associationKey: 'movie_rental',
      getterName: 'getMovieRentals',
      setterName: 'setMovieRentals'
  },
]
  
});