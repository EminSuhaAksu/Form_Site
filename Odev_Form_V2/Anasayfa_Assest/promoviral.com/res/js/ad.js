var prmv = {
	element : null,
	init : function(id){
		prmv.element = document.getElementById("prmv"+id);
		var theme = prmv.element.getAttribute("data-theme");
		
		ifrm = document.createElement("IFRAME");
		ifrm.setAttribute("src", "//s1.promoviral.com/widget/code/"+id);

		if(theme == 'thm1'){
			ifrm.style.width = "150px";
			ifrm.style.height = "600px";
		}else if(theme == 'thm2'){
			ifrm.style.width = "300px";
			ifrm.style.height = "300px";
		}else if(theme == 'thm3'){
			ifrm.style.width = "728px";
			ifrm.style.height = "90px";
		}else if(theme == 'thm4'){
			ifrm.style.width = "625px";
			ifrm.style.height = "100px";
		}else if(theme == 'thm5'){
			ifrm.style.width = "625px";
			ifrm.style.height = "120px";
		}else if(theme == 'thm6'){
			ifrm.style.width = "285px";
			ifrm.style.height = "300px";
		}else if(theme == 'thm7'){
			ifrm.style.width = "100%";
			ifrm.style.maxHeight = "740px";
			ifrm.setAttribute('onload','prmv.ifrmResize(this)');
		}else{
			ifrm.style.width = "300px";
			ifrm.style.height = "300px";
		}

		ifrm.scrolling = 'no';
		ifrm.style.border = 'none';
		document.getElementById("prmv"+id).appendChild(ifrm);
	}
}

prmv.hata = function(text){
	alert(text);	
}

prmv.ifrmResize = function(ifrm){
	var w = parseInt(ifrm.clientWidth)
	ifrm.style.height = (w*2.9)+'px';
	console.log(ifrm.style.height);
}
