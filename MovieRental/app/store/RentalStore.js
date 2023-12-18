Ext.define('MovieRental.store.RentalStore', {
    extend: 'Ext.data.Store',
    alias: 'store.rentalstore',
    model: 'MovieRental.model.RentalModel',
    storeId: 'rentalStore',
    proxy: {
      type: 'rest',
      api: {
      create: 'https://localhost:44311/api/addrental',
      read: 'https://localhost:44311/api/rentals',
      update: 'https://localhost:44311/api/updaterental',
      destroy: 'https://localhost:44311/api/deleterental'
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
        totalProperty: 'total',
        headers: { 'Accept': 'application/json' },
      },
      writer: {
        type: 'json',
        writeAllFields: true
      },
      
    },
  
   autoSync: false,
  
   
  });