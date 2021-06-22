sspot.uye = {};

sspot.uye.popup = function(){
	$.post("/ax/?a=yenig&na=uyelik&na2=form", {} , function(res){
		sspot.modal.init({"content":res});
	});
	
	return false;
}

sspot.uye.giris_submit = function(form){
	var $form = $(form);
	
	$.post("/ax/?a=yenig&na=uyelik&na2=giris_submit", $form.serialize() , function(res){
		
		if(res.durum=='success'){
			$form.append( sspot.bildirimHTML({html: res.mesaj, class:'alert-success', hide:true, el:$form}) );
			sspot.uye.devam_et_do();
			setTimeout(function(){
				sspot.modal.kapat();
			},3500);
		}else if(res.durum=='error'){
			$form.append( sspot.bildirimHTML({html: res.mesaj, class:'alert-danger', hide:true, el:$form}) );
		}
	},'json');
	
	return false;
}

sspot.uye.kayıt_submit = function(form){
	var $form = $(form);
	
	$.post("/ax/?a=yenig&na=uyelik&na2=kayıt_submit", $form.serialize() , function(res){
		if(res.durum=='success'){
			$form.find(".has-error").removeClass("has-error");
			$form.append( sspot.bildirimHTML({html: res.mesaj, class:'alert-success', hide:true, el:$form}) );
			//sspot.uye.devam_et_do();
			
		}else if(res.durum=='error'){
			$form.append( sspot.bildirimHTML({html: res.mesaj, class:'alert-danger', hide:true, el:$form}) );
			if(res.form_hata){
				$form.find(".has-error").removeClass("has-error");
				for(var name in res.form_hata){
					$inp = $form.find("[name='"+name+"']");
					$inp.parent().find(".help-block").remove();
					$inp.after('<small class="help-block">'+res.form_hata[name]+'</small>');
					$inp.closest(".form-group").addClass("has-error");
				}
			}
		}
	},'json');
	
	return false;
}

sspot.uye.devam_et_do = function(){
	if(sspot.uye.devam_et && sspot.uye.devam_et.f){
		var f = sspot.uye.devam_et.f;
		var p = sspot.uye.devam_et.p;
		
		if(f==='sspot.entry.oy') sspot.entry.oy(p[1],p[2],p[3],p[4]);
	}
}

sspot.uye.gece_modu = function(el, yap){
	var $el = $(el);
	
	$.post("/ax/?a=yenig&na=uyelik&na2=gece_modu", {'yap':yap} , function(res){
		if(res.durum=='success'){
			$el.html("gece modu <strong>" + (yap=='ac'?'kapa':'aç') + "</strong>" );
			$el.attr("onclick", "return sspot.uye.gece_modu(this,'"+(yap=='ac'?'kapa':'ac')+"');")
		}else if(res.durum=='error'){
			sspot.tooltip({
				el: $el,
				mesaj: res.mesaj
			});
		}
	},'json');
	
	return false;
}

sspot.uye.arama = function(form){
	var $form = $(form);
	var kuladi = $form.find("input[name='kuladi']").val();
	kuladi = kuladi.trim().replace(/ /g,'-');
	document.location = '/u/'+kuladi+'/';
	return false;
}

sspot.uye.load_more = function(el, kuladi, ne, ls, adet){
	var $el = $(el);
	$el.find("i").addClass("spin_anim");
	$.post("/ax/?a=yenig&na=uyelik&na2=load_more", {'kuladi':kuladi, 'ne':ne, 'ls':ls, 'adet':adet} , function(res){
		if(res.length<5){
			$el.text("bitti...").attr("onclick", "return false");
		}else{
			$el.before(res);
			$el.attr("onclick", "return sspot.uye.load_more(this, '"+kuladi+"', '"+ne+"', '"+(parseInt(ls)+parseInt(adet))+"', '"+adet+"');")
		}
		$el.find("i").removeClass("spin_anim");

	});
}

sspot.uye.prosifcheck = function(form){
	var $form = $(form);
	
	var s = $form.find("[name='esifre']").val();
	if(s.length<3){
		$form.find("[name='esifre']").parent().parent().addClass("has-error");
		alert("değişiklik yapmadan önce şifreni girmen gerekli");
		return false;
	}
	return true;
}

