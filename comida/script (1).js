var idcomida = 0;
listar();
var myModal = new bootstrap.Modal(
  document.getElementById('cadastro')
);


function listar(){
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch("http://localhost:8080/ComidaRest/ComidaRest", requestOptions)
    .then(response => response.json())
    .then(function(result){
      var dados = "<th>nome</th>";
          dados += "<th>tipo</th>";
          dados += "<th>peso</th>";
          dados += "<th>kcal</th>";

      for (const i in result) {

        dados += "<tr>"
            + "<td>" + result[i].nome + "</td>"
            + "<td>" + result[i].tipo + "</td>"
            + "<td>" + result[i].peso + "</td>"
            + "<td>" + result[i].kcal + "</td>"
            + "<td><a class='btn btn-primary' onclick='alterar(" + result[i].idcomida + ")'>Alterar</a></td>"
            + "<td><a class='btn btn-danger' onclick='excluir(" + result[i].idcomida + ")'>Excluir</a></td>"
            + "</tr>";

      }
      document.getElementById("dados").innerHTML = dados;
    })
    .catch(error => console.log('error', error));
}

function alterar(id){
  idcomida = id;
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
   
  fetch("http://localhost:8080/ComidaRest/ComidaRest/" + idcomida, requestOptions)
    .then(response => response.json())
    .then(function(result){
      document.getElementById("nome").value = result.nome;
      document.getElementById("tipo").value = result.tipo;
      document.getElementById("peso").value = result.peso;
      document.getElementById("kcal").value = result.kcal;
      myModal.show();
    })
    .catch(error => console.log('error', error));
}

function excluir(idcomida){
  //alert("excluir " + idcomida);
  var raw = "";
 
  var requestOptions = {
    method: 'DELETE',
    body: raw,
    redirect: 'follow'
  };
  fetch("http://localhost:8080/ComidaRest/ComidaRest/" + idcomida, requestOptions)
  .then(response => response.text())
  .then(function(result){
    listar();
  })
  .catch(error => console.log('error', error));
}

function novo(){
  myModal.show();
  idcomida=0;
  document.getElementById("nome").value = "";
  document.getElementById("tipo").value = "";
  document.getElementById("peso").value = "";
  document.getElementById("kcal").value = "";
}

function salvar(){
  var metodo;
  if (idcomida > 0 )  {
    metodo = "PUT";
  }else{
    metodo = "POST";
  }

  var c = {};
  c.idcomida = idcomida;
  c.nome = document.getElementById("nome").value;
  c.tipo = document.getElementById("tipo").value;
  c.peso = document.getElementById("peso").value;
  c.kcal = document.getElementById("kcal").value;

  var raw = JSON.stringify(c);
  console.log(raw);
  if ((c.nome == "") || (c.peso == "") || (c.tipo == "") || (c.kcal == "")){
    alert("nome é obrigatório");
    return;
  }

  var requestOptions = {
    method: metodo,
    body: raw,
    redirect: 'follow'
  };
 
  fetch("http://localhost:8080/ComidaRest/ComidaRest", requestOptions)
    .then(response => response.text())
    .then(function (result){
      listar();
    })
    .catch(error => console.log('error', error));

    myModal.hide();
  }




 
