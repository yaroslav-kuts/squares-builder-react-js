import React from 'react';
import './App.css';

import './SquaresBuilder';
import SquaresBuilder from './SquaresBuilder';

function App() {
  return (
    <div className="App">
          <SquaresBuilder initialWidth='5' initialHeight='5'/>
    </div>
  );
}

export default App;
