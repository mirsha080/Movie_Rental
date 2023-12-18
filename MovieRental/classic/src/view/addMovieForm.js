Ext.define('MovieRental.view.addMovieForm', {
    extend: 'Ext.window.Window',
    xtype: 'addmovieform',
    controller: 'moviecontroller',
    viewModel: { type: 'movieviewmodel'},
    title: 'Add Movie',
    width: 800,
    height: 400,
    layout: 'fit',
    modal: true,
    items: [{
      xtype: 'form',
      reference: 'addmovieform',
      bodyPadding: 10,
      defaultType: 'textfield',
      items: [
      {
        
        fieldLabel: 'Title',
        name: 'title',
        allowBlank: false,
        anchor: '100%'
      }, {
        fieldLabel: 'Cast',
        name: 'cast',
        allowBlank: false,
        anchor: '100%'
      },
      {
        fieldLabel: 'Genre',
        name: 'genra',
        allowBlank: false,
        anchor: '100%'
      }, {
        fieldLabel: 'Date Released',
        xtype: 'datefield',
        name: 'date_released',
        allowBlank: false,
        anchor: '100%'
      },
      {
        fieldLabel: 'Number of Copies',
        name: 'number_of_copies',
        xtype: 'numberfield',
        allowBlank: false,
        anchor: '100%',
        itemId: 'numberOfCopiesField',
        listeners: {
          change: function(numberOfCopiesField, newValue) {
            var availableCopiesField = numberOfCopiesField.up('form').down('[name=available_copies]');
            var rentedCopiesField = numberOfCopiesField.up('form').down('[name=rented_copies]');
      
            availableCopiesField.setValue(newValue);
            rentedCopiesField.setValue(0);
          }
        }
      },
      {
        fieldLabel: 'Available Copies',
        name: 'available_copies',
        xtype: 'numberfield',
        allowBlank: false,
        anchor: '100%',
       
      },
      {
        fieldLabel: 'Rented Copies',
        name: 'rented_copies',
        xtype: 'numberfield',
        allowBlank: false,
        anchor: '100%',
        // value: 0
      }
      ],
      buttons: [{
        text: 'Save',
        handler: 'createMovie',
        cls: 'custom-button'
      }]
    }]
  });