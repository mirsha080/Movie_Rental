Ext.define('MovieRental.viewmodel.RentalItemsViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.rentalitemsviewmodel',
  
    stores: {
      rentalitems: {
        type: 'rentalitemsstore'
      }
    },
  });