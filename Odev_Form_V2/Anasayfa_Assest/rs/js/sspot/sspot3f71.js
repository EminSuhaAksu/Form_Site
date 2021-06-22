var sspot = sspot || {};

sspot.init = function(){
	$('[data-toggle="tooltip"]').tooltip();
	sspot.toTop();
	$(".auto_complate_input").each(function(){
		var url = $(this).data("url");
		$(this).autocomplete({
			serviceUrl: url,//'/ax/?a=yenig&na=autocomplate&na2=altsayfa',
			onSelect: function (suggestion) {
				console.log(suggestion);
			}
		});
	});
	
	sspot.baslik_cache = '';
	
	$(window).on("scroll",function(){
		if($(window).scrollTop() > 49){
			$("#categories").hide();
			$("#ustbar").addClass("navbar-fixed-top");
			$("#left-frame").addClass("scrolled");
			
			if($('body').hasClass("altsayfa_header_arkaplan")){
				$('body').removeClass("altsayfa_header_arkaplan");
				$('body').addClass("altsayfa_header_arkaplan_scrolled");
			}
			
			if($(window).width() < 481){
				if(sspot.baslik_cache == ''){
					sspot.baslik_cache = $(".title[id^='baslik']").find('a').text();
				}
				if($("#baslik_ustmenu").length && (sspot.baslik_cache != '' && sspot.baslik_cache != 'undefined') ){
					$("#baslik_ustmenu").text(sspot.baslik_cache).show();
					$("#altsayfa_ustmenu").hide();
				}
			}
		}else{
			$("#categories").show();
			$("#ustbar").removeClass("navbar-fixed-top");
			$("#left-frame").removeClass("scrolled");

			if($('body').hasClass("altsayfa_header_arkaplan_scrolled")){
				$('body').addClass("altsayfa_header_arkaplan");
				$('body').removeClass("altsayfa_header_arkaplan_scrolled");
			}
			
			$("#baslik_ustmenu").hide();
			$("#altsayfa_ustmenu").show();

		}
	});
	
	$("#sol-index-list").on("scroll",function(){
		sessionStorage.setItem("sideScrollPosition", $("#sol-index-list").scrollTop());
	});
	
	$('.dropdown-keepalive').click(function(e) {
          e.stopPropagation();
    });
	
	$(".get_facebook_shares").each(function(){
		var $el = $(this);
		var url = $el.data("shareurl");
		$.getJSON('http://graph.facebook.com/?id='+url+'&callback=?',function(data){
			if(typeof data.shares == "undefined") data.shares = 0;
			$el.text(data.shares);
		});		
	})
	$(".get_twitter_sharea").each(function(){
		return false;
		var $el = $(this);
		var url = $el.data("shareurl");
		$.getJSON('http://urls.api.twitter.com/1/urls/count.json?url='+url+'&callback=?',function(data){
			if(typeof data.count == "undefined") data.count = 0;
			$el.text(data.count);
		});
	});

	
}

sspot.toTop = function(){
	var totopR = (parseInt($(window).width())/2) + (parseInt($("#main-wrap").width()) / 2) + 15;
	var anm_obj = {};

	if($(window).width() < 481){
		$('#toTop').css("top","initial")
		anm_obj = {show: {bottom:'30px', top:'auto'}, hide: {bottom:'-100px'}}
		totopR -= 60;
	}else{
		anm_obj = {show: {top:'100px'}, hide: {top:'-100px'}}
	}
	
	$(window).scroll(function() {
		if($(this).scrollTop() > 100){
			$('#toTop').css("left",totopR).stop().animate( anm_obj.show , 700);
		}else{
			$('#toTop').stop().animate( anm_obj.hide , 700);
		}
	});
	$('#toTop').click(function() {
		$('html, body').stop().animate({scrollTop: 0}, 700, function() {
		   $('#toTop').stop().animate( anm_obj.hide , 700);
		});
	});
};

sspot.reklami_atla = function(){
	var value = 10;
	var now = new Date();
	var time = now.getTime();
	time += 1800 * 1000;
	now.setTime(time);
	document.cookie = 
	'raklami_atla_reklam1=' + value + 
	'; expires=' + now.toUTCString() + 
	'; path=/';
	$('#reklam_bg').remove();
	$('#reklami_atala').remove();
	$('.static_reklam_kutusu').removeClass('static_reklam_kutusu');
};


sspot.uzun_entry_ac = function(id){
	$('.entry_'+id+' .uzunEntry').css('max-height','100%');	
	$('#tum_'+id).remove();
};


