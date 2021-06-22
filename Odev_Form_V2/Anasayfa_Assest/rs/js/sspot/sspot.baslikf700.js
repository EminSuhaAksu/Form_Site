sspot.baslik = sspot.baslik || {};


sspot.baslik.yeni_submit = function(el){
	var $form = $(el);
}

// özellik ekle çıkar
sspot.baslik.ozellik = function(el,baslik_id, ozellik, act){
	$el = $(el);
	$list = $el.closest(".baslik_ozellik_ayar_list");//baslik_ozellik_ayar_list
	if(act=="ekle"){
		$.post("/ax/?a=yenig&na=ozellik&na2=ekle", {'baslik_id':baslik_id, 'ozellik':ozellik} , function(res){
			console.log(res);
			if(res.durum=="success"){
				$list.addClass("active").append(res.deger_form);;
				$el
					.text('çıkar')
					.attr("onclick","return sspot.baslik.ozellik(this,"+baslik_id+",'"+ozellik+"','cikar')");
					
			}else if(res.durum=="error"){
				sspot.bildirimHTML({html: res.mesaj, class: 'alert-danger', hide:true, el: $list});
			}
		},'json');
	}else if(act=="cikar"){
		$.post("/ax/?a=yenig&na=ozellik&na2=cikar", {'baslik_id':baslik_id, 'ozellik':ozellik} , function(res){
			console.log(res);
			if(res.durum=="success"){
				$list.removeClass("active");
				$el
					.text('ekle')
					.attr("onclick","return sspot.baslik.ozellik(this,"+baslik_id+",'"+ozellik+"','ekle')");				
			}else if(res.durum=="error"){
				sspot.bildirimHTML({html: res.mesaj, class: 'alert-danger', hide:true, el: $list});
			}
		},'json');
	}
	
	return false;
}

// özellik değer submit
sspot.baslik.ozellik_deger = function(form){
	$form = $(form);
	
	$.post("/ax/?a=yenig&na=ozellik&na2=deger_ekle", $form.serialize() , function(res){
		console.log(res);
	},'json');
	
	return false;
}

sspot.baslik.takip = function(el,baslik, yap){
	$el = $(el);

	var t1 = '<i class="ssicon-minus"></i>';
	var t2 = "sil";
	if(yap=="sil"){
		t1 = '<i class="ssicon-add"></i>';
		t2 = "ekle";
	}
	
	$.post("/ax/?a=yenig&na=baslik&na2=takip", {b:baslik, yap:yap} , function(res){
		if(res.durum=="success"){
			$el
			  .html(t1)
			  .attr("onclick", "return sspot.baslik.takip(this,'"+baslik+"', '"+t2+"');");
			
			sspot.tooltip({
				el : $el,
				update : true,
				mesaj : res.mesaj
			});
		}else if(res.durum=="error"){
			sspot.tooltip({
				el : $el,
				update : true,
				mesaj : res.mesaj
			});
		}
	},'json');
	
	return false;
}

sspot.baslik.paylas_slide = function(baslik, el, tip){
	if(tip=='index'){
		var $el = $(el);
		if($el.find(".paylas_wrap").length==0){
			var html = '';
			html += '<div class="paylas_wrap" style="display:none">';
				html += '<a href="#" onclick="return sspot.baslik.paylas(\''+baslik+'\',\'face\')"><i class="ssicon-facebook"></i></a>';
				html += '<a href="#" onclick="return sspot.baslik.paylas(\''+baslik+'\',\'twit\')"><i class="ssicon-twitter"></i></a>';
			html += '</div>';
			
			$el.append(html);
		}
		$el.find(".paylas_wrap").slideToggle(100);
		
	}
}

sspot.baslik.paylas = function(baslik, turu){
	var basliku = 'http://www.incisozluk.com.tr/w/' + baslik.replace(/ /g,'-') + '/';
	if(turu=='face'){
		var shareurl = 'http://www.facebook.com/sharer/sharer.php?u='+encodeURI(basliku);
	}else if(turu=='twit'){
		var shareurl = 'http://twitter.com/share?url='+encodeURI(basliku)+'&lang=tr&via=incisozluk';
	}
	window.open(shareurl, "_blank", "toolbar=no, scrollbars=no, resizable=yes, top=200, left="+($(window).width()/2)+", width=500, height=400");
	
	return false;
}

sspot.baslik.ara = function(el){
	var $el = $(el);
	var $form = $(el).closest("form");
	var val = $form.find(".search-query").val().trim();
	
	if(val.length<4){
		sspot.tooltip({
			el : $el,
			update : true,
			mesaj : 'çok kısa oldu!?'
		});
	}else if(val.length>25){
		sspot.tooltip({
			el : $el,
			update : true,
			mesaj : 'çok uzun oldu!?'
		});
	}else{
		document.location = '/?sa=ara&ara='+encodeURI(val);
	}
	console.log(val);
}