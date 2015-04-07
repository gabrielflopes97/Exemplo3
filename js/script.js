var items = [];
var i = 0;

$(document).ready(function() { 

	$("#btIncluir").click(function () {
		var item = new Object();

		item.ID = i++;
		item.Titulo = $("#txtTitulo").val();
		item.Editora = $("#txtEditora").val();
		if(item.Titulo !="" && item.Editora !="") {
			items.push(item);

			MontaItens();

			$("#txtTitulo").val('');
			$("#txtEditora").val('');
			$("#txtTitulo").focus();
		} else {
			alert("coisa em branco");
		}

	});

	$("#btExcluir").click(function(){
		$("#listItems option:selected").each(function(){
			var opcao = $(this);
			$.each(items, function(indice, objeto) { 
				if (objeto.ID == opcao.val()) {
					items.splice(indice,1);
					return false;
				}
			});
		});

		MontaItens();
	});

	$(document).delegate("#listItems option","dblclick", function() {
		var opcao = $(this);
			$.each(items , function(indice,objeto){
 			if (objeto.ID == opcao.val()) {
				$("#btAlterar").show(); //css({"display": "block"});
				$("#btIncluir").hide(); //css({"display": "none"});
				$("#btCancelar").show();
				$("#txtTitulo").val(objeto.Titulo);
				$("#txtEditora").val(objeto.Editora);
				$("#btAlterar").off('click');

				$("#btAlterar").click(function(){
					Alterar(objeto);
					MontaItens();
					$("#btAlterar").hide(); //css({"display": "none"});
					$("#btIncluir").show(); //css({"display": "block"});
					$("#btCancelar").hide();

				});
			}
		});
	});

	$("#btCancelar").click(function(){
		$("#btCancelar").hide();
		$("#btIncluir").show();
		$("#btAlterar").hide();
		$("#txtTitulo").val('');
		$("#txtEditora").val('');
		$("#txtTitulo").focus();
	});

	function Alterar(item){
		item.Titulo = $("#txtTitulo").val();
		item.Editora = $("#txtEditora").val();
		if(item.Titulo !="" && item.Editora !="") {
			$("#txtTitulo").val('');
			$("#txtEditora").val('');
			$("#txtTitulo").focus();
		} else {
			alert("coisa em branco");
		}
	}

	function MontaItens() {
		$("#listItems option").remove();
		$.each(items, function(indice, objeto) { 
			$("#listItems").append("<option value='" + objeto.ID + "'>" + objeto.Titulo + "</option>");
		});
	}
	
	function TestaCPF(strCPF) { 
	var Soma;
	var Resto;
	Soma = 0;
	if (strCPF == "00000000000") return false;
		for (i=1; i<=9; i++) 
			Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i); 
			Resto = (Soma * 10) % 11; if ((Resto == 10) || (Resto == 11)) Resto = 0;
				if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;
					Soma = 0; 
			for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i); Resto = (Soma * 10) % 11;
			if ((Resto == 10) || (Resto == 11)) Resto = 0;
			if (Resto != parseInt(strCPF.substring(10, 11) ))return false; 
			return true; 
	}
	
	function validaPIS(Numero,Digito){
	
	for (i=0; i<Numero.length; i++)
	{
	  Numero = Numero.replace('.','');
	  Numero = Numero.replace('-','');
	}

	var PASEP = Numero
	var peso1 = '3298765432';
	var soma1 = 0;
	var digito1 = 0;

	for (i = 1; i < 10 - Numero.length+1; i++) 
	{
		PASEP = eval("'" + 0 + PASEP + "'")
	}
	for (i = 1; i < PASEP.length+1; i++) 
	{
		soma1 += PASEP.substring(i, i-1) * peso1.substring(i, i-1);
	} 
	soma1 %= 11;
	if (soma1  < 2) 
	{
		digito1 = 0;
	}
		else {
		digito1 = 11 - soma1; 
	}
	if (eval("'" + digito1 +"'") != Digito)
	{
		return false;
	}
	else {
		return true;
	}
	}
	//ADICIONAR ONKEYPRESS NO TEXT DO PIS mascara_pis(this)
	function mascara_pis(campo) {
	if (campo.value.length == 1)
	{ campo.value += "."; }
	if (campo.value.length == 5)
	{ campo.value += "."; }
	if (campo.value.length == 9)
	{ campo.value += "."; }
	if (campo.value.length == 13)
	{ campo.value += "-"; }
}
	
	


	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
});
