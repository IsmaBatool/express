/*global define*/
define([
	'underscore',
	'backbone'
], function (_, Backbone) {
	'use strict';

	var branchesModel = Backbone.Model.extend({
		urlRoot: 'getUsers',
		id:'id',
		defaults: {
			user_id:'',
			name: '',
			email: '',
			creationDate: '',
			gender: '',
			avatar: '',
			password: ''
		}
	});

	return branchesModel;
});
