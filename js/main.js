$(function() {

	$('#sections').on('change',function(event) {
			event.preventDefault();
			
			//selection input into API key
			//variables for api
			selection = $('#sections').val();
			nyTimesUrl = "https://api.nytimes.com/svc/topstories/v2/"+ selection +".json";
			
			//Variable for API key
			var url = nyTimesUrl;
				url += '?' + $.param({
				  'api-key': "9f6bd567aad6481cb1ca67fee0d18cbd"
				});
			
			//Clearing the Story grid for new selection
			$('.stories-grid').empty()
			
			//Load image loader
			$(document).ajaxStart(function(){
				    $(".ajax-loader").css("display", "block");
				    $(".copyright").css("display", "none");
				});

			$(document).ajaxComplete(function(){
			    $(".ajax-loader").css("display", "none");
			    $(".copyright").css("display", "block");
			});

		//Ajax request
		$.ajax({
		  url: url,
		  method: 'GET',
		  dataType: 'json'
		//Getting results if Ajax request connects  
		}).done(function(data) {
			var results = data.results;//array results
			var rLength = data.results.length;//array length
			var counter = 0;
			

			if(rLength !== 0){

		  $.each(results, function(key, value){
		  	//variables for news objects
		  	var mediaLength = value.multimedia.length;
		  	var multimedia = value.multimedia[4];	
		  	var mediaLink = value.url
		  	var mediaInfo = value.abstract
		  	var newsStory = ''
		 	
			//append news stories  
			  	if(mediaLength){
			  		
			  		newsStory += '<div class="news" style="background-image:url('+multimedia.url+')">';
			  		newsStory += '<a href="';
			  		newsStory += mediaLink;
			  		newsStory += '" target="_blank">';
			  		newsStory += '<p class="info">'+ mediaInfo + '</p>';
			  		newsStory += '</a>';
			  		newsStory += '</div>';

			  		$('.stories-grid').append(newsStory);
						}
		  	});
			}
		 
		}).fail(function(err) {
		  $('.stories-grid').append('<p class="no-stories">Sorry there are no stories</p>');
		});
	});
});

//position change for header
$(function(){
	$('#sections').on('change', function(event) {
		$("header").animate({
    		opacity: 0,
    		width: "0",
    	},800, "linear", function() {
    			
  			$(this).css({'left':'0','opacity':'1','width':'100%'});
  			$( this ).removeClass( "head" ).addClass( "head-selected");
		})

		$( ".wrapper-logo" ).removeClass( ".wrapper-logo" ).addClass( "wrapper-logo-selected" );

		$( ".logo-img" ).removeClass( ".logo-img" ).addClass( "logo-img-selected" );

	});
});


//Animate Logo
$(function(){
	var click = document.getElementsByClassName('wrapper-logo');
	var animate = document.getElementsByClassName('logo-img');
	var animateMethods = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

	$(click).click(function(event) {
		$(animate).addClass( "animated rubberBand" ).one(animateMethods,function(){
			$(this).removeClass('animated ' + 'rubberBand');
		});
	});
});

//Drop Down menu
$(document).ready(function() {
	$('select').selectBoxes({
	maxHeight : 200 // the maximum height of the dropdown list
		});
});





