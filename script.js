function promessa(result) {
    return result.json()
}

function resultado(dado) {
    lista.innerHTML = '';
    let backGroud;
    let i = 0;

    dado.forEach(tarefa => {
        i = tarefa.id;
        if (tarefa.concluido === true) {
            backGroud = 'bg-success';
        } else {
            backGroud = 'bg-danger';
        }
        lista.innerHTML += `<li class="list-group-item">
    <div style="display:flex;" class="text-white ${backGroud}">
    <div class="conteiner card-body text-uppercase font-weight-bold">${tarefa.title}</div>
    <div class="conteiner card-body">${tarefa.descricao}</div>
    <div class="conteiner card-body">
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalExemplo${i}">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M8 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM1.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm13 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path></svg>
  </button>
 
    </div>
    
    </li> `;

        mondais.innerHTML += `
    <div class="modal fade mt-5" id="modalExemplo${i}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog " role="document">
      <div class="modal-content ">
        <div class="modal-header ">
          <button type="button" class="btn btn-danger mr-3" data-dismiss="modal" onclick="Excluir(${i})">Excluir</button>
          <button type="button" class="btn btn-primary mr-3" data-dismiss="modal" onclick="concluir(${i})">Concluir</button>
          <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    </div>
  </div>`
    }

    );
}

function listar() {
    let request = fetch('https://6338cdf8937ea77bfdc41851.mockapi.io/tarefas')
    console.log(request, 'request')
    let requestDown = request.then(promessa)
    console.log(requestDown, 'dowloadr da requisição')
    requestDown.then(resultado)
}

function adicionar() {

    let enviar = {
        method: "POST",
        headers: { "content-type": "application/json", },
        body: JSON.stringify(
            {
                "title": title.value,
                "descricao": description.value,
            }),
    }

    fetch('https://6338cdf8937ea77bfdc41851.mockapi.io/tarefas', enviar).then(
        function (respostas) {
            console.log(respostas)
            document.getElementById('title').value = '';
            document.getElementById('description').value = '';
            listar();
        })

}

function concluir(idList) {
    let enviar = {
        method: "PUT",
        headers: { "content-type": "application/json", },
        body: JSON.stringify(
            {
                "concluido": true,
                "id": idList,
            }),
    }

    fetch(`https://6338cdf8937ea77bfdc41851.mockapi.io/tarefas/${idList}`, enviar).then(listar)
}

function Excluir(idList) {
    let enviar = {
        method: "DELETE",
        headers: { "content-type": "application/json", }
    }
    fetch(`https://6338cdf8937ea77bfdc41851.mockapi.io/tarefas/${idList}`, enviar).then(listar);
}

