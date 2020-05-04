import React, { useState } from 'react'
import Fretboard from '../components/instruments/Fretboard'
import Keyboard from '../components/instruments/Keyboard'
import DemoDropdown from './DemoDropdown'
import { connect } from 'react-redux'
import { setInstrument } from '../actions/settingsActions.js'

const DemoContainer = ({instrument, setInstrument}) => {
  return (
    <div style={styles.demoWrapper}>
      <div style={styles.dropdownWrapper}>
        <DemoDropdown value={instrument} callback={setInstrument}/>
      </div>
      <div style={styles.instrumentWrapper}>
        {instrument === 'guitar' ? <Fretboard /> : <Keyboard />}
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
    justifyContent: 'center'
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
