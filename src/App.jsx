import './App.css';
import {useState, useEffect } from 'react'
import PokemonList from './PokemonList'
import Pagination from './Pagination'
import axios from 'axios'

function App() {
  const [pokemon, setPokemon] =useState([])
  const [currentPageUrl, setCurrentPageUrl] =useState(["https://pokeapi.co/api/v2/pokemon"])
  const [nextPageUrl, setNextPageUrl] =useState()
  const [previousPageUrl, setPreviousPageUrl] =useState()
  const [loading, setLoading] = useState(true)
  

  useEffect(()=> {
    setLoading(true)
    let cancel;
      axios.get(currentPageUrl , {cancelToken: new axios.CancelToken(c => cancel = c )}).then(res => {
        setLoading(false)
        setNextPageUrl(res.data.next)
        setPreviousPageUrl(res.data.previous)
      setPokemon(res.data.results.map(p => p.name))
  })

  //Function to cleanup after last request
    return () =>{
      // cancel token to cancel our request
      cancel()
    }
  },[currentPageUrl])

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function goToPreviousPage() {
    setCurrentPageUrl(previousPageUrl)
  }
  
  if (loading) return "loading........."
  
  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Pagination 
        goToNextPage ={nextPageUrl ? goToNextPage : null}
        goToPrevPage = {previousPageUrl ? goToPreviousPage : null} />
    </>
  );
}

export default App;
