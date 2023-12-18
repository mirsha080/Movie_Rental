Ext.define('MovieRental.view.updateCustomerForm', {
    extend: 'Ext.window.Window',
    xtype: 'updatecustomerform',
    controller: 'customercontroller',
    viewModel: {
        type: 'customerviewmodel'
    },
    title: 'Customer Details',
    width: 800,
    height: 340,
    layout: 'fit',
    modal: true,
    items: [{
        xtype: 'form',
        reference: 'updatecustomerform',
        bodyPadding: 10,
        defaultType: 'textfield',
        items: [
            {
              
              fieldLabel: 'First Name',
              name: 'first_name',
              readOnly: true,
              allowBlank: false,
              anchor: '100%'
            }, {
              fieldLabel: 'Last Name',
              name: 'last_name',
              readOnly: true,
              allowBlank: false,
              anchor: '100%'
            },
            {
              fieldLabel: 'Contact Number',
              name: 'contact_num',
              readOnly: true,
              allowBlank: false,
              anchor: '100%'
            }, {
              fieldLabel: 'Birth Date',
              xtype: 'datefield',
              name: 'birth_date',
              readOnly: true,
              allowBlank: false,
              anchor: '100%'
            },
            {
              fieldLabel: 'Address',
              name: 'address',
              allowBlank: false,
              readOnly: true,
              anchor: '100%'
            },
            ],
        buttons: [
        {
            text: 'Save Changes',
            handler: 'updateCustomer',
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
                handler: 'deleteCustomer',
                cls: 'custom-button'
            },
           

        ]
    }]
});
