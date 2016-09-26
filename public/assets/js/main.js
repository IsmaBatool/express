/*global require*/
'use strict';
// Require.js allows us to configure shortcut alias
require.config({
	// The shim config allows us to configure dependencies for
	// scripts that do not call define() to register a module
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
	    jquery: {
            exports:"$" 
        },
		
		'datatables':{
			deps: [
				'jquery',
				'bootstrap'
			],
			exports: 'datatables'
		},
	  
         bootstrap: {
            deps: [
							'jquery',
						]
        },

		

	},
	paths: {
		
		jquery: 'dependencies/jquery-1.11.3.min',
		underscore: 'dependencies/underscore.min',
		backbone: 'common/backbone-min',
		text: 'common/text',
		bootstrap:'/assets/js/js/bootstrap.min',
		chartsmin: "/assets/js/js/Chart.min",
		'datatables':"/assets/js/js/jquery.dataTables.min",
        moment: 'dependencies/moment.min'
		   
	}
});

require([
	'backbone',
	'views/homePageView'
], function (Backbone, homePageView) {
	new homePageView();
});
