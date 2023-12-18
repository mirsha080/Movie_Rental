Ext.define('MovieRental.viewmodel.MovieViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.movieviewmodel',
    stores: {
      movies: {
        type: 'moviestore',
      }
    },
  });