import React from 'react'
import DemoContainer from './containers/DemoContainer'
import MusicNotationContainer from './containers/MusicNotationContainer'
import './App.css'

function App() {
  return (
    <div>
      <header className="App-header">
      </header>
      <div className="body noselect" style={styles.containerDiv}>
        <DemoContainer />
        <MusicNotationContainer />
      </div>
    </div>
  );
}

const styles = {
  containerDiv: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    // height: '95vh',
    // maxHeight: '95vh',
    justifyContent: 'flex-start',
    overflowY: 'scroll'
  }
}

export default App;
