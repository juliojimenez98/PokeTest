import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from './navbar'

export const PokeInformacion = () => {

    console.log(useParams())
    const {id} = useParams()
    console.log(id)
    const [pokemon, setPokemon] = useState([]);
    const [pokeData, setPokeData] = useState([]);
    const [pokemonType, setPokemonType] = useState("");


    
    useEffect(() => {
        informacionPokemon()
    
      }, [id])


    const informacionPokemon = async () =>{
        const toArray =[];
        try {
            const url = `https://pokeapi.co/api/v2/pokemon/${id}`
            const res = await Axios.get(url);
            toArray.push(res.data);
            setPokemon(res)
            setPokemonType(res.data.types[0].type.name)
            setPokeData(toArray);
            console.log("asdasasd",res)
        } catch (e) {
            console.log(e)
        }
        
      }
 

        return (
        
        <div>
            <button type="button" class="btn btn-warning">
                     <Link to={`/`}>
                         Volver
                     </Link>
                 </button>
            {pokeData.map((data)=>{
                return(
                   <div className="card text-white border-danger bg-secondary mx-auto reduce2">
                       <div className="card-body">
                        <img className="img-ajust" src={data.sprites["front_default"]}></img>
                        <img className="img-ajust" src={data.sprites.front_shiny}></img>

                
                       <h3 className="card-title"><span class="badge badge-info">{data.name}</span></h3>
                
                       <table class="table table-danger">
                         <thead>
                           <tr>
                             <th scope="col">ID POKEDEX</th>
                             <th scope="col">Habilidad</th>
                             <th scope="col">Peso</th>
                             <th scope="col">Estatura</th>
                             <th scope="col">Movimiento</th>
                           </tr>
                         </thead>
                         <tbody>
                           <tr>
                             <th scope="row">{data.id}</th>
                             <td>{data.abilities[0].ability.name}</td>
                             <td>{data.weight}kg.</td>
                             <td>{Math.round(data.height * 3.9)}"</td>
                             <td>{data.moves[0].move.name}</td>
                           </tr>
                         </tbody>
                       </table>
                
                
                       </div>
                   </div>
                    
                )
            })}
        </div>
             
             
          
    )

}
