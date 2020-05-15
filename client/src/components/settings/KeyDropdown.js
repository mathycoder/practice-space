import React from 'react'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import './dropdown.css'
import { connect } from 'react-redux'
import { setKey } from '../../actions/settingsActions.js'

const KeyDropdown = ({ currentKey, setKey, scaleType, stopLoop }) => {
  const options = ['Ab', 'A', 'A#', 'Bb', 'B', 'Cb', 'C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#']

  const keyNotesObj = {
    'Ab': ['major', 'nat. minor', 'harm. minor'],
    'A': ['major', 'nat. minor', 'harm. minor'],
    'A#': ['nat. minor', 'harm. minor'],
    'Bb': ['major', 'nat. minor', 'harm. minor'],
    'B': ['major', 'nat. minor', 'harm. minor'],
    'Cb': ['major'],
    'C': ['major', 'nat. minor', 'harm. minor'],
    'C#': ['major', 'nat. minor', 'harm. minor'],
    'Db': ['major'],
    'D': ['major', 'nat. minor', 'harm. minor'],
    'D#': ['nat. minor', 'harm. minor'],
    'Eb': ['major', 'nat. minor', 'harm. minor'],
    'E': ['major', 'nat. minor', 'harm. minor'],
    'F': ['major', 'nat. minor', 'harm. minor'],
    'F#': ['major', 'nat. minor', 'harm. minor'],
    'Gb': ['major'],
    'G': ['major', 'nat. minor', 'harm. minor'],
    'G#': ['nat. minor', 'harm. minor'],
  }

  return (
    <div style={styles.dropdownWrapper}>
      <div style={styles.dropdownLabel}>Key</div>
      <Dropdown
        style={{maxHeight: '100px'}}
        options={options}
        onChange={(obj) => {
          if (keyNotesObj[obj.value].indexOf(scaleType) === -1){
            scaleType = keyNotesObj[obj.value][0]
          }
          setKey(obj.value, scaleType)
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
    alignItems: 'center'
  },
  dropdownLabel: {
    fontWeight: 'bold',
    marginBottom: '5px',
    alignSelf: 'flex-start',
    marginLeft: '10px'
  }
}

const mapStateToProps = state => {
  return {
    currentKey: state.settings.key,
    scaleType: state.settings.scaleType
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setKey: (key, scaleType) => dispatch(setKey(key, scaleType))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KeyDropdown)
