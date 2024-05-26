import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import PokemonListComponent from "./PokemonComponent";



const App: React.FC = () => {

  return (
      <div>
        <h1>Pokemon Fetcher</h1>
        <PokemonListComponent />
      </div>
  );
};

export default App;
