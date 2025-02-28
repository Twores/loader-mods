// src/App.js
import React from 'react';
import GameLabelComponent from './gamename';
import Home from './home';

const App = () => {
    return (
        <div>
            <Home />
            <GameLabelComponent/>
        </div>
    );
};

export default App;