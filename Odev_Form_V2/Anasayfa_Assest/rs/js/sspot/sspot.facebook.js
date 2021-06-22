sspot.facebook = sspot.facebook || {};

sspot.facebook.uye_ol = function(btn){
	$form = $(btn).parents('form');
	sspot.facebook.login_status_uye_ol($form);
	return false;
}

sspot.facebook.login_status_uye_ol = function($form){
	FB.getLoginStatus(function(response) {
		if (response.status === 'connected') {
		  	// Logged into your app and Facebook.
		  	var at = response.authResponse.accessToken;
			FB.api('/me', function(response) {
				$form.find(".btn-facebook").hide();
				$form.find("#sifre").parent().hide();
				$form.find("#sifret").parent().hide();
				$form.find("#kuladi").parent().addClass("has-error");
				$form.find("#sifrelisoru").parent().addClass("has-error");
				
				$form.append('<input type="hidden" name="fbat" value="'+at+'" >');
				
				if(response.email) $form.find("#email").val(response.email);
				if(response.gender == 'female'){
				  $form.append('<input type="hidden" name="cinsiyet" value="kadın" >');
				}else if(response.gender == 'male'){
				  $form.append('<input type="hidden" name="cinsiyet" value="erkek" >');
				}else{
				  $form.append('<input type="hidden" name="cinsiyet" value="başka" >');
				}
				if(response.location && response.location.name){
				  $form.append('<input type="hidden" name="sehir" value="'+response.location.name.split(",")[0]+'" >');
				}
			});
		} else if (response.status === 'not_authorized') {
			// The person is logged into Facebook, but not your app.
			sspot.facebook.login_dialog($form,"login_status_uye_ol");
		} else {
		  	// The person is not logged into Facebook, so we're not sure if
		  	// they are logged into this app or not.
			sspot.facebook.login_dialog($form,"login_status_uye_ol");		  	
		}
    });
}


sspot.facebook.login_dialog = function($form,call){
	 FB.login(function(response) {
		 if(response.status == "connected"){
			 	  if(call=="login_status_uye_ol")  sspot.facebook.login_status_uye_ol($form);
			 else if(call=="login_status_giris")   sspot.facebook.login_status_giris($form);
			 else if(call=="login_status_entegre") sspot.facebook.login_status_entegre($form);
		 }
	 }, {scope: 'public_profile,email'});	
}

sspot.facebook.giris = function(btn){
	$form = $(btn).parents('form');
	sspot.facebook.login_status_giris($form);
	return false;
}

sspot.facebook.login_status_giris = function($form){
	FB.getLoginStatus(function(response) {
		if (response.status === 'connected') {
		  	// Logged into your app and Facebook.
		  	var at = response.authResponse.accessToken;
			$.post('/axy/?na=uyelik&na2=giris_facebook',{'fbat':at},function(res){
				console.log(res);
				if(res.durum=="success"){
					document.location = '/';
				}else if(res.durum=="error"){
					sspot.bildirimHTML({html: res.bilgi, class: 'alert-danger', hide:true, el: $form.find('[name="facebook"]').parent() });
				}
			},'json');
		} else if (response.status === 'not_authorized') {
			// The person is logged into Facebook, but not your app.
			sspot.facebook.login_dialog($form,"login_status_giris");
		} else {
		  	// The person is not logged into Facebook, so we're not sure if
		  	// they are logged into this app or not.
			sspot.facebook.login_dialog($form,"login_status_giris");		  	
		}
    });
}

sspot.facebook.entegre_action = '';
sspot.facebook.entegre = function(btn,action){
	$form = $(btn).parents('form');
	sspot.facebook.entegre_action = action;
	sspot.facebook.login_status_entegre($form);
	return false;
}

sspot.facebook.login_status_entegre = function($form){
	FB.getLoginStatus(function(response) {
		if (response.status === 'connected') {
		  	var at = response.authResponse.accessToken;
			$.post('/axy/?na=uyelik&na2=entegre_facebook',{'fbat':at, 'action':sspot.facebook.entegre_action},function(res){
				if(res.success){
					//sspot.bildiri_modal(res.bilgi,'text-success');
					sspot.bildirimHTML({html: res.bilgi, class: 'alert-success', hide:true, el: $form });
				}else if(res.error){
					sspot.bildirimHTML({html: res.bilgi, class: 'alert-danger', hide:true, el: $form });
				}
			},'json');
		} else if (response.status === 'not_authorized') {
			// The person is logged into Facebook, but not your app.
			sspot.facebook.login_dialog($form,"login_status_entegre");
		} else {
		  	// The person is not logged into Facebook, so we're not sure if
		  	// they are logged into this app or not.
			sspot.facebook.login_dialog($form,"login_status_entegre");		  	
		}
    });
}