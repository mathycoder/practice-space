import React, { useRef, useEffect } from 'react'
import DemoContainer from './containers/DemoContainer'
import MusicAndSettingsContainer from './containers/MusicAndSettingsContainer'
import NavBar from './components/navbar/NavBar'
import { sampler } from './components/instruments/sampler.js'
import { isLoading, doneLoading } from './actions/settingsActions.js'
import { connect } from 'react-redux'
import './App.css'

const App = ({isLoading, doneLoading}) => {
  const guitarSamplerRef = useRef(sampler('guitar', () => doneLoading()))
  const pianoSamplerRef = useRef(sampler('piano', () => doneLoading()))

  useEffect(() => {
    isLoading()
  }, [])

  return (
    <div>
      <header className="App-header">
        <NavBar />
      </header>
      <div className="body noselect" style={styles.containerDiv}>
        <DemoContainer guitarSamplerRef={guitarSamplerRef} pianoSamplerRef={pianoSamplerRef} />
        <MusicAndSettingsContainer guitarSamplerRef={guitarSamplerRef} pianoSamplerRef={pianoSamplerRef} />
      </div>
    </div>
  );
}

const styles = {
  containerDiv: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    overflowY: 'scroll'
  }
}

const mapStateToProps = state => {
  return {
    loading: state.settings.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    isLoading: () => dispatch(isLoading()),
    doneLoading: () => dispatch(doneLoading())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
