Ext.define('MovieRental.view.main.RentalController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.rentalcontroller',
 
  onGridRender: function() {
    
      var store = this.getViewModel().getStore('rentals');
      store.load();
    
  },
  
  refreshGrid: function () {
    var store = this.getViewModel().getStore('rentals');
    store.reload(); 
  },

  onFormRender: function(form) {
    var tagfield = form.down('tagfield[name=movies]');
    var customer = form.down('combobox[name=customer_id]')
    var movieStore = tagfield.getStore();
    var customerStore = customer.getStore()
    movieStore.load({
      callback: function(records, operation, success) {
        if (success) {
           // Filter the records with available copies not equal to 0
          var filteredRecords = records.filter(function(record) {
            return record.get('available_copies') !== 0;
          });
        
          // Load the filtered records into the store
          movieStore.loadData(filteredRecords);
          customerStore.load({
            callback: function(records,operation, success){
              if(success){
                form.updateLayout();
              }
            }
          })  
        }
      }
    });
  },

  showForm: function () {
    var rentalform = Ext.create('MovieRental.view.rentalForm');
    rentalform.show();
  },
  
  refreshDetail: function() {
    var rentalDetails = this.getView();
    var detailsPanel = rentalDetails.down('panel');
    var rentalItemsGrid = detailsPanel.down('grid');
    
    var record = rentalDetails.record;
    var movieRentalsStore = record.getMovieRentals();
  
    rentalItemsGrid.setStore(movieRentalsStore);
  },
  showUpdateForm: function(){
      
    var rentalDetails = this.getView();
    var record = rentalDetails.record;
    var updateForm = Ext.ComponentQuery.query('updaterentalform')[0];

    if (!updateForm) {
      updateForm = Ext.create('MovieRental.view.updateRentalForm');
    }
    var form = updateForm.down('form');
    form.loadRecord(record);
    var Customer = record.getCustomer()
    var name = Customer.get('first_name')+' '+Customer.get('last_name')
    var customerfield = form.down('textfield[name=customer]');
    customerfield.setValue(name);
   
    
    var movieRentals = record.get('movie_rental');
    var movieIds = movieRentals.map(function(movieRental) {
      return movieRental.Movie.movie_id;
    });
    var tagfield = form.down('tagfield[name=movies]');
    tagfield.setValue(movieIds);

    // var transactionDateField =  form.getForm().findField('rent_date');
    // var transactionDate = record.get('rent_date');
    // if (transactionDate) {
    //   var formattedDate = Ext.util.Format.date(transactionDate, 'F d, Y h:i A');
    //   transactionDateField.setValue(formattedDate);
    // }

   

    updateForm.show();
    },

  onItemSelected: function (grid, record) {

    var grid = this.getView();
    var selectionModel = grid.getSelectionModel();
    
    if (selectionModel.isSelected(record)) {
     selectionModel.deselectAll(); 
    } 

    var updateForm = Ext.ComponentQuery.query('updaterentalform')[0];

    if (!updateForm) {
      updateForm = Ext.create('MovieRental.view.updateRentalForm');
    }

    var form = updateForm.down('form');
    form.loadRecord(record);

    var movieRentals = record.get('movie_rental');
    var movieIds = movieRentals.map(function(movieRental) {
      return movieRental.Movie.movie_id;
    });
    var tagfield = form.down('tagfield[name=movies]');
    tagfield.setValue(movieIds);

    var transactionDateField =  form.getForm().findField('rent_date');
    var transactionDate = record.get('rent_date');
    if (transactionDate) {
      var formattedDate = Ext.util.Format.date(transactionDate, 'F d, Y h:i A');
      transactionDateField.setValue(formattedDate);
    }

    updateForm.show();
      
  },

  onItemClicked: function (grid, record) {

    var grid = this.getView();
    var selectionModel = grid.getSelectionModel();
    
    if (selectionModel.isSelected(record)) {
     selectionModel.deselectAll(); 
    } 


    var detailsWindow = Ext.create('MovieRental.view.rentalDetails');
    var detailsPanel = detailsWindow.down('panel');
   
    detailsWindow.record = record;
  
    // Set the values directly on the display field and bind the grid store
    var customer = record.getCustomer();
    detailsPanel.down('displayfield[name=customer]').setValue(customer.get('first_name') + ' ' + customer.get('last_name'));
    detailsPanel.down('displayfield[name=rent_date]').setValue(record.get('rent_date'));
    
   detailsPanel.down('grid').setStore(record.getMovieRentals());
  
   
    // Show the modal window
    detailsWindow.show();
  },

  onReturnButtonClick: function(btn) {
   
    var record = btn.getWidgetRecord();
    store = Ext.create('MovieRental.store.RentalItemsStore')
    Ext.Msg.confirm('Return Movie', 'Return this Movie?', function (btn) {
      if (btn === 'yes') {
        store.load({
          callback: function(records, operation, success) {
            if (success) {
              var items_id = record.get('items_id')
              var matchingRecord = store.findRecord('items_id',items_id);
              
              var datetime = new Date().toLocaleString('en-PH', { timeZone: 'Asia/Manila' })
              matchingRecord.set('date_returned', datetime);
              matchingRecord.set('id',items_id); 
              matchingRecord.set('status','Returned')
              store.sync({
                success: function (batch, options) {
                
                  Ext.toast('Status updated to "Returned"!');                 
                },
                failure: function (batch, options) {
                  Ext.toast('Failed to return Movie');
                }
              });
        
            } else {
              // Store failed to load
              console.error('Store load failed');
            }
          }
        });
       
      
      }
    });

    
  },

  returnMovies: function(btn){
    var modal = this.getView().down('panel');
    var rentalItemsGrid = this.lookupReference('rentalItemsGrid');
    var selectedRecords = rentalItemsGrid.getSelection();
    var rentalItemsStore =  Ext.create('MovieRental.store.RentalItemsStore')
    var movieStore =  Ext.create('MovieRental.store.MovieStore')
    
    if(selectedRecords && selectedRecords.length > 0){
      Ext.Msg.confirm('Return Movie', 'Return Movie/s?', function (btn) {
        if (btn === 'yes') {
         
          var hasUnreturnedRecord = Ext.Array.some(selectedRecords, function(record) {
            return record.get('status') === 'Unreturned';
          });
    
              if(hasUnreturnedRecord){
                  rentalItemsStore.load({
                      callback: function(records, operation, success) {
                          if (success) {
    
                            movieStore.load({
                              callback: function(success) {
                                      if (success) {
                                        
                                          var datetime = new Date().toLocaleString('en-PH', { timeZone: 'Asia/Manila' })
                    
                                          Ext.each(selectedRecords, function(record) {
                                            
                                            var items_id = record.get('items_id')
                                            var matchingRecord = rentalItemsStore.findRecord('items_id',items_id);
                              
                                            matchingRecord.set('date_returned', datetime);
                                            matchingRecord.set('id',items_id); 
                                            matchingRecord.set('status','Returned')
    
                                            if(record.get('status')  !== 'Returned'){
                                              var movie_id = record.get('movie_id')                                  
                                              var matchingRecord2 = movieStore.findRecord('movie_id',movie_id);
                                              var availableCopies = matchingRecord2.get('available_copies')+1;
                                              var rentedCopies = matchingRecord2.get('rented_copies')-1;
                                              matchingRecord2.set('id',movie_id); 
                                              matchingRecord2.set('available_copies',availableCopies)
                                              matchingRecord2.set('rented_copies',rentedCopies)
                                            }
                                          });
                    
                                          movieStore.sync({
                                              success: function(){
                                                rentalItemsStore.sync({
                                                    success: function() {
                                                      Ext.toast('Movies Returned Successfully!');
                                                      modal.up('window').close();
                                                    },
                                                    failure: function() {
                                                      Ext.toast('Failed to return movies.');
                                                    }
                                                });
                                                },
                                            failure: function(){
    
                                            }
                                        })       
    
                                    } else {
                                      console.error('MovieStore load failed');
                                    }
                                  }
                            })
                                          
                          } else {
                            console.error('RentalItemsStore load failed');
                          }
                    }
                  });
            }
            else {
              Ext.toast('Failed to returned! Movie/s already returned.');
            }
          
        }
      });
    } else {
      Ext.toast('Please select movies to returned!');
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

    
   // Show the Save Changes/Cancel butoon
    var updatebtn = Ext.ComponentQuery.query('button[text="Save Changes"]')[0];
    updatebtn.show();
    
  
    //hide the delete button
    var deletbtn = Ext.ComponentQuery.query('button[text="Delete"]')[0];
    deletbtn.hide();

    var moviesTagField = this.lookupReference('moviesTagField');  
    moviesTagField.setReadOnly(false);
   
  },

  closeupdateForm: function() {
    var updDateForm = Ext.ComponentQuery.query('updaterentalform')[0];
    updDateForm.close() 
  },

  newRental: function(){

    var form = this.getView().down('form');
    var values = form.getValues();
    var rental = Ext.create('MovieRental.model.RentalModel');
    var store = Ext.getStore('rentalStore'); 
    var movieStore = Ext.create('MovieRental.store.MovieStore')
    var rentalItemsStore = Ext.create('MovieRental.store.RentalItemsStore')
    
    if (form.isValid()) {

          rental.set('customer_id', values.customer_id);
          var datetime = new Date().toLocaleString('en-PH', { timeZone: 'Asia/Manila' })
          rental.set('rent_date', datetime);
          store.suspendEvents();
          
          store.add(rental);
          store.sync({
                success: function(batch) {
                  store.resumeEvents();
                  var rentalId = batch.operations[0].getResponse().responseJson.rental_id;
          
                  var rentalItems = [];
                  var selectedMovies = form.getValues().movies;
                
                  movieStore.load({

                  callback: function(success) {
                          if (success) {
                            // Loop through the selected movies and create a rental item for each
                            Ext.Array.each(selectedMovies, function(movie_id) {
                                var rentalItem = Ext.create('MovieRental.model.RentalItemsModel', {
                                rental_id: rentalId,
                                movie_id: movie_id,
                                status: 'Unreturned'   
                            });
                              rentalItems.push(rentalItem);

                              //update the available copies-1 and the rented copies+1
                              var matchingRecord = movieStore.findRecord('movie_id',movie_id);
                              var availableCopies = matchingRecord.get('available_copies')-1;
                              var rentedCopies = matchingRecord.get('rented_copies')+1;
                              matchingRecord.set('id',movie_id); 
                              matchingRecord.set('available_copies',availableCopies)
                              matchingRecord.set('rented_copies',rentedCopies)
                            });
                            rentalItemsStore.add(rentalItems);  
                            rentalItemsStore.sync({
                               success: function() {
                                        movieStore.sync({
                                             success: function() {
                                                   form.reset();
                                                   var rentalform = Ext.ComponentQuery.query('rentalform')[0];
                                                   rentalform.close() 
                                                   Ext.toast('New Rental Added Successfully!');
                                             },
                                             failure: function() {
                                                   form.reset();
                                                   var rentalform = Ext.ComponentQuery.query('rentalform')[0];
                                                   rentalform.close() 
                                                   Ext.toast('Failed to add Rental!')
           
                                             }
                                        })
                                
                               },
                               failure: function() {
                                 form.reset();
                                 var rentalform = Ext.ComponentQuery.query('rentalform')[0];
                                 rentalform.close() 
                                 Ext.toast('Failed to rent Movies!');
                               }
                             });
                          }
                        }
            
                })
        },
        failure: function() {
          form.reset();
          var rentalform = Ext.ComponentQuery.query('rentalform')[0];
          rentalform.close() 
          Ext.toast('Failed to add Rental!');
        }
     });
   }
  },

  updateRental: function(){
    var modal = Ext.WindowManager.get('rentalDetailss');;
    var form = this.getView().down('form');
    var record = form.getRecord();
    var tagfield = form.down('tagfield[name=movies]');
    var addedItems = tagfield.getValue();
    var rentalItemsStore = Ext.create('MovieRental.store.RentalItemsStore');
    var movieStore = Ext.create('MovieRental.store.MovieStore')
    var rentalId = record.get('rental_id');
  
    rentalItemsStore.load({

      callback: function(success) {
        if (success) {
         

          var storedItems = rentalItemsStore.getRange();
      
          var removedItems = [];

          storedItems.forEach(function(item) {
            var storedRentalId = item.get('rental_id');
            var storedMovieId = item.get('movie_id');
           
            if(storedRentalId === rentalId) {
              var isMovieIdInAddedItems = addedItems.includes(storedMovieId);
                if (isMovieIdInAddedItems === false) {
                  removedItems.push(item);
                } 
            }

          });

          var newItems = addedItems.filter(function(movieId) {
            return !storedItems.some(function(item) {
              return item.get('movie_id') === movieId && item.get('rental_id') === rentalId;
            });
          });
         
        
          movieStore.load({

            callback: function(success) {
              if (success) {
          
                      if (removedItems.length > 0) {
                              var removed = []
                              Ext.Array.each(removedItems, function(item) {
                                var items_id = item.get('items_id')
                                item.set('id', items_id);
                                removed.push(item) 
                                //return movies not been returned
                                if(item.get('status') !== 'Returned'){
                                  var movie_id = item.get('movie_id')
                                  var matchingRecord = movieStore.findRecord('movie_id',movie_id);
                                  var availableCopies = matchingRecord.get('available_copies')+1;
                                  var rentedCopies = matchingRecord.get('rented_copies')-1;
                                  matchingRecord.set('id',movie_id); 
                                  matchingRecord.set('available_copies',availableCopies)
                                  matchingRecord.set('rented_copies',rentedCopies)
                                }
                              });
                              rentalItemsStore.remove(removed);
                              rentalItemsStore.sync({
                                success: function() {
                                  // Add the new items to the store if there are any
                                  if (newItems.length > 0) {
                                    var newItem = [];
                                    Ext.Array.each(newItems, function(movie_id) {
                                      var rentalItem = Ext.create('MovieRental.model.RentalItemsModel', {
                                        rental_id: rentalId,
                                        movie_id: movie_id,
                                        status: 'Unreturned',
                                        id: null
                                      });
                                      newItem.push(rentalItem);
                                      //-1 to available and +1 to rented
                                      var matchingRecord = movieStore.findRecord('movie_id',movie_id);
                                      var availableCopies = matchingRecord.get('available_copies')-1;
                                      var rentedCopies = matchingRecord.get('rented_copies')+1;
                                      matchingRecord.set('id',movie_id); 
                                      matchingRecord.set('available_copies',availableCopies)
                                      matchingRecord.set('rented_copies',rentedCopies)  
                                    });
                                    rentalItemsStore.add(newItem);
                                    rentalItemsStore.sync({
                                      success: function() {
                                        
                                        movieStore.sync({
                                            success: function(){
                                              form.reset();
                                              var rentalform = Ext.ComponentQuery.query('updaterentalform')[0];
                                              rentalform.close();
                                              modal.close()
                                              Ext.toast('Movies Rented Updated Successfully!');
                                             
                                            },
                                            failure: function(){
                                              Ext.toast('Failed to update rental items!');
                                            }
                                              
                                        })
                                      },
                                      failure: function() {
                                        Ext.toast('Failed to update rental items!');
                                      }
                                    });
                                  } else {
                
                                    movieStore.sync({
                                            success: function(){
                                              form.reset();
                                              var rentalform = Ext.ComponentQuery.query('updaterentalform')[0];
                                              rentalform.close();
                                              modal.close()
                                              Ext.toast('Movies Rented Updated Successfully!');
                                            },
                                            failure: function(){
                                              Ext.toast('Failed to update rental items!');
                                            }
                                        })
                                  }
                                },
                                failure: function() {
                                  Ext.toast('Failed to update rental items!');
                                }
                              });
                            } else {
                              // Add the new items to the store if there are any
                              if (newItems.length > 0) {
                                var newItem = [];
                                Ext.Array.each(newItems, function(movie_id) {
                                  var rentalItem = Ext.create('MovieRental.model.RentalItemsModel', {
                                    rental_id: rentalId,
                                    movie_id: movie_id,
                                    status: 'Unreturned',
                                    
                                  });
                                    newItem.push(rentalItem);
                                    //-1 to available and +1 to rented
                                    var matchingRecord = movieStore.findRecord('movie_id',movie_id);
                                    var availableCopies = matchingRecord.get('available_copies')-1;
                                    var rentedCopies = matchingRecord.get('rented_copies')+1;
                                    matchingRecord.set('id',movie_id); 
                                    matchingRecord.set('available_copies',availableCopies)
                                    matchingRecord.set('rented_copies',rentedCopies)  
                                });
                                rentalItemsStore.add(newItem);
                                rentalItemsStore.sync({
                                  success: function() {
                                    movieStore.sync({
                                          success: function(){
                                            form.reset();
                                            var rentalform = Ext.ComponentQuery.query('updaterentalform')[0];
                                            rentalform.close();
                                            modal.close()
                                            Ext.toast('Movies Rented Updated Successfully!');
                                          },
                                          failure: function(){
                                            Ext.toast('Failed to update rental items!');
                                          }
                                        })
                                  },
                                  failure: function() {
                                    Ext.toast('Failed to update rental items!');
                                  }
                                });
                              } else {
                                form.reset();
                                var rentalform = Ext.ComponentQuery.query('updaterentalform')[0];
                                rentalform.close();
                                modal.close()
                                Ext.toast('Movies Rented Updated Successfully!');
                              }
                            }
      
        } else {
          
          console.log('Fail to load moviestore!')
        }
          }
      })
        } else {
          console.log('Failed to load Store')
        }
      }
    });
  
  },

  deleteRental: function () {
   
    var modal = this.getView().down('panel');
    var rentalDetails = this.getView();
    var record = rentalDetails.record;
    var store = record.store;
    var rental_id = record.get('rental_id');
    var movieStore = Ext.create('MovieRental.store.MovieStore')

    Ext.Msg.confirm('Delete Rental', 'Are you sure you want to delete this rental transaction?', function (btn) {
      if (btn === 'yes') {

      movieStore.load({
    
               callback: function(success) {
                        if (success) {
                             var movieRentals = record.get('movie_rental');
                             movieRentals.forEach(function(movie_rental) {
                                  if(movie_rental.status !== 'Returned'){
                                    var movie_id = movie_rental.movie_id
                                    var matchingRecord = movieStore.findRecord('movie_id',movie_id);
                                    var availableCopies = matchingRecord.get('available_copies')+1;
                                    var rentedCopies = matchingRecord.get('rented_copies')-1;
                                    matchingRecord.set('id',movie_id); 
                                    matchingRecord.set('available_copies',availableCopies)
                                    matchingRecord.set('rented_copies',rentedCopies)
                                  }
                              });
                                  record.setId(rental_id);
                                  store.suspendEvents();
                                  store.remove(record);
                                  store.sync({
                                    success: function(){
                                      var hasUnreturnedRecord = movieRentals.some(function(movie_rental) {
                                        return movie_rental.status === 'Unreturned';
                                      });
                                      
                                      if (hasUnreturnedRecord) {
                                        movieStore.sync({
                                          success: function (batch, options) {
                                            store.resumeEvents();
                                            Ext.toast('Rental record successfully deleted!');
                                          },
                                          failure: function (batch, options) {
                                            Ext.toast('Failed to delete rental');
                                          }
                                        });
                                      } else {

                                        store.resumeEvents();
                                        Ext.toast('Rental record successfully deleted!');
                                      }
                                        
                                                                               
                                    },
                                    failure: function(){
                                      Ext.toast('Failed to delete rental');
                                    }
                                  })    
                                                
                                                                  
                        }
               }
      })
       
        modal.up('window').close();
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