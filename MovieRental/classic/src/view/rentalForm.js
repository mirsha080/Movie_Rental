Ext.define('MovieRental.view.rentalForm', {
    extend: 'Ext.window.Window',
    xtype: 'rentalform',
    controller: 'rentalcontroller',
    viewmodel: {type:'rentalviewmodel'},
    title: 'Rental Form',
    width: 800,
    height: 250,
    layout: 'fit',
    modal: true,
    // listeners: {
    //   afterrender: 'onFormRender' // Add the afterrender event listener
    // },
  
    items: [{
      xtype: 'form',
      listeners: {
        afterrender: 'onFormRender'
      },
      reference: 'addrentalform',
      bodyPadding: 10,
      defaultType: 'textfield',
    items: [
      {
        xtype: 'combobox',
        fieldLabel: 'Customer',
        id: 'fullnameField',
        store: Ext.create('MovieRental.store.CustomerStore', { autoLoad: true }),
        queryMode: 'local',
        displayField: 'first_name',
        valueField: 'customer_id',
        name: 'customer_id',
        minChars: 1,
        anchor: '100%',
        tpl: '<tpl for="."><div class="x-boundlist-item">{[values.first_name + " " + values.last_name]}</div></tpl>',
        displayTpl: Ext.create('Ext.XTemplate',
        '<tpl for=".">',
        '{[Ext.String.htmlEncode(values.first_name)]} {[Ext.String.htmlEncode(values.last_name)]}',
        '</tpl>'
      )
       
      },
      {
        xtype: 'tagfield',
        maxHeight: 2,
        name: 'movies',
        fieldLabel: 'Movies',
        allowBlank: false,
        displayField: 'title',
        valueField: 'movie_id',
        store: Ext.create('MovieRental.store.MovieStore', {autoLoad: true}),
        queryMode: 'local',
        anchor: '100%'
      },
  
    ],
    buttons: [{
      text: 'Submit',
      handler: 'newRental',
      cls: 'custom-button'
    }]
  }]
  });
  