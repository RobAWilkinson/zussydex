import React from 'react';
import './App.css';

import PokemonListComponent from "./components/PokemonListComponent";


const App: React.FC = () => {

    return (
        <div>
            <h1>Pokemon Fetcher</h1>
            <PokemonListComponent/>
        </div>
    );
};

export default App;
