import { useEffect, useState } from "react";
import { useForm } from '../hook/useForm';
import { PokemonContext } from "./PokemonContext";
const baseURL = 'https://pokeapi.co/api/v2/';


export const PokemonProvider = ({ children }) => {

    const [allPokemons, setAllPokemon] = useState([])
    const [globalPokemons, setGlobalPokemons] = useState([])
    const [offset, setOffset] = useState(0)
//Utilizar customhook - useForm
const {valueSearch, onInputChange,onResetForm} = useForm({
    valueSearch:'',
})
    //Estados de la aplicacion simples
    const [loading, setLoading] = useState(true)
    const [active, setActive] = useState(false)
    //Llamar solo  pokemones a la Api
    const getAllPokemons = async (limit = 50) => {
    // const baseURL = 'https://pokeapi.co/api/v2/';

        const res = await fetch(`${baseURL}pokemon?limit=${limit}&offset=${offset}`)
        const data = await res.json();

        const promises = data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url)
            const data = await res.json()
            return data
        })
        const results = await Promise.all(promises)

        setAllPokemon([...allPokemons, ...results])
        setLoading(false)
    }
    //llamar a todos los pokemones
    const getGlobalPokemons = async () => {
        // const baseURL = 'https://pokeapi.co/api/v2/';

        const res = await fetch(`${baseURL}pokemon?limit=100000&offset=0`)
        const data = await res.json();

        const promises = data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url)
            const data = await res.json()
            return data
        })
        const results = await Promise.all(promises)
        setGlobalPokemons(results)
        setLoading(false)

    }

    const getPokemonByID = async (id) => {
        const res = await fetch(`${baseURL}pokemon/${id}`)

    }
    useEffect(() => {
        getAllPokemons()
    }, [])

    useEffect(() => {
        getGlobalPokemons()
    }, [])
    return (
        <PokemonContext.Provider 
        value={{
           valueSearch,
           onInputChange,
           onResetForm,
           allPokemons,
           globalPokemons,
           getPokemonByID,
        }}>
            {children}
        </PokemonContext.Provider>
    )
}