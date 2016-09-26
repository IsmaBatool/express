define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/showUserTemp.html'
], function ($, _, Backbone, showUserTemp) {
	'use strict';
	var showUserView = Backbone.View.extend({
		tagName: 'div',
		template:_.template(showUserTemp),
	
		initialize: function(){
        this.render();
		},
		render: function(){
		  $(".innerMainDiv").empty();
		  $(".innerMainDiv").append(this.$el.html(this.template(this.model.toJSON())));
          this.delegateEvents();

          var startTime = new Date(this.model.attributes.creationDate); 
          var endTime = new Date(new Date());
          var difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds
          var resultInMinutes = 60-Math.round(difference / 60000);
          $(".minToExpire").html(resultInMinutes);
          $(".minToExpire").text(resultInMinutes)
		  }
		  

	});
	return showUserView;
});
