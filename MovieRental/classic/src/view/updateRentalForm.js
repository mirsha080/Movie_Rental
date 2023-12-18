Ext.define('MovieRental.view.updateRentalForm', {
    extend: 'Ext.window.Window',
    xtype: 'updaterentalform',
    controller: 'rentalcontroller',
    viewmodel: {type:'rentalviewmodel'},
    title: 'Update Movie Rentals',
    reference: 'updaterentalform',
    width: 800,
    height: 300,
    layout: 'fit',
    modal: true,
    items: [{
      xtype: 'form',
    
      bodyPadding: 10,
      defaultType: 'textfield',
    items: [

        
      // {
      //   xtype: 'combobox',
      //   fieldLabel: 'Customer',
      //   // store: Ext.create('MovieRental.store.CustomerStore', { autoLoad: true }),
      //   queryMode: 'local',
      //   displayField: 'first_name',
      //   valueField: 'customer_id',
      //   name: 'customer_id',
      //   minChars: 1,
      //   readOnly: true,
      //   anchor: '100%',
      //   tpl: '<tpl for="."><div class="x-boundlist-item">{[values.first_name + " " + values.last_name]}</div></tpl>',
      //   displayTpl: Ext.create('Ext.XTemplate',
      //   '<tpl for=".">',
      //   '{[Ext.String.htmlEncode(values.first_name)]} {[Ext.String.htmlEncode(values.last_name)]}',
      //   '</tpl>'
      // )
       
      // },
      // {
      //   anchor: '100%',
      //   fieldLabel: 'Transaction Date',
      //   displayField: 'rent_date',
      //   valueField: 'rent_date',
      //   name: 'rent_date',
      //   format: 'F j, Y h:i A',
      //   readOnly: true,

      // },
      {
        xtype: 'textfield',
        fieldLabel: 'Customer',
        name: 'customer',
        allowBlank: false,
        readOnly: true,
        anchor: '100%'

      },
      {
        xtype: 'tagfield',
        reference: 'moviesTagField',
        name: 'movies',
        fieldLabel: 'Rented Movies',
        allowBlank: false,
        displayField: 'title',
        valueField: 'movie_id',
        queryMode: 'local',
        store: {
          type: 'moviestore',
          autoLoad: true
        },
       // readOnly: true,
        anchor: '100%'
      },
  
    ],
    buttons: [
    {
        text: 'Save Changes',
        handler: 'updateRental',
        // hidden: true,
        cls: 'custom-button'
    },  
    {
        text: 'Cancel',
        reference: 'cancelbtn',
        handler: 'closeupdateForm',
      //  hidden: true,
        cls: 'custom-button'
    },  
    // {
    //     text: 'Edit Movies Rented',
    //     reference: 'button',
    //     handler: 'onButtonClick',
    //     cls: 'custom-button'
    // },
        // {
        //     text: 'Delete',
        //    handler: 'deleteRental',
        //     cls: 'custom-button'
        // },
        
    ]
  }]
  });
  