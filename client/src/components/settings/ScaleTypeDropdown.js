import React from 'react'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import './dropdown.css'

const ScaleTypeDropdown = ({ currentKey, scaleType, callback}) => {
  //const keysWithNatMin = ['Ab', 'A', 'A#', 'Bb', 'B', 'C', 'C#', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'G', 'G#']
  //const majorKeys = ['Ab', 'A', 'Bb', 'B', 'Cb', 'C', 'C#', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'Gb', 'G']
  //const options = keysWithNatMin.includes(currentKey) ? ['major', 'nat. minor', 'harm. minor'] : ['major']

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

  const options = keyNotesObj[currentKey]

  return (
    <div className="scale-dropdown" style={styles.dropdownWrapper}>
      <div style={styles.dropdownLabel}>Type</div>
      <Dropdown
        style={{maxHeight: '100px'}}
        options={options}
        onChange={callback}
          value={scaleType}
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
    margin: '10px'
  },
  dropdownLabel: {
    fontWeight: 'bold',
    marginBottom: '5px',
    alignSelf: 'flex-start',
    marginLeft: '10px'
  }
}

export default ScaleTypeDropdown
