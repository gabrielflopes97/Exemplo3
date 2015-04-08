var items = [];
var i = 0;

$(document).ready(function() {

	$('input').blur(function(){
    if($(this).val()=="" || $(this).val()== undefined ){
      $(this).addClass("erro");
      $(this).focus();
      //bloqueio($(this))
    }else{
    	$(this).removeClass("erro");
    	//validaçoes obrigatorias 
    	switch($(this).attr("name")){
    			case "cpf":

    		if(TestaCPF($(this).val())){
    			$(this).addClass("ok");
    		}else{
    			$(this).focus();
    			alert("campo incorreto");
    		}
    		break;
    		
    		/*	case :
    				
    		break;
    		
    			case :
    		
    		break;
    		
    			case :
    		
    		break;
    		
    			case :
    		
    		break;
    		
    			case :
    		
    		break;
    		case :
    		break;*/
    			
    	}
    	//validaçoes nao obrigatorias
    	// pis  ValidaPis($(this).val())
    }

  });

	
	$("#btIncluir").click(function(){
		$('#layercad').hide();
	});

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
	
	// VERIFICAR O PIS

	var ftap="3298765432";
	var total=0;
	var i;
	var resto=0;
	var numPIS=0;
	var strResto="";
	
	function ChecaPIS(pis)
	{
	
	total=0;
	resto=0;
	numPIS=0;
	strResto="";
	
	numPIS=pis;
	
	if (numPIS=="" || numPIS==null)
	{
	return false;
	}
	
	for(i=0;i<=9;i++)
	{
	resultado = (numPIS.slice(i,i+1))*(ftap.slice(i,i+1));
	total=total+resultado;
	}
	
	resto = (total % 11)
	
	if (resto != 0)
	{
	resto=11-resto;
	}
	
	if (resto==10 || resto==11)
	{
	strResto=resto+"";
	resto = strResto.slice(1,2);
	}
	
	if (resto!=(numPIS.slice(10,11)))
	{
	return false;
	}
	
	return true;
	}
	
	// VALIDAR O PIS
	
	function ValidaPis(pis)
	{
	
	
	if (!ChecaPIS(pis))
	{
	alert("PIS INVALIDO");
	} else {
	alert("PIS VALIDO");
	}
	}
	
	


	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
});
