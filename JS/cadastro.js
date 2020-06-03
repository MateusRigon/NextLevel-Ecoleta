

$("button").click(function(){
	alert("Cadastrado com sucesso!");
});

function estadosBR(){
	const uf = $("select[name=estado]");

	
	fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
	.then(res => res.json())
	.then(function(estados) {
		for(const state of estados){
			uf.append('<option value="${state.id}">${state.nome}</option>');
		}
	
	}) 
}
estadosBR()

$("select[name=estado]").change(function(){
	alert("mudei");
})