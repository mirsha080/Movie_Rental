/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'MovieRental.Application',

    name: 'MovieRental',

    requires: [
        // This will automatically load all classes in the MovieRental namespace
        // so that application classes do not need to require each other.
        'MovieRental.*'
    ],

    // The name of the initial view to create.
    mainView: 'MovieRental.view.main.Main'
});
