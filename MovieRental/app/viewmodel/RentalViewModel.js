Ext.define('MovieRental.viewmodel.RentalViewModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.rentalviewmodel',

  stores: {
   
    rentals: {
      type: 'rentalstore'
    },
    
    rentalitems: {
      type: 'rentalitemsstore'
    }
   
  },
  
});