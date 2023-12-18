Ext.define('MovieRental.view.main.CustomerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.customercontroller',  
    

    refreshGrid: function () {
      var store = this.getViewModel().getStore('customer');
      store.load(); 
    },

   
    onGridRender: function () {
      var store = this.getViewModel().getStore('customer');
      store.load();
     
    },
  
   
    showForm: function () {
      var addCustomerForm = Ext.create('MovieRental.view.addCustomerForm');
      addCustomerForm.show();
    },


    onItemSelected: function (sender, record) {
      var grid = this.getView();
      var selectionModel = grid.getSelectionModel();
      
      if (selectionModel.isSelected(record)) {
       selectionModel.deselectAll(); 
      } 
       
        var updateCustomerForm = Ext.create('MovieRental.view.updateCustomerForm');
        var form = updateCustomerForm.down('form');


        var dateField = form.getForm().findField('birth_date');
        var dateValue = record.get('birth_date');
        var formattedDate = Ext.util.Format.date(dateValue, 'Y-m-d');
        
        form.loadRecord(record);
        dateField.setValue(formattedDate);
        updateCustomerForm.show();
     },

    addCustomer: function () {
      var form = this.getView().down('form');
      var values = form.getValues();
      var store = this.getViewModel().getStore('customer');
      
      if (form.isValid()) {
        var firstName = values.first_name
        var lastName = values.last_name
        store.load({
          callback: function(success){
           if(success){
       
           var matchingRecord = store.findBy(function(record) {
          // Convert first_name and last_name fields to lowercase before comparing
          return (
            record.get('first_name').toLowerCase() == firstName.toLowerCase() &&
            record.get('last_name').toLowerCase() == lastName.toLowerCase()
          ); 
        });
        if(matchingRecord !== -1){
          Ext.toast('Failed to add customer, Customer already Exist!');
        }else {
         
            store.add(values);
            store.sync({
              
              success: function () {
                form.reset();
                var addCustomerForm = Ext.ComponentQuery.query('addcustomerform')[0];
                addCustomerForm.close() 
                Ext.toast('Customer added successfully');
              },
              failure: function () {
                Ext.toast('Failed to add customer');
              },
              scope: this 
            });
        }
              }else {

              }
          }
})
   
      }
    },


    onButtonClick: function(button) {
     
      //hide this button
      var button = this.lookupReference('button');
      button.hide()

      var cancelbtn = this.getView().lookupReference('cancelbtn');;
      cancelbtn.show();

      //Show the Save Changes/Cancel butoon
      var updatebtn = Ext.ComponentQuery.query('button[text="Save Changes"]')[0];
      updatebtn.show();

      
      //Show the Save Changes/Cancel butoon
      var updatebtn = Ext.ComponentQuery.query('button[text="Save Changes"]')[0];
      updatebtn.show();
      
     
      
      //hide the delete button
      var deletbtn = Ext.ComponentQuery.query('button[text="Delete"]')[0];
      deletbtn.hide();

      //make the fields editable
      var form = this.getView().down('form');
      var fields = form.getForm().getFields();

      fields.each(function(field) {
        field.setReadOnly(false);
      });
     
    },
    
    closeupdateForm: function() {
      var updDateForm = Ext.ComponentQuery.query('updatecustomerform')[0];
      updDateForm.close() 
    },
  
    updateCustomer: function () {
      var form = this.getView().down('form');
      var record = form.getRecord();
      var values = form.getValues();
      var store = record.store;
   
      if (form.isValid()) {
        store.suspendEvents();
        var movieId = record.get('customer_id'); // Get the existing movie_id

        // Set the idProperty to the existing customer_id
        record.setId(movieId);
       
        record.set(values)
        store.sync({
       
         
          success: function () {
           
            form.reset();
            Ext.toast('Customer updated successfully');
            var updDateForm = Ext.ComponentQuery.query('updatecustomerform')[0];
            store.resumeEvents();
            updDateForm.close() 
          },
          failure: function () {
            Ext.toast('Failed to update customer');
          },
          scope: this
        });
      }
     },
  
    deleteCustomer: function () {
      var form = this.getView().down('form');
      var record = form.getRecord();
      var store = record.store;
      var movieId = record.get('customer_id'); // Get the existing movie_id
      
      // Set the idProperty to the existing movie_id
      record.setId(movieId);
     
      Ext.Msg.confirm('Delete Movie', 'Are you sure you want to delete this customer?', function (btn) {
        if (btn === 'yes') {
         store.suspendEvents();
          store.remove(record);
          store.sync({
            success: function (batch, options) {
              Ext.toast('Customer has been deleted successfully');
              store.resumeEvents();
            },
            failure: function (batch, options) {
              Ext.toast('Failed to delete customer');
            } 
          });
          form.up('window').close();
        }
      }, this);
    },
    onSearchKeyUp: function (field, e) {
      var grid = this.getView();
      var value = field.getValue().toLowerCase();
    
      var rows = grid.getEl().query('.x-grid-row');
    
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var cells = row.querySelectorAll('.x-grid-cell-inner');
        var match = false;
    
        for (var j = 0; j < cells.length; j++) {
          var cell = cells[j];
          var cellValue = cell.innerText.toLowerCase();
    
          if (cellValue.includes(value)) {
            match = true;
            break;
          }
        }
    
        if (match) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      }
    },
    
  onSearchButtonClick: function () {
      var view = this.getView();
      var field = view.lookupReference('searchField');
      this.onSearchKeyUp(field);
  }
    
  });
  