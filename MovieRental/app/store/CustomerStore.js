Ext.define('MovieRental.store.CustomerStore',{
    extend: 'Ext.data.Store',
    alias: 'store.customerstore',
    model: 'MovieRental.model.CustomerModel',
    proxy: {
        type: 'rest',
        api: {
            create: 'https://localhost:44311/api/addcustomer',
            read: 'https://localhost:44311/api/customers',
            update: 'https://localhost:44311/api/updatecustomer',
            destroy: 'https://localhost:44311/api/deletecustomer'
        }, 
        actionMethods: {
          create: 'POST',
          read: 'GET',
          update: 'PUT',
          destroy: 'DELETE' 
        },
        useDefaultXhrHeader: false,
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
    
     autoSync: false,
     
    
});


