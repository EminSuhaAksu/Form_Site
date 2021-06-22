sspot.modal = sspot.modal || {};

sspot.modal.init = function(opts){
	var $el_wrap = $("#ss_modal_wrap");
	var $el = $("#ss_modal");
	
	if(opts.url){
		$.post(opts.url, opts.data, function(data){
			$el.html(data);
			$el_wrap.show();
			$el.show();
			
			opts.callback();
		});
	}else{
		$el.html(opts.content);
		$el_wrap.show();
		$el.show();	
	}
	$el.html($el.html() + '<div id="ss_modal_kapat" onclick="return sspot.modal.kapat();" >X</div>');
			
	return true;
}

sspot.modal.kapat = function(){
	var $el_wrap = $("#ss_modal_wrap");
	var $el = $("#ss_modal");
	
	$el_wrap.hide();
	$el.hide();
	
	return false;
};