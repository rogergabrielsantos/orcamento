class Despesa{
    constructor(ano, mes, dia,tipo,descricao, valor){
        this.dia = dia
        this.mes= mes
        this.ano = ano
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }
    validarDados() {
        for(let i in this){
            if(this[i]== undefined || this[i] == ''||this[i] == null){
                return false
            }else{
                return true
            }
        }
        
    }
}


function cadastrarDepesa(){

    let ano =document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia  = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(ano.value, mes.value, dia.value,tipo.value,descricao.value, valor.value)
    if(despesa.validarDados()){
        gravar(despesa)
        document.getElementById('title').innerText ="Registro Inserido com Sucesso"
        var x = document.getElementById('modal_conteudo')
        x.innerText = "Depesa Cadastrada com Sucesso"
        var y = document.getElementById('teste')
        y.className = "modal-header text-success"
        var z = document.getElementById('teste1')
        z.className = "btn btn-success"
        z.innerText = "Voltar"
        
        $('#gravacao').modal('show')
        limpar()

    }else{
        
        $('#gravacao').modal('show')
        limpar()
    }
    
    
}

function limpar() {
    document.getElementById('ano').value = ""
    document.getElementById('mes').value = ""
    document.getElementById('dia').value = ""
    document.getElementById('tipo').value = ""
    document.getElementById('descricao').value = ""
    document.getElementById('valor').value = ""

    
}
function gravar(d){
    let id = localStorage.getItem('id')
    
    
    
    if(id===null){
        id =1
        localStorage.setItem('id',id)
        localStorage.setItem(id,JSON.stringify(d))
    }else{
        id = parseInt(id) +1
        
        localStorage.setItem('id',id)
        localStorage.setItem(id,JSON.stringify(d)) 
    }
   
}

function recuperarTodos() {
    let despesas = Array()

    let no =  localStorage.getItem('id')
    for(let j =1; j<=no; j++){
        let despesa =JSON.parse(localStorage.getItem(j))
        if(despesa===null){
        continue
        }
        despesa.id = j    
        despesas.push(despesa)
    }
    return despesas
}

function excluir(id) {
    localStorage.removeItem(id)
    $('#gravacao').modal('show')
    
}



function listar(despesasloc = Array(), filtro = false) {
  
  if(despesasloc.length==0 && filtro==false){
    var despesasloc = recuperarTodos()
    
  }
  

    let lista = document.getElementById("listatable")
    lista.innerHTML = ""
    despesasloc.forEach(function(nome,s){
        
        let linha = lista.insertRow()
        linha.insertCell(0).innerText= nome.dia +"/"+ nome.mes +"/"+ nome.ano
        switch(nome.tipo){
            case '1': nome.tipo = "Alimentação"
            break
            case '2': nome.tipo = "Educacação"
            break
            case '3': nome.tipo = "Lazer"
            break
            case '4': nome.tipo = "Saúde"
            break
            case '5': nome.tipo = "Transporte"
            break

        }
        linha.insertCell(1).innerText = nome.tipo
        linha.insertCell(2).innerText = nome.descricao
        linha.insertCell(3).innerText = nome.valor
        let id = nome.id
        let btn = document.createElement("button")
        btn.className = "btn btn-danger"
        btn.innerHTML = '<i class ="fas fa-times"></i>'
        btn.onclick = function(){
            excluir(id)
           
           
            
        }
        
        linha.insertCell(4).append(btn)

   })
   
}

function pesquisar(despesa) {
    let despesafiltrada = Array
    despesafiltrada = recuperarTodos()
    
    if(despesa.ano!=''){
        despesafiltrada = despesafiltrada.filter(d=>d.ano==despesa.ano)    
    }
    if(despesa.mes!=''){
        despesafiltrada = despesafiltrada.filter(d=>d.mes==despesa.mes)
    }
    if(despesa.dia!=''){
        despesafiltrada = despesafiltrada.filter(d=>d.dia==despesa.dia)
    }
    if(despesa.tipo!=''){
        despesafiltrada = despesafiltrada.filter(d=>d.tipo==despesa.tipo)
    }
    if(despesa.descricao!=''){
        despesafiltrada = despesafiltrada.filter(d=>d.descricao==despesa.descricao)
    }
    if(despesa.valor!=''){
        despesafiltrada = despesafiltrada.filter(d=>d.valor==despesa.valor)
    }
 return despesafiltrada
}

function consultarDespesa(){
    let ano = document.getElementById('ano').value 
    let mes = document.getElementById('mes').value
    let dia  = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

   let despesap =new Despesa(ano, mes, dia,tipo,descricao, valor)
    let desp = pesquisar(despesap)

    listar(desp,true)
    


}