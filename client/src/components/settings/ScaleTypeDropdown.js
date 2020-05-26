import React from 'react'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import './dropdown.css'

const ScaleTypeDropdown = ({ currentKey, scaleType, callback}) => {
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

  const options = keyNotesObj[currentKey]

  return (
    <div className="scaletype-dropdown-wrapper" style={styles.dropdownWrapper}>
      <Dropdown
        className="custom-dropdown"
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
  }
}

export default ScaleTypeDropdown
