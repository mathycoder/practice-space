import React from 'react'
import DemoContainer from './containers/DemoContainer'
import MusicNotationContainer from './containers/MusicNotationContainer'
import './App.css'

function App() {
  return (
    <div>
      <header className="App-header">
      </header>
      <body style={styles.bodyStyle}>
        <div style={styles.containerDiv}>
          <DemoContainer />
          <MusicNotationContainer />
        </div>
      </body>
    </div>
  );
}

const styles = {
  containerDiv: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    // height: '95vh',
    // maxHeight: '95vh',
    justifyContent: 'center',
    overflowY: 'scroll'
  }
}

export default App;
