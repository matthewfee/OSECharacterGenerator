import React from 'react';
import './css/App.css';
import './css/normalize.css';
import './css/skeleton.css';
import NewCharacter from './NewCharacter.js';



class App extends React.Component {
  render() {
    return (
      <div className="App">
        <body className="App-header">
          <NewCharacter />

        </body>

      </div>
    );
  }
}

export default App;
