Ext.define('MovieRental.view.main.MovieController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.moviecontroller',  
    

    refreshGrid: function () {
      var store = this.getViewModel().getStore('movies');
      store.reload(); 
    },

   
    onGridRender: function () {
      var store = this.getViewModel().getStore('movies');
      store.load();
    
    },
  
   
    showForm: function () {
      var addMovieForm = Ext.create('MovieRental.view.addMovieForm');
        addMovieForm.show();
    },


    onItemSelected: function (sender, record) {
      var grid = this.getView();
      var selectionModel = grid.getSelectionModel();
      
      if (selectionModel.isSelected(record)) {
       selectionModel.deselectAll(); 
      } 
       
        var updateMovieForm = Ext.create('MovieRental.view.updateMovieForm');
        var form = updateMovieForm.down('form');


        var dateField = form.getForm().findField('date_released');
        var dateValue = record.get('date_released');
        var formattedDate = Ext.util.Format.date(dateValue, 'Y-m-d');
        
        form.loadRecord(record);
        dateField.setValue(formattedDate);
        updateMovieForm.show();
    },

    createMovie: function () {
      var form = this.getView().down('form');
      var values = form.getValues();
      var store = this.getViewModel().getStore('movies');
      var movieStore = Ext.create('MovieRental.store.MovieStore')
      var movie = Ext.create('MovieRental.model.MovieModel', values);
     
      if (form.isValid()) {
        var title = values.title  
        movieStore.load({
          callback: function(success){
              if(success){
              
                var matchingRecord = movieStore.findRecord('title', new RegExp('^' + Ext.String.escapeRegex(title) + '$', 'i'));
                if (matchingRecord) {

                  Ext.toast('Failed to add, Movie already Exist!');

                } else {
                  store.add(movie);
                  store.sync({
                    
                    success: function () {
                      form.reset();
                      var addMovieForm = Ext.ComponentQuery.query('addmovieform')[0];
                      addMovieForm.close() 
                      Ext.toast('Movie added successfully');
                    },
                    failure: function () {
                      Ext.toast('Failed to create movie');
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
      var updDateForm = Ext.ComponentQuery.query('updatemovieform')[0];
      updDateForm.close() 
    },
  
    updateMovie: function () {
      
      var form = this.getView().down('form');
      var record = form.getRecord();
      var values = form.getValues();
      var store = record.store;
   
      if (form.isValid()) {
        store.suspendEvents();
        var movieId = record.get('movie_id'); // Get the existing movie_id
        
        // Set the idProperty to the existing movie_id
        record.setId(movieId); 
        record.set(values)
      
        store.sync({
          success: function () {
           
            form.reset();
            Ext.toast('Movie updated successfully');
            var updDateForm = Ext.ComponentQuery.query('updatemovieform')[0];
            store.resumeEvents();
            updDateForm.close() 
          },
          failure: function () {
            Ext.toast('Failed to update movie');
          },
          scope: this
        });

        
        
        
      }
    },
  
    deleteMovie: function () {
      var form = this.getView().down('form');
      var record = form.getRecord();
      var store = record.store;
      var movieId = record.get('movie_id'); // Get the existing movie_id

      // Set the idProperty to the existing movie_id
      record.setId(movieId);
     
      Ext.Msg.confirm('Delete Movie', 'Are you sure you want to delete this movie?', function (btn) {
        if (btn === 'yes') {
          store.suspendEvents();
          store.remove(record);
          store.sync({
            success: function (batch, options) {
              store.resumeEvents();
              Ext.toast('Movie deleted successfully');
            },
            failure: function (batch, options) {
              Ext.toast('Failed to delete movie');
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
  


