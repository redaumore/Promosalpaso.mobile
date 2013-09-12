var watchID = null;
//Wait for device API libraries to load
//
document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
//
function onDeviceReady() {
	
}

jQuery(document).bind("mobileinit", function(){
    $.mobile.defaultPageTransition = 'none';
});

jQuery(document).ready(function(){
    /*if(jQuery.browser.mobile){*/
		var _height = jQuery(window).height();
		var _menu_height = jQuery("#main_menu").outerHeight();
		var _margin_top = _height - _menu_height - 28;
		console.log(_margin_top);
		jQuery("#main_div").css("background-size",_margin_top);
		jQuery("#main_menu").css("margin-top",_margin_top);
        _last_update = window.localStorage.getItem("last_update");    
        if(_last_update == null)
            setLastUpdate(new Date(0));
        console.log("Ultima actualización: "+_last_update);    
        console.log("Actualizando ciudades...");
        jQuery.mobile.showPageLoadingMsg('a', "Buscando tu localización...", false);
        getRegionsUpdate();
        console.log("Geolocalizando...");
        getGeoLocation();
        console.log("Trayendo categorias...");
        getCategories(false);
        initializeLazyLoader();
        
  });


jQuery(document).on("change blur",'#state_select', function() {
    var selectedState = jQuery(this).val();
    addCites(selectedState);
    if (jQuery('#city_select option').size() == 0) {
        jQuery('#city_select').append('<option value="nocity">No se encontraron ciudades</option>');
    }
    event.preventDefault();
});

jQuery(document).on("click",'#a_search_button', function() {
    event.preventDefault();
    doSearch();
});

//(function(a){jQuery.browser.mobile=/android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);

function showMessage(message, title, button){
    jQuery.mobile.showPageLoadingMsg('a', message, true);
    setTimeout( function() { jQuery.mobile.hidePageLoadingMsg(); }, 3000 );
}

function setLastUpdate(timestamp){
    _last_update = timestamp.toISOString();
    _last_update = _last_update.replace("T"," ");
    _last_update = _last_update.replace("Z","");
    window.localStorage.setItem("last_update", _last_update);
}

function gotoCategories(){
	event.preventDefault();
	$.mobile.changePage(jQuery("#category"));
	loadSelectedCategories();
}

jQuery(document).on("click",'.go-back', function() {
    event.preventDefault();
    var thisPage = location.hash;
    if(thisPage == "#category"){
    	saveSelectedCategories();
    }
    jQuery.mobile.back();
});

jQuery(document).on("click",'.go-main', function() {
    event.preventDefault();
    $.mobile.changePage(jQuery("#main"));
});

function getCategories(fromCategories){
	var cats = window.localStorage.getItem("categories");
	var local_last_update = _last_update;
	if(cats == null){
		localDate = new Date(0);
		local_last_update = localDate.toISOString();
		local_last_update = local_last_update.replace("T"," ");
		local_last_update = local_last_update.replace("Z","");
	}
	$.ajax({
        url: _baseServUri + 'getcategories',
        dataType: 'jsonp',
        data: {"last_update": local_last_update
        	},
        jsonp: 'jsoncallback',
        contentType: "application/json; charset=utf-8",
        timeout: 10000,
        beforeSend: function (jqXHR, settings) {
            console.log(settings.url);
        },
        success: function(data, status){
        	if(data.length != undefined){
        		if(data.length != 0){
        			var jsondata = JSON.stringify(data);
        			window.localStorage.setItem("categories", jsondata);
        			jQuery("#cat").val(jsondata);
        		}
        		else
        			console.log("Servicio de categorias trajo array vacio.");
        		loadCategories();
        	}
        	else{
        		console.log(data.code + ": " + data.message);
        		window.localStorage.removeItem("categories");
        		jQuery("#cat").val("");
        	}
        	console.log(JSON.stringify(data));
        },
        error: function(jqXHR, textStatus, errorThrown){
        	console.log("Error recuperando las categorias.");
        }
    });
}

