Ext.define('MovieRental.store.RentalItemsStore', {
    extend: 'Ext.data.Store',
    alias: 'store.rentalitemsstore',
    storeId: 'rentalItemsstore',
    model: 'MovieRental.model.RentalItemsModel',
    proxy: {
      type: 'rest',
      api: {
      create: 'https://localhost:44311/api/addmovierental',
      read: 'https://localhost:44311/api/movierentals',
      update: 'https://localhost:44311/api/updatemovierental',
      destroy: 'https://localhost:44311/api/deletemovierental'
      }, 
      actionMethods: {
        create: 'POST',
        read: 'GET',
        update: 'PUT',
        destroy: 'DELETE' 
      },
      reader: {
        type: 'json',
        rootProperty: 'data',
        headers: { 'Accept': 'application/json' },
      },
      writer: {
        type: 'json',
        writeAllFields: true
      }
    },
  
   autoSync: false
   
  });


 