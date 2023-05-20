import React from 'react'

function PokemonList({ pokemon }) {
  return (
    <div>
      {pokemon.map(p => {
        return(
          <div key={p}>{p}</div>
        )
      })}
    </div>
  )
}

export default PokemonList
