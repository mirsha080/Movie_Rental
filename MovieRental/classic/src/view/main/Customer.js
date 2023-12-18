Ext.define('MovieRental.view.main.Customer', {
    extend: 'Ext.grid.Panel',
    xtype: 'Customer',
    controller: 'customercontroller',
    viewModel: { type: 'customerviewmodel'},
    title: 'List of Customers',
    layout: 'fit',
    bind: {
        store: '{customer}'
    },
    height: 580,
    scrollbars: true,
    reference: 'customerGrid',
    plugins: 'gridfilters',
    columns: [
       
         {
            text: 'Name',
            dataIndex: 'full_name',
            flex: 1,
           
            renderer: function(value, metaData, record) {
                var firstName = record.get('first_name');
                var lastName = record.get('last_name');
                return firstName + ' ' + lastName;
              },
              filter: {
                type: 'string',
                dataIndex: 'first_name',  // Apply the filter to the 'first_name' field
                updateBuffer: 300
            },
        },
       
        {
            text: 'Contact Number',
            dataIndex: 'contact_num',
            flex: 1
        }, 
     
        {
            text: 'Address',
            dataIndex: 'address',
            flex: 1
        },
       
    ],
   
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
       
        items: [
            {
                xtype: 'button', 
                text: 'Add Customer',
                cls: 'custom-button',
                handler: 'showForm'
            }, 
            {
                xtype: 'button',
                text: 'Refresh',
                cls: 'custom-button',
               handler: 'refreshGrid'
            }, '->', {
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
  