/*global define*/
define([
	'underscore',
	'backbone'
], function (_, Backbone) {
	'use strict';

	var getCountUsersModel = Backbone.Model.extend({
		urlRoot: 'getCountUsers',
		id:'user_id',
		defaults: {
			totalUsers: '',
			expiredUser: ''
		}
	});

	return getCountUsersModel;
});