function loadCategories(){
	var categories = window.localStorage.getItem("categories");
	if(categories == null){
		//getCategories(true);
		return;
	}
	objCategory = JSON.parse(categories);
	jQuery("#category-container").empty();
	jQuery.each(objCategory, function(index, father) {
		$( "<div></div>", {
			"id":"f-"+father.id,
			"data-role":"collapsible",
			"data-inset":"false",
		}).appendTo("#category-container" );
		$('<h3><span class="category-father">'+father.title+'</span><span id="counter-'+father.id+'" class="category-counter">0</span></h3>').appendTo("#f-"+father.id );
		$('<ul id="ul-'+father.id+'" data-role="listview"></ul>').appendTo("#f-"+father.id );
		jQuery.each(this.children, function(index, child){
			$('<li style="padding:0px; border:0px; border-bottom: 1px solid #999999">'
		        	+'<div class="ui-controlgroup-controls">'
						+'<input type="checkbox" name="chbx-'+child.id+'" id="chbx-'+child.id+'" data-inset="false">'
						+'<label for="chbx-'+child.id+'" class="ui-btn ui-btn-icon-left category-child">'
						+child.title
						+'</label>'
				+'</div>'
			+'</li>').appendTo("#ul-"+String(child.id).substring(0, 3)+"0");
		});
		$('<li style="padding:0px; border:0px;">'
	        	+'<div class="ui-controlgroup-controls">'
					+'<input type="checkbox" name="chbx-'+father.id+'" id="chbx-'+father.id+'" data-inset="false">'
					+'<label for="chbx-'+father.id+'" class="ui-btn ui-btn-icon-left category-child">Todos</label>'
			+'</div>'
		+'</li>').appendTo("#ul-"+father.id);
	});
	
	jQuery('span[id^="counter-"]').hide();
	
	jQuery('input[name^="chbx-"]').click( function(){
		var id_father = String(this.id).substring(5, 8) + "0";
		var counter = parseInt(jQuery("#counter-"+id_father).text());
		
		if($(this).is(':checked'))
			counter = counter + 1;
		else
			counter = counter - 1;
		
		if(counter<0)
			counter = 0;
		jQuery("#counter-"+id_father).text(counter);
		
		if(counter == 0)
			jQuery("#counter-"+id_father).hide();
		else
			jQuery("#counter-"+id_father).show();
		
	});
}

function clearCategories(){
	window.localStorage.removeItem("selected_categories");
	loadSelectedCategories();
}

function loadSelectedCategories(){
	var selectedCategories = window.localStorage.getItem("selected_categories");
	if(selectedCategories == null){
		jQuery('input[name^="chbx-"]').each(function(){
			if($(this).is(':checked'))
				$(this).prop("checked",false);
				$(this).checkboxradio("refresh");
		});
		jQuery("[class=category-counter]").text("0");
		jQuery("[class=category-counter]").hide();
	}
	else{
		var cats = selectedCategories.split(",");
		var id_father; 
		var counter;
		jQuery("[class=category-counter]").text("0");
		jQuery.each(cats, function(){
			var checkbox = $("#chbx-"+this.toString());
			checkbox.prop("checked",true);
			
			id_father = String(this.toString()).substring(0,3) + "0";
			counter = parseInt(jQuery("#counter-"+id_father).text());
			counter = counter + 1;
			jQuery("#counter-"+id_father).text(counter);
			jQuery("#counter-"+id_father).show();
			
			checkbox.checkboxradio("refresh");
		});
		
	}
}

function saveSelectedCategories(){
	var cats = new Array();
	var strcat = "";
	jQuery('input[name^="chbx-"]').each(function(){
		if($(this).is(':checked')){
			strcat = $(this).attr("name");
			cats.push(strcat.substring(5));
		}
	});
	window.localStorage.setItem("selected_categories", cats.toString());
}

function initializeLazyLoader(){
	console.log("initializeLazyLoader()");
	 // Initialize the lazyloader widget
   $("#one").lazyloader();

   /* Set some default options for the lazyloader
    *   the first three set the timeout value for when the widget should check
    *   the current scroll position relative to page height to decide whether
    *   or not to load more yet.  The showprogress option is to specify the
    *   duration of the fadeIn animation for the lazyloaderProgressDiv.
    */
   $.mobile.lazyloader.prototype.timeoutOptions.mousewheel = 300;
   $.mobile.lazyloader.prototype.timeoutOptions.scrollstart = 700;
   $.mobile.lazyloader.prototype.timeoutOptions.scrollstop = 100;
   $.mobile.lazyloader.prototype.timeoutOptions.showprogress = 500;
   
   jQuery("#mobile_uuid").val(getuuid());
}

