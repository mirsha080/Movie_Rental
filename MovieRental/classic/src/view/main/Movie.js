Ext.define('MovieRental.view.main.Movie',{

    extend: 'Ext.grid.Panel',
    xtype: 'Movie',
    controller: 'moviecontroller',
    viewModel: { type: 'movieviewmodel'},
    title: 'List of Movies',
    layout: 'fit',
    bind: {
        store: '{movies}'
    },
    height: 580,
    scrollbars: true,
    reference: 'movieGrid',
    plugins: 'gridfilters',
    columns: [
       
         {
            text: 'Title',
            dataIndex: 'title',
            flex: 2, 
            filter: {type: 'string'}
        },
       
        {
            text: 'Genre',
            dataIndex: 'genra',
            flex: 1
        }, 
     
        // {
        //     text: 'Released Date',
        //     dataIndex: 'date_released',
        //     renderer: Ext.util.Format.dateRenderer('F j, Y'),
        //     flex: 1
        // },
        {
            text: 'Cast',
            dataIndex: 'cast',
            flex: 2
        },
        {
            text: 'Available Copies',
            dataIndex: 'available_copies',
            flex: 1
        },
    ],
   
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
       
        items: [
            {
                xtype: 'button', 
                text: 'Add Movie',
                cls: 'custom-button',
                handler: 'showForm'
            }, 
            {
                xtype: 'button',
                text: 'Refresh',
                cls: 'custom-button',
                handler: 'refreshGrid'
            } , '->', {
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
        select: 'onItemSelected'
    },


});


  