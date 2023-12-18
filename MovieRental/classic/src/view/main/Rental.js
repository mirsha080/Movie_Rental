
Ext.define('MovieRental.view.main.Rental', {
    extend: 'Ext.grid.Panel',
    xtype: 'rental',
    height: 580,
    scrollbars: true,
    selModel: {
      type: 'rowmodel',
      mode: 'SINGLE',
      enableKeyNav: false,
    
    },
    itemId: 'rentalGridId',
    reference: 'rentalGrid',
    controller: 'rentalcontroller',
    plugins: 'gridfilters',
    viewModel: { type: 'rentalviewmodel'},
    bind: {
        store: '{rentals}'
    },
    title: 'Rentals',
    columns: [
      
    {
      text: 'Transaction ID',
      dataIndex: 'rental_id',
      flex: 1
    },
    {
      text: 'Customer',
      dataIndex: 'Customer',
      renderer: function (value, metaData, record) {
        var customer = record.getCustomer();
        if (customer) {
            return customer.get('first_name') + ' ' + customer.get('last_name');
        }
        return '';
    },
      flex: 1,
  },  
    {
      text: 'Rented Movies',
      dataIndex: 'movieRentals',
      renderer: function(value, metaData, record) {
        var movieRentals = record.get('movie_rental');
        // if (movieRentals && movieRentals.length > 0) {
        //     var movieTitles = movieRentals.map(function (movieRental) {
        //         var movie = movieRental.Movie;
        //         if (movie && movie.title) {
        //             return movie.title;
        //         }
        //         return '';
        //     });
        //     return movieTitles.join(', ');
        // }
        //return '';
        return movieRentals.length
    },
    
      flex: 1
    },
    {
      text: 'Returned Movies',
      dataIndex: 'movieRentals',
      renderer: function(value, metaData, record) {
        var movieRentals = record.get('movie_rental');
        var countReturned = 0;
        if (movieRentals && movieRentals.length > 0) {
          movieRentals.forEach(function(movieRental) {
            if (movieRental.status === 'Returned') {
              countReturned++;
            }
          });
        }
        return countReturned; 
    },
    
      flex: 1
    },
    {
      text: 'Transaction Date',
      dataIndex: 'rent_date',
      xtype: 'datecolumn',
      format: 'F j, Y h:i A',
      flex: 1,
      renderer: Ext.util.Format.dateRenderer('F j, Y h:i A')
    },
    
    ],

      dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
       
        items: [
          
            {
                xtype: 'button', 
                text: 'New Rental',
                cls: 'custom-button',
                handler: 'showForm'
            }, 
            {
                xtype: 'button',
                text: 'Refresh',
                cls: 'custom-button',
                handler: 'refreshGrid'
            },  '->', {
              xtype: 'textfield',
              emptyText: 'Search...',
              reference: 'searchField',
              width: 200,
              enableKeyEvents: true,
              listeners: {
                  keyup: 'onSearchKeyUp'
              }
          }, {
              xtype: 'button',
              text: 'Search',
              cls: 'custom-button',
              handler: 'onSearchButtonClick'
          } 

        ]
    }],
    listeners: {
      afterrender: 'onGridRender',
      select: 'onItemClicked'
  },
    
});
