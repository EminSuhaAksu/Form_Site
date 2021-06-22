sspot.altsayfa = sspot.altsayfa || {};

// özellik ekle çıkar
sspot.altsayfa.ozellik = function(el,altsayfa_id, ozellik, act){
	$el = $(el);
	$list = $el.closest(".baslik_ozellik_ayar_list");//baslik_ozellik_ayar_list
	if(act=="ekle"){
		$.post("/ax/?a=yenig&na=ozellik&tip=altsayfa&na2=ekle", {'altsayfa_id':altsayfa_id, 'ozellik':ozellik} , function(res){
			if(res.durum=="success"){
				$list.addClass("active").append(res.deger_form);;
				$el
					.text('çıkar')
					.attr("onclick","return sspot.altsayfa.ozellik(this,"+altsayfa_id+",'"+ozellik+"','cikar')");
					
			}else if(res.durum=="error"){
				sspot.bildirimHTML({html: res.mesaj, class: 'alert-danger', hide:true, el: $list});
			}
		},'json');
	}else if(act=="cikar"){
		$.post("/ax/?a=yenig&na=ozellik&tip=altsayfa&na2=cikar", {'altsayfa_id':altsayfa_id, 'ozellik':ozellik} , function(res){
			if(res.durum=="success"){
				$list.removeClass("active");
				$el
					.text('ekle')
					.attr("onclick","return sspot.altsayfa.ozellik(this,"+baslik_id+",'"+ozellik+"','ekle')");				
			}else if(res.durum=="error"){
				sspot.bildirimHTML({html: res.mesaj, class: 'alert-danger', hide:true, el: $list});
			}
		},'json');
	}
	
	return false;
}

// özellik değer submit
sspot.altsayfa.ozellik_deger = function(form){
	$form = $(form);
	
	$.post("/ax/?a=yenig&na=ozellik&tip=altsayfa&na2=deger_ekle", $form.serialize() , function(res){
		console.log(res);
	},'json');
	
	return false;
}

sspot.altsayfa.text_kisayol = function(id,bas,son) {
	var t = document.getElementById(id);
	if (document.selection && bas!=''){
		var sonuc = document.selection.createRange();
		var el = sonuc.parentElement();
		if(el!=t){
			alert('metni seç, sonra tusa bas.');
		}else{
			sonuc.text  = bas+sonuc.text+son; sonuc.select();
		}
	}else if (t.selectionStart || t.selectionStart == '0') {
		var tbas = t.value.substring(0,t.selectionStart);
		var sonuc = t.value.substring(t.selectionStart,t.selectionEnd);
		var tson = t.value.substring(t.selectionEnd,t.value.length);
		t.value  = tbas+bas+sonuc+son+tson;
		t.selectionStart = t.selectionEnd; // + 5 + (bas.length+son.length);
		t.selectionEnd = t.selectionStart; 
	} else {
		t.value += bas+son;
	}
	t.focus();
	if(window.event)
		event.returnValue = false;
	return false;
}

sspot.altsayfa.takip = function(el,altsayfa,yap){
	$el = $(el);
	if($el.hasClass('passive')) return false;
	$el.addClass('passive');

	$.post("/ax/?a=yenig&na=altsayfa&na2=takip", {'altsayfa_url':altsayfa, 'yap':yap} , function(res){
		if(res.durum=="success"){
			sspot.tooltip({
				el: $el,
				update: true,
				mesaj: res.mesaj
			});
			var t1 = "birak";
			var c1 = "ssicon-add";
			var c2 = "ssicon-minus";
			if(yap=='birak'){
				t1 = "et";
				c1 = "ssicon-minus";
				c2 = "ssicon-add";
			}
			
			$el.attr("onclick","return sspot.altsayfa.takip(this,'"+altsayfa+"', '"+t1+"');")
				.find("i").removeClass(c1).addClass(c2);

		}else if(res.durum=="error"){
			sspot.tooltip({
				el: $el,
				update: true,
				mesaj: res.mesaj
			});
		}
		$el.removeClass('passive');
	},'json');
	
	return false;
}

sspot.altsayfa.filtrele = function(el){
	setTimeout(function(){
		var $input = $(el);
		var query = $input.val();
		
		$("#altinci-list").find("li").each(function(){
			var $li = $(this);
			var altinci_adi = $li.data("altinci_adi");
	
			if(query==""){
				$li.show();
			}else{
				if(altinci_adi.toLowerCase().indexOf(query) == -1){
					$li.hide();
				}else{
					$li.show();
				}
			}
		})
	}, 100);
}