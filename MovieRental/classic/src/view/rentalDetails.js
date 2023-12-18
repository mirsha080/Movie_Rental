Ext.define('MovieRental.view.rentalDetails', {
    extend: 'Ext.window.Window',
    xtype: 'rentaldetails',
    title: 'Rental Details',
    controller: 'rentalcontroller',
    viewModel: 'rentaldetailsviewmodel',
    reference: 'rentaldetails',
    id:'rentalDetailss',
    modal: true,
    referenceHolder: true, 
    width: 600,
    height: 550,
    layout: 'fit',
    items: [{
      xtype: 'panel',
      bodyPadding: 10,
      items: [
      {
        xtype: 'displayfield',
        name: 'customer',
        fieldLabel: 'Customer',
      
      }, 
      {
        text: 'Transaction Date',
        name: 'rent_date',
        dataIndex: 'rent_date',
        fieldLabel: 'Date',
        xtype: 'displayfield',
        format: 'F j, Y h:i A',
        flex: 1,
        renderer: Ext.util.Format.dateRenderer('F j, Y h:i A')
      }, 
      {
        xtype: 'displayfield',
        value: 'Movies Rented:  ',
        boxLabel: false,
        hideLabel: true,
      
    }, 
   
    // {
    //     xtype: 'button',
    //     text: 'Refresh',
    //     handler: 'refreshDetail',
    //     cls: 'custom-button',
    //   // margin: ' 0' // Add margin between the buttons above the grid
    // },
      
      {
        xtype: 'grid',
        //id: 'Grid',
        store: Ext.create('MovieRental.store.MovieStore'), 
        selModel: {
            injectCheckbox: 'first',
            checkOnly: true,
            model: 'SIMPLE',
            type: 'checkboxmodel'
        },
        reference: 'rentalItemsGrid',
        cellCls: 'center-cell',
        rowCls: 'center-row',
        height: 300,
        scrollbars: true,
        columns: [
        {
          text: 'Title',
          dataIndex: 'title',
          flex: 1,
          renderer: function(value, metaData, record) {
            return record.get('Movie').title
        },
        },
         {
          text: 'Status',
          dataIndex: 'status',
          flex: 1,
          
        },
         {
            text: 'Date Returned',
            dataIndex: 'date_returned',
            xtype: 'datecolumn',
            format: 'F j, Y h:i A',
            flex: 1,
            renderer: function(value, metaData, record) {
                if(value === '0001-01-01T00:00:00'){
                    return 
                } else {
                    var date = Ext.Date.parse(value, 'Y-m-d\\TH:i:s');
                    if (date) {
                      return Ext.util.Format.date(date, 'F j, Y');
                    }
                    return '';
                }
            },
        
          
        },
    
            // {
            //     text: 'Action',
            //     xtype: 'widgetcolumn',
            //     widget: {
            //       xtype: 'button',
            //       cls: 'return-button',
            //       iconCls: 'x-fa fa-arrow-circle-left',
            //       style: 'background-color: transparent; border-color: transparent; box-shadow: none; color: #007bff; ',
            //       handler: 'onReturnButtonClick',
            //     //   getWidgetRecord: function () {
            //     //     return this.up('grid').getRecord(); // Assuming the button is inside a grid
            //     //   }
                
            //   }
            // }
        ]
      },
    ],
    buttons: [
              {
                xtype: 'button',
                text: 'Return Movie',
                handler: 'returnMovies',
                cls: 'custom-button',
            
            },
            {
                text: 'Edit',
                handler: 'showUpdateForm',
                cls: 'custom-button'
            },
 
            {
                text: 'Delete',
                handler: 'deleteRental',
                cls: 'custom-button'
            },
 
    ],
    
    }],
    
  });
  