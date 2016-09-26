define([
	'underscore',
	'backbone',
	'models/getBarGraphModel'
], function (_, Backbone, getBarGraphModel) {
	'use strict';

	var getBarGraphDataCollection = Backbone.Collection.extend({
			initialize: function() {
			
                this.url = 'getBarGraphData';
			
			},
			model: getBarGraphModel,
	});
	return new getBarGraphDataCollection();
});
