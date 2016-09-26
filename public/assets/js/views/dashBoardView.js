/**
 * DBRDetailView
 *
 * @description :: Dashboard of the app.
 */
define([
	'jquery',
	'underscore',
	'backbone',
	'bootstrap',
	'text!templates/dashBoardTemp.html',
	'datatables',
    'collections/getUserCollection',
    'collections/getCountUserCollection',
    'collections/getBarGraphDataCollection',
    'views/topBoxesView',
    'views/barChartView',
    'views/showUserView',
    'moment'
], function ($, _, Backbone,bootstrap,dashBoardTemp,datatables,getUserCollection,getCountUserCollection,getBarGraphDataCollection,topBoxesView,barChartView,showUserView,moment) {
	'use strict';
	var homePageView = Backbone.View.extend({
		template:_.template(dashBoardTemp),
		tagName: 'div',
		events:
	 	{
			'click .editUserBtn':	'editUserFunc',
			'click .deleteUserBtn':	'deleteUserFunc',
			'click .viewUserBtn':	'viewUserFunc',
		},
		initialize:function()
		{
			this.listenTo(getUserCollection, 'reset', this.addUsers);
			this.listenTo(getCountUserCollection, 'reset', this.showTotalUsers);
			this.listenTo(getBarGraphDataCollection, 'reset', this.showBarCharGraph);
			this.topBoxesView= new topBoxesView();
			this.barChartView= new barChartView();
		
		},

		render: function()
		{
			  $('.sideBarItems').removeClass('active');
			  $('.dashBoard').addClass('active');
			  $('.innerMainDiv').empty();
	          $('.innerMainDiv').append(this.$el.html(this.template()));
	          this.delegateEvents();
	          getUserCollection.initialize();
			  getUserCollection.fetch({reset:true});
	          getCountUserCollection.initialize();
			  getCountUserCollection.fetch({reset:true});
	          getBarGraphDataCollection.initialize();
			  getBarGraphDataCollection.fetch({reset:true});
			 

		},
		addUsers:function(){
	        for(var i=0;i<getUserCollection.length;i++){
	         	getUserCollection.models[i].id=getUserCollection.models[i].attributes.user_id;
	        }
	      	$('.dashboardTable').dataTable({
	        	"bDestroy": true,
			    "aaData": getUserCollection.toJSON(),

			    "aoColumns": [
				    { "sTitle": "Name",   "mDataProp": "name" },
				    { "sTitle": "Email",  "mDataProp": "email" },
				    { "sTitle": "Gender",  "mDataProp": "gender" },
				    {"sTitle": "Creation Date", 
			        "mData": null,
				        "bSortable": false,"mRender": function(data, type, full) {
				            return ""+moment(data.creationDate).format('YYYY-MM-DD')+" "+moment(data.creationDate).format('HH:mm:ss');
						}
					},
					{"sTitle": "Actions", 
			        "mData": null,
				        "bSortable": false,"mRender": function(data, type, full) {
				            return "<button type='submit' class='btn btn-md btn-warning editUserBtn' id='"+data.user_id+"' data-toggle='modal' data-target='#editModal'><i class='fa fa-pencil-square' aria-hidden='true'></i></button>&nbsp;&nbsp;<button id='"+data.user_id+"' data-toggle='modal' data-target='#deleteModal'type='submit' class='btn btn-md btn-danger deleteUserBtn'><i class='fa fa-trash' aria-hidden='true'></i></button>"
					    }
					}, 
				    {"sTitle": "View Profile ", 
			            "mData": function(data, type, full) {
						   	return "<button type='submit' class='btn btn-md btn-success viewUserBtn' id='"+data.user_id+"'><i class='fa fa-eye' aria-hidden='true'></i> View</button>";
						}
					}
			    ]
			});
		},
		showTotalUsers:function(){
	    	this.topBoxesView.render();
		},
		viewUserFunc:function(e){
			var thisModel=getUserCollection.get(e.currentTarget.id);
			new showUserView({ model: thisModel});
		},
		editUserFunc:function(e){
			var thisModel=getUserCollection.get(e.currentTarget.id);
			console.log(thisModel);
			$("#userName").focus();
			$("#userName").val(thisModel.attributes.name);
			$("#userEmail").val(thisModel.attributes.email);
			$('#avatar_pic')
	                    .attr('src', thisModel.attributes.avatar)
	                    .width(150)
	                    .height(150);
			if(thisModel.attributes.gender=="Male"){
				$("#genderMale").prop( "checked", true );
				$("#genderFemale").removeProp("checked");
			}else{

				$("#genderMale").removeProp("checked")
				$("#genderFemale").prop( "checked", true );
			}
			$(".sendEditChanges").attr('id',e.currentTarget.id);

			$('.sendEditChanges').unbind('click');
			$('.sendEditChanges').click(this.sendEditChangesFunc);
			$('.cancelChanges').unbind('click');
			$('.cancelChanges').click(this.cancelChangesFunc);
	        $('#genderMale').unbind('click');
	        $('#genderMale').unbind('click');
			$('#genderMale').click(this.genderMaleFunc);
		    $('#genderFemale').unbind('click');
			$('#genderFemale').click(this.genderFemaleFunc);

		},
		genderMaleFunc:function(e){
			$("#genderFemale").removeProp("checked");
			$("#genderMale").prop( "checked", true );
		},
		genderFemaleFunc:function(e){
			$("#genderMale").removeProp("checked");
			$("#genderFemale").prop( "checked", true );
		},
		sendEditChangesFunc:function(e){
		    var genderTemp="Female";
			if($("#genderMale" ).prop( "checked" )){
				genderTemp="Male";
			}
			var data="";

	        var data= {
			  	    "name":$("#userName").val().trim(),
			  	    "email":$("#userEmail").val(),
			  		"gender":genderTemp,
			};

			if($("#userName").val()==""||$("#userEmail").val()=="")
		 	{
		 		alert("Dont leave empty feilds.");
		 	    return;
		 	}

			if(!getUserCollection.validateName($("#userName").val())) {
	          	alert("Olny characters and spaces allowed in name.");
			 	return
	         } 

	        if(!getUserCollection.ValidateEmail($("#userEmail").val())) {
	            alert("Enter valid email address.");
			 	return
	         }
			var _this=this;
										
			getUserCollection.add(data);

		    var thisModel=getUserCollection.get(e.currentTarget.id);
			thisModel.save(data,{success: function(results) {
				console.log(results);
				$("#editModal").modal('hide');
			    $(".editedDevice").removeClass("hide");
				$(".editedDevice").addClass("show");
				if(_this.addedDeviceTimer)  clearTimeout(_this.addedDeviceTimer);
				   _this.addedDeviceTimer= setTimeout(function(){
			        	$(".editedUser").removeClass("show");
					  	$(".editedUser").addClass("hide");
					 },5000);
				 
				 getUserCollection.editUserAvatar(e.currentTarget.id);


			}
		});
			  					
		},

		cancelChangesFunc:function(e){
			$("#editModal").modal('hide');

		},
		deleteUserFunc:function(e){
		;
			$(".ConfirmNo").attr('id',e.currentTarget.id);
			$(".ConfirmYes").attr('id',e.currentTarget.id);
			$('.ConfirmNo').unbind('click');
			$('.ConfirmNo').click(this.ConfirmNoFunc);
			$('.ConfirmYes').unbind('click');
			$('.ConfirmYes').click(this.ConfirmYesFunc);
		},
		showBarCharGraph:function(){
			this.barChartView.render();
		},
		ConfirmYesFunc:function(e){
				$("#deleteModal").modal('hide');
				var thisModel=getUserCollection.get(e.currentTarget.id);
				thisModel.destroy();
				$(".deleteUser").removeClass("hide");
				$(".deleteUser").addClass("show");
                getBarGraphDataCollection.initialize();
			    getBarGraphDataCollection.fetch({reset:true});
			    getCountUserCollection.initialize();
			    getCountUserCollection.fetch({reset:true});
	            getUserCollection.initialize();
			    getUserCollection.fetch({reset:true});
		        if(this.addedBranchTimer)  clearTimeout(this.addedBranchTimer);
				this.addedBranchTimer= setTimeout(function(){
					$(".deleteUser").removeClass("show");
					$(".deleteUser").addClass("hide");
				},5000);
		},
		ConfirmNoFunc:function(e){
			$("#deleteModal").modal('hide');
			return;
		},
	

   
	});
		return homePageView;
});