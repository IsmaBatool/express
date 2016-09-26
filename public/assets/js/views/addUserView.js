define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/addUserTemp.html',
	'collections/getUserCollection'
], function ($, _, Backbone, addUserTemp, getUserCollection) {
	'use strict';

	var addUserView = Backbone.View.extend({
		tagName: 'div',
		events:
		 	{
				'click .submitUserButton':	'submitUserButtonFunc',
				'click #genderFemaleInput':	'genderFemaleInputFunc',
				'click #genderMaleInput':	'genderMaleInputFunc',
			},
		template:_.template(addUserTemp),
	
		initialize: function(){


		},
		render: function(){
		  $('.sideBarItems').removeClass('active');
		  $('.addUser').addClass('active');
		  $(".innerMainDiv").empty();
		  $(".innerMainDiv").append(this.$el.html(this.template()));
		  this.delegateEvents();

		  },
		
		submitUserButtonFunc:function(e){
			var genderTemp="Female";
			if($("#genderMaleInput" ).prop( "checked" )){
			genderTemp="Male";
			}
		    var data= {
		  	    "name":$("#userNameInput").val().trim(),
		  	    "email":$("#emailInput").val(),
		  		"gender":genderTemp,
		  		"password":$("#passwordInput").val(),
		  	  };

			if($("#userNameInput").val()==""||$("#emailInput").val()==""||$("#passwordInput").val()==""||$("#passwordInputConfirm").val()==""||!$('#avatar')[0].files[0])
		 	{
		 		alert("Fill All feilds to create user.");
		 	    return;
		 	}

			 if(!getUserCollection.validateName($("#userNameInput").val())) {
	          alert("Olny characters and spaces allowed in name.");
			 	return
	         } 

	         if(!getUserCollection.ValidateEmail($("#emailInput").val())) {
	          alert("Enter valid email address.");
			 	return
	         }

	         if(!getUserCollection.validatePassword($("#passwordInput").val(),$("#passwordInputConfirm").val())){
	         	alert("Invalid Password.");
			 	return
	         }
        
			var _this=this;
			getUserCollection.add(data);
			getUserCollection.models[(getUserCollection.length-1)].save( data,{success: function(results) {
				console.log(results.attributes.insertId);
				getUserCollection.editUserAvatar(results.attributes.insertId);
				$(".addedUser").removeClass("hide");
				$(".addedUser").addClass("show");
				if(_this.addedDeviceTimer)  clearTimeout(_this.addedDeviceTimer);
				_this.addedDeviceTimer= setTimeout(function(){
				  		$(".addedUser").removeClass("show");
				  		$(".addedUser").addClass("hide");
				},5000);
			}
		  				    });
		},
		genderFemaleInputFunc:function(e){
			$("#genderMaleInput").removeProp("checked");
			$(e.currentTarget).prop( "checked", true );
		},
		genderMaleInputFunc:function(e){
			$("#genderFemaleInput").removeProp("checked");
			$(e.currentTarget).prop( "checked", true );
		}



	});
	return addUserView;
		
});
