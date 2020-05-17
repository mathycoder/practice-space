import React, { useState } from 'react'
import Fretboard from '../components/instruments/Fretboard'
import Keyboard from '../components/instruments/Keyboard'
import DemoDropdown from './DemoDropdown'
import { connect } from 'react-redux'
import { setInstrument } from '../actions/settingsActions.js'

const DemoContainer = ({instrument, setInstrument, guitarSamplerRef, pianoSamplerRef}) => {
  return (
    <div style={styles.demoWrapper}>
      <div style={styles.dropdownWrapper}>
        <DemoDropdown value={instrument} callback={setInstrument}/>
      </div>
      <div style={styles.instrumentWrapper}>
        {instrument === 'Guitar'
            ? <Fretboard guitarSamplerRef={guitarSamplerRef} />
            : <Keyboard pianoSamplerRef={pianoSamplerRef} />
        }
      </div>
    </div>
  )
}

const styles = {
  demoWrapper: {
    flexDirection: 'column',
  //  display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: '3px',
    padding: '15px',
    height: '100%'
  },
  dropdownWrapper: {
    width: '100px',
    margin: '15px',
  },
  instrumentWrapper: {
    alignSelf: 'stretch',
    display: 'flex',
    justifyContent: 'center',
    // backgroundColor: 'red',
  }
}

const mapStateToProps = state => {
  return {
    instrument: state.settings.instrument
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setInstrument: instrument => dispatch(setInstrument(instrument))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DemoContainer)
