import { useContext } from "react"
import { PokemonContext } from "../context/PokemonContext"
export const BotonAdd = ()=>{
    const {onClickLoadMore}= useContext(PokemonContext)
    return (
        <div className="container-btn-load-more container">
            <button className="btn-load-more" onClick={onClickLoadMore}>
                Cargar más 
            </button>
        </div>
    )
}
