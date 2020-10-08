export async function obtenerDatos(urlPokemoms){
    return new Promise((resolve,reject)=>{
        fetch(urlPokemoms)
        .then(res => res.json())
        .then(data=>{
            resolve(data);
        })
    })
}

export async function obtenerPokemon(url){
    return new Promise((resolve,reject)=>{
        fetch(url)
        .then(res=> res.json())
        .then(data =>
            resolve(data))
    })
}
