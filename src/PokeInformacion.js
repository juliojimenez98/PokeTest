import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const PokeInformacion = () => {

    console.log(useParams())
    const {id} = useParams()
    console.log(id)
    const [pokemon, setPokemon] = useState([]);
    useEffect(() => {
        informacionPokemon()
    
      }, [id])
    const informacionPokemon = async () =>{
        const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const poke = await data.json()
        setPokemon(poke)
        console.log("asdasasd",poke)
      }
    return (
        <div className="card text-white border-danger bg-secondary mx-auto reduce">
            <div className="card-body">
               


                <h5 className="card-title">Nombre:<span class="badge badge-danger">{pokemon.name}</span> </h5>
                <h5 className="card-title"><span class="badge badge-info">Estatura: {pokemon.height}'' Peso: {pokemon.weight}KG</span></h5>
               
                

            </div>
        </div>
    )
}
