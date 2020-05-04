import React, { useState } from 'react'
import Fretboard from '../components/instruments/Fretboard'
import Keyboard from '../components/instruments/Keyboard'
import DemoDropdown from './DemoDropdown'

const DemoContainer = () => {
  const [instrument, setInstrument] = useState('piano')
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

export default DemoContainer
