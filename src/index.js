var btnRegistro = document.getElementById('registro');
var mural = document.getElementById('mural');

var recados = [];

function imprimeRecados() {
    this.mural.innerHTML = '';
    recados.forEach((e, index, array) => {
        this.mural.innerHTML += `<div class="recado card"> <div class="card-body"> <h5 class="card-title">${e.titulo}</h5> <p class="card-text">${e.mensagem}</p> <button id="delete" class="btn btn-danger" onclick="removerRecado(${index})">Remover</button></div> </div>`
    });   

}

window.registrarRecado = function() {
    var titulo = document.getElementById('tituloMsg').value;
    var mensagem = document.getElementById('mensagem').value;

    if (!titulo || !mensagem) {
        return alert('Os dois campos devem ser preenchidos para o registro do recado!')
    }

    var recado = {
        'titulo': titulo,
        'mensagem': mensagem
    }

    recados.push(recado);

    imprimeRecados();
}

window.removerRecado = function(e) {
    recados.splice(e, 1);
    imprimeRecados();
}





    
    
    
    
    
    