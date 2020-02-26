import React from 'react';
import './App.css';

import './SquaresBuilder';
import SquaresBuilder from './SquaresBuilder';

function App() {
  return (
    <div className="App">
          <SquaresBuilder initialWidth='4' initialHeight='4'/>
    </div>
  );
}

export default App;
