import React, { useState } from 'react'
import Fretboard from '../components/instruments/Fretboard'
import Keyboard from '../components/instruments/Keyboard'
import Voice from '../components/instruments/Voice'
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
            : instrument === 'Piano'
              ? <Keyboard pianoSamplerRef={pianoSamplerRef} />
              : <Voice pianoSamplerRef={pianoSamplerRef} />
        }
      </div>
    </div>
  )
}

const styles = {
  demoWrapper: {
    flexDirection: 'column',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: '20px',
    marginBottom: '0px',
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
