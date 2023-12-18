Ext.define('MovieRental.viewmodel.CustomerViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.customerviewmodel',
    stores: {
      customer: {
        type: 'customerstore',
      }
    },
    autoLoad: true
    
  });


  