import React from 'react';

import Builder from './components/Builder';

function App() {
  return (
    <div className="App">
      <Builder initialWidth={4} initialHeight={4} cellSize={50} />
    </div>
  );
}

export default App;
