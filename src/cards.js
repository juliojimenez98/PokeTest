import React from 'react'
import {Link} from 'react-router-dom'

function Card({pokemon}) {
    return (
        <div className="card text-white border-danger bg-secondary mx-auto reduce">
            <div className="card-body">
                <img src={pokemon.sprites.front_default}></img>

                <h5 className="card-title">{pokemon.name}</h5>
                <h5 className="card-title"><span class="badge badge-info">Pokemon de tipo</span></h5>

                {pokemon.types.map(tipoPokemon =>{
                    
                   return <h6 className="card-title">
                       
                    <span class="badge badge-primary">{tipoPokemon.type.name}</span>

                   </h6>
                 } )}
                 <button type="button" class="btn btn-danger">
                     <Link to={`/pokemon/${pokemon.id}`}>
                         Más INFO
                     </Link>
                 </button>

            </div>
        </div>
    )
}
export default Card;