define([
	'underscore',
	'backbone',
	'models/getUserModel'
], function (_, Backbone, getUserModel) {
	'use strict';

	var aauTopBoxesCollection = Backbone.Collection.extend({
			id:'id',
			initialize: function(id) {
				if(id){
					this.url = 'getUsers/'+id;
				}
			
				else{
                	this.url = 'getUsers';
				}
			},
			
			model: getUserModel,
			editUserAvatar: function(ev){
				var _this=this;
				var formData = new FormData();
				if(!$('#avatar')[0].files[0]){
					_this.fetch({reset:true});
					return;
				}
				formData.append('avatar', $('#avatar')[0].files[0]);
				console.log(formData);
				$.ajax({
				    url: 'uploadAvatar/'+ev,
				    data: formData,
				    cache: false,
				    contentType: false,
				    processData: false,
                    type: 'POST',
				    success: function(data){
                        if(data=="error"){
				            alert("error in uploading firmware try choosing some hex file.");
				            return;
				        }
				        console.log('success');
				        _this.fetch({reset:true});
                    }
				});
        	},
			ValidateEmail:function (mail)   
			{  
				if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))  
					{  
			    	return (true)  
		   			}   
			    return (false)  
			},
			validateName:function(name){
		    	var regex = /^[a-zA-Z\s]*$/;
				if(regex.test(name)) {
					return true;
			    } 
			    else 
			    	return false;	
			},
			validatePassword:function (p1,p2){
				var illegalChars = /[\W_]/; // allow only letters and numbers
			    if(p1==p2&&(!illegalChars.test(p1))){
					return true;
			    } 
			    else 
			    	return false;	

			},

	});
	return new aauTopBoxesCollection();
});
