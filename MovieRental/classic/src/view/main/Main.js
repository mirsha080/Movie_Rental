/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('MovieRental.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'MovieRental.view.main.MainController',
        'MovieRental.view.main.MainModel',
        'MovieRental.view.main.Rental',
        'MovieRental.view.main.Movie',
        'MovieRental.viewmodel.RentalViewModel',
        'MovieRental.view.main.RentalController'
    ],

    controller: 'main',
    viewModel: 'main',

    ui: 'navigation',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,
   
    header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
            bind: {
                text: 'Movie Rental'
            },
            flex: 0
        },
        iconCls: 'fa-th-list',
        style: 'background-color: #007bff'
    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'left'
        }
    },

    defaults: {
        bodyPadding: 20,
        tabConfig: {
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center',
                    width: 120
                }
            }
        }
    },

    items: [{
        title: 'Home',
        iconCls: 'fa-home',
        
        items: [{
            xtype: 'rental'
        }]
    }, {
        title: 'Movies',
        iconCls: 'fa-film',
        items: [{
            xtype: 'Movie'
        }]
    }, {
        title: '&nbspCustomer',
        iconCls: 'fa-users',
        items: [{
            xtype: 'Customer'
        }]
    }, {
        title: 'About',
        iconCls: 'fa-info-circle',
        html: `
        <div class="_aboutcontainer" > 
            <div class="inner-container">
            <h1>About</h1>
            <p class="textAbout">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <div class="skills">
                <span>Asp.net</span>
                <span>Sencha Ext JS</span>
                <span>Web Api</span>
            </div>
        </div></div>`,
        padding: '40px',
      style: 'background-color: #ffffff; color: #333333;'
    }]
});


