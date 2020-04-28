import React from 'react'
import DemoContainer from './containers/DemoContainer'
import MusicNotationContainer from './containers/MusicNotationContainer'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <body style={styles.containerDiv}>
        <DemoContainer />
        <MusicNotationContainer />
      </body>
    </div>
  );
}

const styles = {
  containerDiv: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh'
  }
}

export default App;
