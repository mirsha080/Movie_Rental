Ext.define('MovieRental.viewmodel.RentalDetailsViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.rentaldetailsviewmodel',
  
    stores: {
      rentalitems: {
        type: 'rentalitemsstore'
      }
    }
  });