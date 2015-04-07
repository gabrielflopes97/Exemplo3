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
});
