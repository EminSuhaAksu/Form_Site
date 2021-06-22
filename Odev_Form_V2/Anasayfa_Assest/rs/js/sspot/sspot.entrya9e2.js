sspot.entry = sspot.entry || {};

sspot.entry.submit = function(el){
	$form = $(el);
	$form.find(".loading").hide();
	$form.find(".loading").show();

	$.post("/ax/?a=yenig&na=entry&na2=entry_ekle", $form.serialize(), function(res){
		if(res.durum=="success"){
			$form
				.attr("onsubmit","return false;")
				.append( sspot.bildirimHTML({html:'entry girildi, sayfa yenileniyor...', class:'alert-success', hide:true}) )
				.find('.alert')
				.slideDown(500,function(){
					setTimeout(function(){ 
						window.location = '/e/'+res.entry_id+'/';
					},1000)
				});
		}else if(res.durum=="error"){
			$form.append( sspot.bildirimHTML({html: res.mesaj, class:'alert-danger', hide:true}) );
			$form.find('.alert')
				.slideDown(500,function(){
					setTimeout(function(){ 
						$form.find('.alert').slideUp(500, function(){
							$(this).remove() 
						})
					},10000)
				});
		}else{
			alert("durum bilgisi dönmedi!");
		}
		$form.find(".loading").hide();
	},'json');
	return false;
}
sspot.entry.submit_videolu = function(el){
	$form = $(el);
	$form.find(".loading").hide();
	$form.find(".loading").show();

	var formData = new FormData($form[0]);

	$.ajax({
		url: '/ax/?a=yenig&na=entry&na2=entry_ekle&videolu=true',
		type: 'POST',
		data: formData,
		dataType: 'json',
		async: true,
		success: function (res) {
			var video_result = res.video_result;
			console.log(video_result);

			if(res.durum=="success"){
				$form
					.attr("onsubmit","return false;")
					.append( sspot.bildirimHTML({html:'entry girildi, sayfa yenileniyor...', class:'alert-success', hide:true}) )
					.find('.alert')
					.slideDown(500,function(){
						setTimeout(function(){
							window.location = '/e/'+res.entry_id+'/';
						},1000)
					});

				if(typeof video_result != 'undefined'){
					if(video_result.hata==1){
						alert(video_result.sonuc+' entrynizi düzenleyip videoyu tekrar yükleyebilirsiniz.');
					}
				}

			}else if(res.durum=="error"){
				$form.append( sspot.bildirimHTML({html: res.mesaj, class:'alert-danger', hide:true}) );
				$form.find('.alert')
					.slideDown(500,function(){
						setTimeout(function(){
							$form.find('.alert').slideUp(500, function(){
								$(this).remove()
							})
						},10000)
					});
			}else{
				alert("durum bilgisi dönmedi!");
			}
			$form.find(".loading").hide();

		},
		cache: false,
		contentType: false,
		processData: false
	});
	return false;
}
sspot.entry.videoInputClick = function(el){
	$form = $(el).parents('form');
	$form.find('#videolocal').click();
	return false;
}
sspot.entry.videoInsert = function(el){
	$file = $(el).get(0).files[0];
	$form = $(el).parents('form');
	$textarea = $form.find('textarea');
	var name = $file.name;
	var size = $file.size;
	var type = $file.type;
	var hata = '';
console.log($file);
	if(size<20000001 && type=='video/mp4' && name!=''){
		var newText = '\n\n(vid:'+name+')';
		$form.find('.vidBut').html(newText);
	}else{
		if(size>20000001){
			hata+='Video dosyası çok büyük. Max buyut 20MB olmalıdır.';
		}

		if(type!='video/mp4'){
			hata+='Video formatı kabul edilmiyor. Mp4 formaıtnda olmalıdır.';
		}

		if(name==''){
			hata+='Video adına ulaşılamadı.';
		}

		alert(hata);
		$(el).val('');
	}

	console.log($file);
	return false;
}
sspot.entry.duzenle_videolu = function(el){
	$form = $(el);
	$form.find(".loading").hide();
	$form.find(".loading").show();

	var formData = new FormData($form[0]);

	$.ajax({
		url: '/ax/?a=yenig&na=entry&na2=entry_guncelle',
		type: 'POST',
		data: formData,
		dataType: 'json',
		async: true,
		success: function (res) {
			console.log(res);
			var video_result = res.video_result;
			console.log(video_result);

			if(res.durum=="success"){
				$form
					.append( sspot.bildirimHTML({html:'entry güncellendi, ben gidiyorumm...', class:'alert-success col-sm-12', hide:true}) )
					.find('.alert')
					.slideDown(500,function(){
						setTimeout(function(){
							window.location = '/e/'+ $form.find("[name=entry_id]").val() + '/';
						},1500)
					});

				if(typeof video_result != 'undefined'){
					if(video_result.hata==1){
						alert(video_result.sonuc+'.');
					}
				}
			}else if(res.durum=="error"){
				$form.append( sspot.bildirimHTML({html: res.mesaj, class:'alert-danger col-sm-12', hide:true}) );
				$form.find('.alert')
					.slideDown(500,function(){
						setTimeout(function(){
							$form.find('.alert').slideUp(500, function(){
								$(this).remove()
							})
						},10000)
					});
			}
			$form.find(".loading").hide();

		},
		cache: false,
		contentType: false,
		processData: false
	});
	return false;
}
sspot.entry.duzenle = function(el){
	$form = $(el);
	$form.find(".loading").hide();
	$form.find(".loading").show();

	$.post("/ax/?a=yenig&na=entry&na2=entry_guncelle", $form.serialize(), function(res){
		if(res.durum=="success"){
			$form
				.append( sspot.bildirimHTML({html:'entry güncellendi, ben gidiyorumm...', class:'alert-success col-sm-12', hide:true}) )
				.find('.alert')
				.slideDown(500,function(){
					setTimeout(function(){ 
						window.location = '/e/'+ $form.find("[name=entry_id]").val() + '/';
					},1500)
				});
		}else if(res.durum=="error"){
			$form.append( sspot.bildirimHTML({html: res.mesaj, class:'alert-danger col-sm-12', hide:true}) );
			$form.find('.alert')
				.slideDown(500,function(){
					setTimeout(function(){ 
						$form.find('.alert').slideUp(500, function(){
							$(this).remove() 
						})
					},10000)
				});
		}
		$form.find(".loading").hide();
	},'json');
	
	return false;
}
sspot.entry.cevapla_goster = function(el,parent_id){
	var formid = "anwserOf_"+parent_id;
	if($("#"+formid).length<1){
		$el = $(el);
		$li = $el.closest('.entry');
		yeniForm = $("#cevap_form_cache").clone();
		$yeniForm = $(yeniForm);
		
		$yeniForm.find("form").attr("id",formid);
		$yeniForm.find(".loading").hide();
		$yeniForm.find("input[name=parent_id]").val(parent_id);
		
		var list_value = $li.attr('value');
		var html = '<ol class="entry-list sub-list clearfix"><li class="entry wbox" value="'+list_value+'.1">'+$yeniForm.html()+'</li></ol>';
		
		$li.after(html).find("#"+formid);
	}else{
		//$("#anwserOf_"+parent_id).find(".entry_textarea").focus();
	}
	setTimeout(function(){
		$("#"+formid).find(".entry_textarea").focus();
	},100)
	
	return false;
}
sspot.entry.cevapla_trigger = function(el){
	$el = $(el);
	
	$el.parent().removeClass("cevapla_trigger_wrap");
	$el.next().show().addClass('reply-form-active');
	$el.slideUp(function(){ $(this).remove(); })
	
	return false;
}
sspot.entry.cevapla_submiting = 0;
sspot.entry.cevapla_submit = function(form){
	if(sspot.entry.cevapla_submiting===1) return false;
	
	sspot.entry.cevapla_submiting = 1;
	$form = $(form);	
	$form.data('keep-active',1);
	$form.find(".loading").show();
	$.post("/ax/?a=yenig&na=entry&na2=cevap_ekle", $form.serialize(), function(res){
		if(res.durum=="success"){
			$form
				.append( sspot.bildirimHTML({html:'cevap girildi', class:'alert-success', hide:true}) )
				.find('.alert')
				.slideDown(500,function(){
					setTimeout(function(){ 
						$form.find('.alert').slideUp(500, function(){
							window.location = '/e/'+res.entry_id+'/';
						})
					},1000)
				});
		}else if(res.durum=="error"){
			$form.append( sspot.bildirimHTML({html: res.mesaj, class:'alert-danger', hide:true}) );
			$form.find('.alert')
				.slideDown(500,function(){
					setTimeout(function(){ 
						$form.find('.alert').slideUp(500, function(){
							$(this).remove() 
						})
					},1000)
				});
			sspot.entry.cevapla_submiting = 0;
		}else{
			alert("durum bilgisi dönmedi!");
			sspot.entry.cevapla_submiting = 0;
		}
	},'json');
	$form.find(".loading").hide();
	
	return false;
}
sspot.entry.cevapla_focus = function(el){
	var $el = $(el);
	var $form = $el.closest('form.reply-form');
	
	$form.addClass('reply-form-active');
	$form.data('keep-active','1');
}
sspot.entry.cevapla_blur = function(el){
	setTimeout(function(){
		var $el = $(el);
		var $form = $el.closest('form.reply-form');
		
		if(typeof $form.data('keep-active')==="undefined"){
			$form.removeClass('reply-form-active');
		}
	},100);
}
sspot.entry.oy = function(entry_id,oy,id,tip){
	if(tip=='index'){
		var $entryPuan = $(id).closest(".baslik-puan");
	}else if(tip=='liste'){
		var $entryPuan = $(id).closest(".entry-puan");
	}else{
		var $entryPuan = $(".puan_"+entry_id).closest(".entry-puan");
	}
	if($entryPuan.hasClass('passive')) return false;
	$entryPuan.addClass('passive');

	$.post("/ax/?a=yenig&na=entry&na2=oy", {'entry_id':entry_id, 'puan':oy} , function(res){
		if(res.durum=="success"){
			if(tip=='index'){
				var suku_text = res.puan_bilgi.suku>0?'+'+res.puan_bilgi.suku:0;
				var cuku_text = res.puan_bilgi.cuku>0?'-'+res.puan_bilgi.cuku:0;
				$entryPuan.find(".puan_suku").find("strong").text(suku_text);
				$entryPuan.find(".puan_cuku").find("strong").text(cuku_text);
			}else if(tip=='liste'){
				var suku_text = res.puan_bilgi.suku>0?'+'+res.puan_bilgi.suku:0;
				var cuku_text = res.puan_bilgi.cuku>0?'-'+res.puan_bilgi.cuku:0;
				$entryPuan.find(".puan_suku").find("strong").text(suku_text);
				$entryPuan.find(".puan_cuku").find("strong").text(cuku_text);
				$entryPuan.find(".entry_puan_tek").removeClass("entry_puan_tek");
			}else{
				$(".puan_"+entry_id).text(res.puan_bilgi.puan).addClass("active");
			}
		}else if(res.durum=="error"){
			sspot.tooltip({
				el: $entryPuan,
				placement: 'right',
				mesaj: res.mesaj,
				destroy_time: 5000
			});
			
			if(res.need_login){
				sspot.uye.devam_et = {f:'sspot.entry.oy', p:{1:entry_id, 2:oy, 3:id, 4:tip} };
				sspot.uye.popup();
			}
		}
		$entryPuan.removeClass('passive');

	},'json');
	
	return false;
}
sspot.entry.oy_spn = function(entry_id,oy,num){
	console.log("çalıştı");
	$.post("/ax/?a=yenig&na=entry&na2=oy_spn", {'entry_id':entry_id, 'puan':oy,'num':num} , function(res){
		console.log("tamamlandı");
	},'json');
	
	return false;
}
sspot.entry.taslaksaving = 0;
sspot.entry.taslakkaydet = function(el){
	$el = $(el);
	$form = $el.closest(".entry-form");
	if(sspot.entry.taslaksaving==1) return false;
	
	sspot.entry.taslaksaving = 1;
	$.post("/ax/?a=yenig&na=entry&na2=taslak&nw=kaydet", $form.serialize() , function(res){
		if(res.durum=="success"){
			$el.find('.ssicon-done').remove();
			$el.append(' <i class="ssicon-done"></i>');
			
			/*setTimeout(function(){
				$el.find('.ssicon-done').remove();
			},6000);*/
			
			sspot.tooltip({
				el: $el,
				placement: 'bottom',
				mesaj: res.mesaj,
				destroy_time: 3000
			});
		}else if(res.durum=="error"){
			sspot.tooltip({
				el: $el,
				placement: 'bottom',
				mesaj: res.mesaj,
				destroy_time: 30000
			});
		}
		sspot.entry.taslaksaving = 0;
	},'json');

}
sspot.entry.areaVal = '';
sspot.entry.areaInterval = null;
sspot.entry.areafocus = function(el){
	$el = $(el);
	sspot.entry.areaInterval = setInterval(function(){
		var valTemp = $el.val();
		if(sspot.entry.areaVal != valTemp){
			sspot.entry.areaVal = valTemp;
			$btn = $el.closest(".entry-form").find(".taslaklara_kaydet");
			sspot.entry.taslakkaydet($btn);
		}
	}, 4000);
}
sspot.entry.areablur = function(el){
	clearInterval(sspot.entry.areaInterval);
}
sspot.entry.sil = function(el,entry_id){
	$el = $(el);
	if($el.hasClass('passive')) return false;
	$el.addClass('passive');
	
	var c = confirm('entryin sonsuza kadar yok olacak. emin misin?');
	
	if(c===true){
		$.post("/ax/?a=yenig&na=entry&na2=sil", {'entry_id':entry_id} , function(res){
			if(res.durum=="success"){
				sspot.tooltip({
					el: $el,
					update: true,
					mesaj: res.mesaj
				});
			}else if(res.durum=="error"){
				sspot.tooltip({
					el: $el,
					update: true,
					mesaj: res.mesaj
				});
			}
			$el.removeClass('passive');
		},'json');
	}else{
		$el.removeClass('passive');
	}
	return false;
}
sspot.entry.silik_onayla = function(el,entry_id){
	$el = $(el);
	if($el.hasClass('passive')) return false;
	$el.addClass('passive');
	
	var c = confirm('entry onaylanıp yayına alınacak. emin misin?');
	
	if(c===true){
		$.post("/ax/?a=yenig&na=entry&na2=silik_onayla", {'entry_id':entry_id} , function(res){
			if(res.durum=="success"){
				sspot.tooltip({
					el: $el,
					update: true,
					mesaj: res.mesaj
				});
			}else if(res.durum=="error"){
				sspot.tooltip({
					el: $el,
					update: true,
					mesaj: res.mesaj
				});
			}
			$el.removeClass('passive');
		},'json');
	}else{
		$el.removeClass('passive');
	}
	return false;
}
sspot.entry.paylas_slide = function(entry, el, tip){
	if(tip=='list'){
		var $el = $(el);
		if($el.find(".paylas_wrap").length==0){
			var html = '';
			html += '<span class="paylas_wrap" style="display:none">';
				html += '<a href="#" onclick="return sspot.entry.paylas(\''+entry+'\',\'face\')"><i class="ssicon-facebook"></i></a>';
				html += '<a href="#" onclick="return sspot.entry.paylas(\''+entry+'\',\'twit\')"><i class="ssicon-twitter"></i></a>';
			html += '</span>';
			
			$el.append(html);
		}
		$el.find(".paylas_wrap").animate({width:'toggle'},100);//.toggle(100);
		
	}
	return false;
}
sspot.entry.detay_slide = function(entry, el, tip){
	if(tip=='list'){
		var $el = $('.entry_'+entry)
		var bottom_h = parseInt($el.css('margin-bottom'));
		$el.find('.entry_but_bar_out').slideToggle();

		
	}
	return false;
}
sspot.entry.paylas = function(entry, turu){
	var entryu = 'http://www.incisozluk.com.tr/e/' + entry + '/';
	if(turu=='face'){
		var shareurl = 'http://www.facebook.com/sharer/sharer.php?u='+encodeURI(entryu);
	}else if(turu=='twit'){
		var shareurl = 'http://twitter.com/share?url='+encodeURI(entryu)+'&lang=tr&via=incisozluk';
	}
	window.open(shareurl, "_blank", "toolbar=no, scrollbars=no, resizable=yes, top=200, left="+($(window).width()/2)+", width=500, height=400");

	return false;
}
sspot.entry.onay_ver = function(entry_id,el){
	$btn = $(el);

	$.post("/ax/?a=yenig&na=entry&na2=onay_ver", {'entry_id':entry_id}, function(res){
		if(res.durum=="success"){
			$btn
				.attr("onclick","return false;")
				.html("onaylandı.");
		}else if(res.durum=="error"){
			$par = $btn.closest('.entry');
			$par.append( sspot.bildirimHTML({html: res.mesaj, class:'alert-danger', hide:true}) );
			$par.find('.alert')
				.slideDown(500,function(){
					setTimeout(function(){ 
						$par.find('.alert').slideUp(500, function(){
							$(this).remove() 
						})
					},10000)
				});
		}else{
			alert("durum bilgisi dönmedi!");
		}
	},'json');
	return false;
}