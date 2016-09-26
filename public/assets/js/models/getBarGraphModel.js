/*global define*/
define([
	'underscore',
	'backbone'
], function (_, Backbone) {
	'use strict';

	var getCountUsersModel = Backbone.Model.extend({
		urlRoot: 'getBarGraphData',
		id:'user_id',
		defaults: {
			activeUsers: '',
			expiredUsers: '',
			label:''
		}
	});

	return getCountUsersModel;
});
