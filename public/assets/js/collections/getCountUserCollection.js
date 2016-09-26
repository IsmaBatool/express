define([
	'underscore',
	'backbone',
	'models/getCountUserModel'
], function (_, Backbone, getCountUserModel) {
	'use strict';

	var getCountUserCollection = Backbone.Collection.extend({
			initialize: function() {
			
                this.url = 'getCountUsers';
			
			},
			model: getCountUserModel,
	});
	return new getCountUserCollection();
});