function setupLazyLoad(){
	console.log("setupLazyLoad()");
   /* Reset the lazy loader instance for the albums page
    *   This resets the widget instance variables for the albums page    
    *   This is done here because the artists page is one level up
    *   from the albums page, so it needs to be reset in case the user
    *   selects a different artist who will have their own albums that
    *   will need to be lazy loaded
    *   
    *   Note: in this example, "reset" is the function and "albums" is
    *      the pageId of the albums page 
    */
   //$( "#one" ).lazyloader( "reset", "albums" );

   // Use an automatic threshold that's a function of the height of the viewport
   threshold = 420; //$( window ).height() * 2;

   // Set up the variable options to pass to the lazyloader reinitialize function
   var options = {   "threshold"   : threshold,
                     "retrieve"    : 7,
                     "retrieved"   : 7,
                     "bubbles"     : true,
                     "offset"      : 0 };

   // Set up the page specific settings to pass to the lazyloader reinitialize function
   var settings = {  "pageId"                : "one",
                     "templateType"          : "dust",
                     "templateId"            : "promoitemlist",
                     "template"              : "promoitemlist",
                     "templatePrecompiled"   : true,
                     "mainId"                : "promolist",
                     "progressDivId"         : "lazyloaderProgressDiv",
                     "moreUrl"               : _baseServUri + "getpromolist",
                     "clearUrl"              : _baseServUri + "clearpromolist",
                     "JSONP"				  : true,
                     "JSONPCallback"		  : "jsoncallback"};

   // Set up the post parameters to pass to the lazyloader reinitialize function
   var parameters = {  "retrieve"    : options.retrieve,
                       "retrieved"   : options.retrieved,
                       "offset"      : options.offset };

   // Reinitialize the lazyloader so that it correctly handles the listview on the artists page
   $( "#one" ).lazyloader( "reInitialize", options, settings, parameters );
}
//});

jQuery(document).on("lazyloaderdoneloading", "#one", function ( evt ){
	var prices;
	prices = jQuery(".precio");
	for(var i = 0; i < prices.length; i++){
		prices[i].innerText = formatPrice(prices[i].innerText);
	}
});

/*WATCH POSITION*/
function startWatchPosition() {
	console.log("startWatchPosition()");
    // Throw an error if no update is received every 30 seconds
    var options = { timeout: 30000 };
    watchID = navigator.geolocation.watchPosition(onSuccessWatchPosition, onErrorWatchPosition, options);
}

// onSuccess Geolocation
//
function onSuccessWatchPosition(position) {
	console.log("onSuccessWatchPosition()");
	console.log("latitude:"+position.coords.latitude+" longitude:"+position.coords.longitude);
    if(getDistance(jQuery("#lat").val(),jQuery("#lng").val(), 
    				position.coords.latitude, position.coords.longitude) > 100){
    	_lat = position.coords.latitude;
    	_lng = position.coords.longitude;
    	jQuery("#lat").val(_lat);
    	jQuery("#lng").val(_lng);
    	console.log("onSuccessWatchPosition: distance>100");
    	loadPromoList();
    }  
}

// onError Callback receives a PositionError object
//
function onErrorWatchPosition(error) {
    console.log('onErrorWatchPosition. code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

function getDistance($lat1, $lng1, $lat2, $lng2)
{
	var $miles = false;
    var $pi80 = Math.PI / 180;
    $lat1 = $lat1 * $pi80;
    $lng1 = $lng1 * $pi80;
    $lat2 = $lat2 * $pi80;
    $lng2 = $lng2 * $pi80;
 
    $r = 6372.797; // mean radius of Earth in km
    $dlat = $lat2 - $lat1;
    $dlng = $lng2 - $lng1;
    $a = Math.sin($dlat / 2) * Math.sin($dlat / 2) + Math.cos($lat1) * Math.cos($lat2) * Math.sin($dlng / 2) * Math.sin($dlng / 2);
    $c = 2 * Math.atan2(Math.sqrt($a), Math.sqrt(1 - $a));
    $km = $r * $c;
 
    return ($miles ? ($km * 0.621371192) : Math.round($km * 1000));
}
