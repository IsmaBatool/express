define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/TopBoxesTemp.html',
	'collections/getCountUserCollection'
], function ($, _, Backbone, TopBoxesTemp, getCountUserCollection) {
	'use strict';
	var TopBoxesView = Backbone.View.extend({
		tagName: 'div',
		template:_.template(TopBoxesTemp),
	
		initialize: function(){


		},
		render: function(){
		    $(".topBoxesMainDiv").empty();
		    $(".topBoxesMainDiv").append(this.$el.html(this.template(getCountUserCollection.models[0].toJSON())));
            this.delegateEvents();
		}
		  

	});
		return TopBoxesView;
});
