// src/App.js
import React from 'react';
import { MetadataProvider } from './components/gamename';
import Home from './home';

const App = () => {
    return (
        <div>
            <MetadataProvider>
            <Home />
            </MetadataProvider>
        </div>
    );
};

export default App;