sspot.uye.takip = function(el, kuladi, action){
	var $el = $(el);
	
	var t1 = 'takibi bırak';
	var t2 = "return sspot.uye.takip(this, '"+kuladi+"', 'birak');";
	if(action=='birak'){
		var t1 = 'takip et';
		var t2 = "return sspot.uye.takip(this, '"+kuladi+"', 'et');";
	}
	
	$.post("/axy/?na=uyelik&na2=takip", {'kuladi':kuladi, 'action':action}, function(res){
		console.log(res);
		if(res.durum=='success'){
			sspot.tooltip({
				el: $el,
				placement: 'bottom',
				mesaj: res.mesaj,
				update: true
			});
			$el.text(t1).attr("onclick", t2);
		}else if(res.durum=='error'){
			sspot.tooltip({
				el: $el,
				placement: 'bottom',
				mesaj: res.mesaj,
				update: true
			});
		}
	},'json');
	
	return false;
}

sspot.uye.bildirim_toggle = function(el){
	var $el = $(el);
	
	if($el.siblings("#head_bildirim_wrap").length==0){
		$el.parent().append('<div id="head_bildirim_wrap" class="head_bildirim_wrap"></div>');
	}
	var $wrap = $("#head_bildirim_wrap");
	$("#head_ticaret_bildirim_wrap").removeClass("active").html("");
	
	if($wrap.hasClass("active")){
		$wrap.removeClass("active").html("");
	}else{
		$wrap.addClass("active").html('<div class="loading"></div>');
		
		$.post("/axy/?na=bildirim&na2=list", {}, function(res){
			$wrap.html(res);
			
			var unseen_count = $wrap.find(".unseen").length;
			var cur_unseen = parseInt($(".bildirim_sayi:first").text());
			var new_unseen = cur_unseen - unseen_count;
			if(new_unseen<0) new_unseen = 0;
			
			if(new_unseen==0){
				$(".bildirim_sayi").remove();	
			}else{
				$(".bildirim_sayi").text(new_unseen);
			}
			
		});
	}
	return false;
}

sspot.uye.kulad_degissin = function(el,kuladi){
	var $el = $(el);
	
	var cnfm = confirm("yazarın entry girmesi engellenecek, emin misin?");
	if(cnfm===false) return false;
	
	$.post("/axy/?na=mod&na2=kuladi_degis", {"kuladi":kuladi}, function(res){
		if(res.durum=="success"){
			$el.html(res.mesaj + '<i class="ssicon-done"></i>');
		}else if(res.durum=="error"){
			$el.html(res.mesaj);
		}
	},'json');
	return false;
}

sspot.uye.kuladi_degis_submit = function(form){
	
	var $form = $(form);
	
	var cnfm = confirm("adın değişecek, emin misin?");
	if(cnfm===false) return false;
	
	$.post("/axy/?na=mod&na2=kuladi_degis_submit", $form.serialize(), function(res){
		if(res.durum=="success"){
			//$el.html(res.mesaj + '<i class="ssicon-done"></i>');
			sspot.bildirimHTML({html: res.mesaj, class: 'alert-success', hide:true, el: $form});
		
		}else if(res.durum=="error"){
			//$el.html(res.mesaj);
			sspot.bildirimHTML({html: res.mesaj, class: 'alert-danger', hide:true, el: $form});
		}
	},'json');
	
	return false;
}

sspot.uye.ticaret_bildirim_toggle = function(el){
	var $el = $(el);
	
	if($el.siblings("#head_ticaret_bildirim_wrap").length==0){
		$el.parent().append('<div id="head_ticaret_bildirim_wrap" class="head_bildirim_wrap"></div>');
	}
	var $wrap = $("#head_ticaret_bildirim_wrap");
	$("#head_bildirim_wrap").removeClass("active").html("");

	if($wrap.hasClass("active")){
		$wrap.removeClass("active").html("");
	}else{
		$wrap.addClass("active").html('<div class="loading"></div>');
		
		$.post("/axy/?na=ticaret_bildirim&na2=list", {}, function(res){
			$wrap.html(res);
			
			var unseen_count = $wrap.find(".unseen").length;
			var cur_unseen = parseInt($(".bildirim_sayi:first").text());
			var new_unseen = cur_unseen - unseen_count;
			if(new_unseen<0) new_unseen = 0;
			
			if(new_unseen==0){
				$(".bildirim_sayi").remove();	
			}else{
				$(".bildirim_sayi").text(new_unseen);
			}
			
		});
	}
	return false;
}