sspot.koy = function(el,bas,son) {
	var $el = $(el);
	var $form = $el.closest('form');
	console.log($el);
	console.log($form);
	var $textarea = $form.find(".entry_textarea");
	
	if (document.selection && bas!=''){
		var sonuc = document.selection.createRange();
		var el = sonuc.parentElement();
		if(el!=t){
			alert('metni seç, sonra tuşa bas.');
		}else{
			sonuc.text  = bas+sonuc.text+son; sonuc.select();
		}
	}else if ($textarea[0].selectionStart || $textarea[0].selectionStart == '0') {
		var tbas = $textarea.val().substring(0,$textarea[0].selectionStart);
		var sonuc = $textarea.val().substring($textarea[0].selectionStart,$textarea[0].selectionEnd);
		var tson = $textarea.val().substring($textarea[0].selectionEnd,$textarea.val().length);
		$textarea.val(tbas+bas+sonuc+son+tson);
		$textarea[0].selectionStart = $textarea[0].selectionEnd + 5 + (bas.length+son.length);
		$textarea[0].selectionEnd = $textarea[0].selectionStart; 
	} else {
		$textarea.val( $textarea.val()+bas+son );
	}
	$textarea.focus();
	$form.data("keep-active","1");
	if(window.event)
		event.returnValue = false;

	return false;
};

sspot.bildirimHTML = function(opts){
	var r = '<div class="alert '+opts.class+'" style="'+ (opts.hide?'display:none':'') +'"  role="alert" >';
	r += opts.html;
	r += '</div>';
	
	if(opts.el && opts.hide){
	   opts.el
		.append(r)
		.find('.alert')
		.slideDown(500,function(){
			setTimeout(function(){ 
				opts.el.find('.alert').slideUp(500, function(){
					$(this).remove() 
					//$form.slideUp();
				})
			},10000)
		});
	}else{
		return r;
	}
}

sspot.tooltip = function(opts){
	if(opts.update===true){
		opts.el
			//.tooltip('hide')
			.attr('data-original-title', opts.mesaj)
			.tooltip('fixTitle')
			.tooltip('show');				
	}else{
		opts.el.tooltip({
			'placement':opts.placement,
			'title':opts.mesaj,
			'template':'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
			'trigger':'click'
		}).tooltip('show');
	}
	if(opts.destroy_time){
		setTimeout(function(){
			opts.el.tooltip('destroy');
		},opts.destroy_time);
	}
}

sspot.liste = {};
sspot.liste.sayfa = function(p,altsayfa,url_ek){
	var pn = parseInt(p);
	if(pn===0 || isNaN(pn)){
		pn = $(p).val();
	}
	if(typeof url_ek === "undefined"){
		url_ek = "";
	}

	var d = new Date();
	d.setTime(d.getTime() + (60*60*1000));
	var expires = "expires="+d.toUTCString()+"; path=/";
	document.cookie = "list_type_p="+pn+"; " + expires;	

	$.post("/axy/?na=liste&na2=sayfa"+url_ek, {'p_sol':pn, 'altsayfa':altsayfa}, function(res){
		$(".index-list").html(res);
	});
	return false;
}
sspot.liste.index_sayfa = function(p,altsayfa,url_ek){
	var pn = parseInt(p);
	if(pn===0 || isNaN(pn)){
		pn = $(p).val();
	}
	$.post("/axy/?na=liste&na2=sayfa"+url_ek, {'p_sol':pn, 'tur':'index', 'altsayfa':altsayfa}, function(res){
		$(".bigindex-list").html(res);
		$(window).scrollTop($(".bigindex-list").offset().top - 130);
	});
	return false;
}

sspot.sol_kutu = {};
sspot.sol_kutu.toggle = function(){
	$sol_kutu = $("#sol_kutu");
	var d = new Date();
	d.setTime(d.getTime() + (99*24*60*60*1000));
	var expires = "expires="+d.toUTCString()+"; path=/";
	
	if($sol_kutu.hasClass("active")){
		$sol_kutu.removeClass("active");
		$sol_kutu.addClass("no_need_ajax");
		$sol_kutu.find("#sol_kutu_toggle").find("i").removeClass("ssicon-chevron-left").addClass("ssicon-chevron-right");
		document.cookie = "sol_kutu=passive; " + expires;	
	}else{
		$sol_kutu.addClass("active");
		
		if($sol_kutu.hasClass("no_need_ajax")===false){
			$sol_kutu.find(".a_takip").html('<li>yükleniyor...</li>');

			$.post("/axy/?na=altsayfa&na2=takip_list", {}, function(res){
				$sol_kutu.find(".a_takip").html(res);
				$sol_kutu.find("#sol_kutu_toggle").find("i").removeClass("ssicon-chevron-right").addClass("ssicon-chevron-left");
				$sol_kutu.addClass("no_need_ajax");
			});
		}else{
			$sol_kutu.find("#sol_kutu_toggle").find("i").removeClass("ssicon-chevron-right").addClass("ssicon-chevron-left");
		}
		
		document.cookie = "sol_kutu=active; " + expires;	
	}
	
	return false;
}
sspot.iletisim_submit = function(form){
	var $form = $(form);
	
	var captcha = $form.find('[name=g-recaptcha-response]').val();
	
	if(captcha==''){
		alert("captcha'yı unutma!");
		return false;
	}else{
		return true;
	}
}