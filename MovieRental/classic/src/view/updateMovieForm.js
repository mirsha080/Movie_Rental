Ext.define('MovieRental.view.updateMovieForm', {
    extend: 'Ext.window.Window',
    xtype: 'updatemovieform',
    controller: 'moviecontroller',
    viewModel: {
        type: 'movieviewmodel'
    },
    title: 'Movie Details',
    width: 800,
    height: 400,
    layout: 'fit',
    modal: true,
    items: [{
        xtype: 'form',
        reference: 'updatemovieform',
        bodyPadding: 10,
        defaultType: 'textfield',
        items: [   
          
            {
        
            fieldLabel: 'Title',
            name: 'title',
            allowBlank: false,
            readOnly: true,
            anchor: '100%'
          }, {
            fieldLabel: 'Cast',
            name: 'cast',
            allowBlank: false,
            readOnly: true,
            anchor: '100%'
          },
          {
            fieldLabel: 'Genre',
            name: 'genra',
            allowBlank: false,
            readOnly: true,
            anchor: '100%'
          }, {
            fieldLabel: 'Date Released',
            xtype: 'datefield',
            name: 'date_released',
            allowBlank: false,
            readOnly: true,
            anchor: '100%'
          },
          {
            fieldLabel: 'Number of Copies',
            name: 'number_of_copies',
            allowBlank: false,
            xtype: 'numberfield',
            readOnly: true,
            anchor: '100%'
          },
          {
            fieldLabel: 'Available Copies',
            name: 'available_copies',
            allowBlank: false,
            xtype: 'numberfield',
            readOnly: true,
            anchor: '100%'
          },
          {
            fieldLabel: 'Rented Copies',
            name: 'rented_copies',
            allowBlank: false,
            xtype: 'numberfield',
            readOnly: true,
            value: 0,
            anchor: '100%'
          },
          // {
          //   fieldLabel: 'Description',
          //   name: 'description',
          //   xtype: 'textarea',
          //   allowBlank: false,
          //   readOnly: true,
          //   height: 120,
          //   anchor: '100%'
          // }
        ],
        buttons: [
        {
            text: 'Save Changes',
            handler: 'updateMovie',
            hidden: true,
            cls: 'custom-button'
        },  
        {
            text: 'Cancel',
            reference: 'cancelbtn',
            handler: 'closeupdateForm',
            hidden: true,
            cls: 'custom-button'
        },  
        {
            text: 'Edit',
            reference: 'button',
            handler: 'onButtonClick',
            cls: 'custom-button'
        },
            {
                text: 'Delete',
                handler: 'deleteMovie',
                cls: 'custom-button'
            },
           

        ]
    }]
});
