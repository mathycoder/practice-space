import React from 'react'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import './dropdown.css'
import { connect } from 'react-redux'
import { setKey } from '../../actions/settingsActions.js'

const KeyDropdown = ({ currentKey, setKey, scaleType, stopLoop, scaleShape, scaleRepetition }) => {
  const options = ['Ab', 'A', 'A#', 'Bb', 'B', 'Cb', 'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#']

  const keyNotesObj = {
    'Ab': ['major', 'nat. minor', 'harm. minor', 'chromatic'],
    'A': ['major', 'nat. minor', 'harm. minor', 'chromatic'],
    'A#': ['nat. minor', 'harm. minor', 'chromatic'],
    'Bb': ['major', 'nat. minor', 'harm. minor', 'chromatic'],
    'B': ['major', 'nat. minor', 'harm. minor', 'chromatic'],
    'Cb': ['major', 'chromatic'],
    'C': ['major', 'nat. minor', 'harm. minor', 'chromatic'],
    'C#': ['major', 'nat. minor', 'harm. minor', 'chromatic'],
    'Db': ['major', 'chromatic'],
    'D': ['major', 'nat. minor', 'harm. minor', 'chromatic'],
    'D#': ['nat. minor', 'harm. minor', 'chromatic'],
    'Eb': ['major', 'nat. minor', 'harm. minor', 'chromatic'],
    'E': ['major', 'nat. minor', 'harm. minor', 'chromatic'],
    'F': ['major', 'nat. minor', 'harm. minor', 'chromatic'],
    'F#': ['major', 'nat. minor', 'harm. minor', 'chromatic'],
    'Gb': ['major', 'chromatic'],
    'G': ['major', 'nat. minor', 'harm. minor', 'chromatic'],
    'G#': ['nat. minor', 'harm. minor', 'chromatic'],
  }

  return (
    <div className="key-dropdown-wrapper" style={styles.dropdownWrapper}>
      <Dropdown
        className="custom-dropdown"
        style={{maxHeight: '100px'}}
        options={options}
        onChange={(obj) => {
          if (keyNotesObj[obj.value].indexOf(scaleType) === -1){
            scaleType = keyNotesObj[obj.value][0]
          }
          setKey(obj.value, scaleType, scaleShape, scaleRepetition)
          stopLoop()
        }}
        value={currentKey}
        placeholder="Select an option"
      />
    </div>
  )
}


const styles = {
  dropdownWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
}

const mapStateToProps = state => {
  return {
    currentKey: state.settings.key,
    scaleType: state.settings.scaleType,
    scaleShape: state.settings.scaleShape,
    scaleRepetition: state.settings.scaleRepetition
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setKey: (key, scaleType, scaleShape, scaleRepetition) => dispatch(setKey(key, scaleType, scaleShape, scaleRepetition))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KeyDropdown)
