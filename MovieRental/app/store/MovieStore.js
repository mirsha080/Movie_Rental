Ext.define('MovieRental.store.MovieStore',{
    extend: 'Ext.data.Store',
    alias: 'store.moviestore',
    model: 'MovieRental.model.MovieModel',
    storeId: 'moviesStore',
    proxy: {
        type: 'rest',
        api: {
        create: 'https://localhost:44311/api/addmovie',
        read: 'https://localhost:44311/api/movies',
        update: 'https://localhost:44311/api/updatemovie',
        destroy: 'https://localhost:44311/api/deletemovie'
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
        }
      },
    
     autoSync: false
  
     
     
});


