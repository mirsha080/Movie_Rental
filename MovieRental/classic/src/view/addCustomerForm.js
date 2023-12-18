Ext.define('MovieRental.view.addCustomerForm', {
    extend: 'Ext.window.Window',
    xtype: 'addcustomerform',
    controller: 'customercontroller',
    viewModel: { type: 'customerviewmodel'},
    title: 'Add Customer',
    width: 600,
    height: 340,
    layout: 'fit',
    modal: true,
    items: [{
      xtype: 'form',
      reference: 'addcustomerform',
      bodyPadding: 10,
      defaultType: 'textfield',
      items: [
      {
        
        fieldLabel: 'First Name',
        name: 'first_name',
        allowBlank: false,
        anchor: '100%'
      }, {
        fieldLabel: 'Last Name',
        name: 'last_name',
        allowBlank: false,
        anchor: '100%'
      },
      {
        fieldLabel: 'Contact Number',
        name: 'contact_num',
        allowBlank: false,
        anchor: '100%'
      }, {
        fieldLabel: 'Birth Date',
        xtype: 'datefield',
        name: 'birth_date',
        allowBlank: false,
        anchor: '100%'
      },
      {
        fieldLabel: 'Address',
        name: 'address',
        allowBlank: false,
        anchor: '100%'
      },
      ],
      buttons: [{
        text: 'Save',
        handler: 'addCustomer',
        cls: 'custom-button'
      }]
    }]
  });