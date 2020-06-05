$("button").click(function(){
	alert("Ponto de coleta cadastrado!");
});

function estadosBR(){
	const uf = $("select[name=estado]");
	const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";
	//imprime todos estados
	fetch(url)
	.then(function(res){ return res.json()})
	.then(function(states) {
		for(const state of states){
			uf.append(`<option value="${state.id}">${state.nome}</option>`);
		}
	
	}); 
}
estadosBR()

//abre as cidades quando seleciona o estado
$("select[name=estado]").change(getCidades);

function getCidades(change){
	var city = $("select[name=cidade]");
	const estadosValue = event.target.value;
	const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadosValue}/municipios`;

	//pega o nome do estado quando salva o cadastro
	const stateInput = $("input[name=state]");
	const indexOfState = event.target.selectedIndex; 
	stateInput.prop("value", event.target.options[indexOfState].text);

	//remove todas cidades do estado anterior
	$("select[name=cidade] :not(:first-child)").remove();
	city.prop("disabled", true); 
	//imprime todas cidades no select Cidade
	fetch(url)
	.then(function(res){ return res.json()})
	.then(function(cidades) {
		for(const cidade of cidades){
			city.append(`<option value="${cidade.nome}">${cidade.nome}</option>`);
		}
		city.prop("disabled", false); 
	});
}


//itens

const totalLi = $('li') 

for(const li of totalLi){
	li.addEventListener("click", transformaLi)
}

const inputArray = $("input[name=items]")
let = arrayItens = []

function transformaLi(event){
	const itemLi = event.target
	const itemId = itemLi.dataset.id

	itemLi.classList.toggle("selected")

	const itemSelecionado = arrayItens.findIndex(function(item){
		const itemFound = item == itemId
		return itemFound
	})

	if(itemSelecionado >= 0){
		const itemFiltrado = arrayItens.filter(function(item){
			const itemDiferente = item != itemId
			return itemDiferente
		})

		arrayItens = itemFiltrado
	}else{
		arrayItens.push(itemId)
	}

	//att input hidden com os itens da array
	inputArray.prop("value", arrayItens);
}