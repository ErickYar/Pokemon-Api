import  { useContext } from "react"
import { useLocation } from "react-router-dom"
import { PokemonContext } from "../context/PokemonContext"
import { CardPokemon } from "../components"

export const SearchPage = () => {

    const location = useLocation()
   
    const { globalPokemons } = useContext(PokemonContext)

    const filteredPokemons = globalPokemons.filter(Pokemon => Pokemon.name.includes(location.state))

    return (
        <div className="Container">
            <p className="p-search">
                se encontraron <span>{filteredPokemons.length}</span> resultados:
            </p>
            <div className="card-list-pokemon cotainer">
                {filteredPokemons.map(pokemon => (
                    <CardPokemon pokemon={pokemon} key={pokemon.id}/>
                ))}

            </div>
        </div>
    )
}