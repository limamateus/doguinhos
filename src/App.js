import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';

function App() {

  const [racas,setRacas] = useState([])
  const [buscar, setBusca] = useState('')

 useEffect(()=>{  // Esse useEffect sera executado no momento que o componete for renderizado
  fetch('http://localhost:8080/doguinhos')  // Aqui estou dando um get na api mocado 
        .then(resposta => resposta.json()) // onde eu espero uma promessa da resposta e tranformo em json
        .then(dados => setRacas(dados)) // tendo o json eu passo os dados para o UseState setRacas para ser atualizado 
 },[]) // esse [] é Muito importante, pois sem ele o userEffect ficar sendo executado varias vezes, pois as racas estao sendo adicionado no useStates e o useStates atualiza o componente.

useEffect(() =>{
  if(buscar && buscar.length > 3){
     fetch('http://localhost:8080/doguinhos?nome=' + buscar)  // Aqui estou dando um get na api mocado 
  .then(resposta => resposta.json()) // onde eu espero uma promessa da resposta e tranformo em json
  .then(dados => setRacas(dados))// tendo o json eu passo os dados para o UseState setRacas para ser atualizado 
  }

},[buscar]) // Diferente do outro, passando o valor buscar, o userEffect sera executando toda vez que mudar a propriedade buscar

  return (
    <div className="App">
      <h1>Bem vindo aos doguinhos!</h1>
      <h3>Confira abaixo uma lista de raças dos doguinhos</h3>
      <input  className="centrado" placeholder='Buscar por Raças' onChange={evento => setBusca(evento.target.value)}/>
      <ul>        
        {racas.map(raca => <li key={raca.nome}> <h4>Id : {raca.id} </h4> <h5>Nome : {raca.nome}</h5></li>)}      
      </ul>
    </div>
  );
}

export default App;
