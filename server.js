const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

//para url encoded = app.use(bodyParser.urlencoded({ extended: true }));
//usar em json
app.use(bodyParser.json());


  var lista = [
    {
      
      nome: "Francisco Franco Tarla",
      telefone: "12 2211 1212",
      id: 1
    },
    {
      
      nome: "João Fernando Tarla",
      telefone: "12 2211 1212",
      id: 2
    },
    {
      
      nome: "Felipe Matheus",
      telefone: "12 2211 1212",
      id: 3
    }
  ];

var total = 4;



function adicionarPaciente(entrada){
  entrada.id = total++;
  lista.push(entrada);
}

function deletarPaciente(id){
  var paciente = buscarPaciente(id);
  lista.splice(lista.indexOf(paciente), 1);
}

function buscarPaciente(id){
  var paciente = lista.filter(paciente => paciente.id == id)[0];
  return paciente;
}

function alterarPaciente(novoPaciente, id){
  novoPaciente.id = id;
  var paciente = buscarPaciente(id);
  var indice = lista.indexOf(paciente);
  console.log(indice);
  lista[indice] = novoPaciente;
  
}

//ALTER
app.put('/api/patients/:id', (request, response) => {
  var novoPaciente = request.body;
  var id = request.params.id;
  alterarPaciente(novoPaciente, id);
  response.status(200);
  response.end();
});


//READ
app.get('/api/patients/:id' , (request, response) =>{
  console.log('Buscando id ' + request.params.id);
  var paciente = buscarPaciente(request.params.id);
  if(paciente == null){
    response.status(404);
  }
  response.json(paciente);
});

//DELETE
app.delete('/api/patients/:id' , (request, response) => {
  var paciente = buscarPaciente(request.params.id);
  if(paciente == null){
    response.status(404);
  } else {
    deletarPaciente(request.params.id);
    response.status(204);
  }
  response.end();
});

//LER LISTA INTEIRA
app.get('/api/patients', (request, response) => {
  response.json(lista);
});


//CREATE
app.post('/api/patients', (request, response) => {

  var paciente = request.body;
  console.log('Novo paciente: ' + JSON.stringify(paciente));
  adicionarPaciente(paciente);
  //console.log(total);
  response.status(201);
  response.end();

});



app.listen(PORT, () => console.log("servidor em http://localhost:" + PORT));