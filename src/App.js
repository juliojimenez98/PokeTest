import React, { useEffect, useState } from 'react';
import {obtenerDatos, obtenerPokemon} from './servicios/pokemon'
import './App.css';
import Card from './cards';
import Navbar from './navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { PokeInformacion } from './PokeInformacion';

function App() {

  const [datosPokemon, setDatosPokemon] = useState([]);

  const [siguientePag, setSiguientePag] = useState('');
  const [anteriorPag, setAnteriorPag] = useState('');
  const [cargando, setCargando] = useState(true);
  const urlPokemons = 'https://pokeapi.co/api/v2/pokemon';


 

  

  useEffect(() => {
    async function obtenerDatosPokemons(){
      let respuesta = await obtenerDatos(urlPokemons);
      setSiguientePag(respuesta.next);
      setAnteriorPag(respuesta.previous);
      let pokemon = await cargandoPokemon(respuesta.results);
      console.log(pokemon);
      setCargando(false);

    }

    obtenerDatosPokemons();
  },[])




  const siguiente = async ()=>{
    setCargando(true);
    let datos = await obtenerDatos(siguientePag);
    await cargandoPokemon(datos.results)
    setSiguientePag(datos.next)
    setAnteriorPag(datos.previous)
    setCargando(false);
  }
  const anterior = async ()=>{
    if(!anteriorPag)return;
    setCargando(true);
    let datos = await obtenerDatos(anteriorPag);
    await cargandoPokemon(datos.results)
    setSiguientePag(datos.next)
    setAnteriorPag(datos.previous)
    setCargando(false);
  }

  const cargandoPokemon = async (datos) => {
    let poke = await Promise.all(datos.map(async pokemon =>{
      let pokemonData = await obtenerPokemon(pokemon.url);
      return pokemonData
    }))

    setDatosPokemon(poke)
  }

  console.log(datosPokemon);

  return (
    

    <Router>
     <Switch>
          <Route path="/" exact>
               <div className="App">
                <Navbar></Navbar>
                <br></br>
                <button onClick={anterior} className="btn btn-info">Anterior</button>
                <button onClick={siguiente} className="btn btn-danger">Siguiente</button>
                {cargando ? <h1>Cargando pokemons....</h1>:(
                  <>

                    <div>
                      {
                        
                      datosPokemon.map((pokemon, i)=>{
                        // setId(pokemon.id)
                        return <Card key={i} pokemon={pokemon}/>;
                      
                      })}
                    </div>
                    
                  </>
                  )}
                </div>
          </Route>

          <Route path="/pokemon/:id" exact>
            <PokeInformacion />
          </Route>
     </Switch>
     </Router>
  );
}

export default App;
