/**
 * DBRDetailView
 *
 * @description :: view to go to dashboard, region , branch , device or reports page.
 */
define([
	'jquery',
	'underscore',
	'backbone',
	'bootstrap',
	'text!templates/homePageTemp.html',
    'views/addUserView',
    'views/dashBoardView'
], function ($, _, Backbone,bootstrap,homePageTemp,addUserView,dashBoardView) {
	'use strict';
	var homePageView = Backbone.View.extend({
		template:_.template(homePageTemp),
		tagName: 'div',
		events:
	 	{
			'click .addUser':	'addUserFunc',
			'click .dashBoard':	'addDashboard',
		},
		initialize:function()
		{
	        this.render();
	        this.addUserView=new   addUserView();
	        this.dashBoardView=new dashBoardView();
	        this.addDashboard();
			 

		},

		render: function()
		{
			$('.mainContent').empty();
		    $('.mainContent').append(this.$el.html(this.template()));
		    this.delegateEvents();
		 

		},

		addUserFunc:function(e){
			this.addUserView.render();
		},
		addDashboard:function(e){
			this.dashBoardView.render();
		}

   
	});
	return homePageView;
});