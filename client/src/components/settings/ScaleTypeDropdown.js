import React from 'react'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import './dropdown.css'

const ScaleTypeDropdown = ({ currentKey, scaleType, callback}) => {
  const keysWithNatMin = ['Ab', 'A', 'A#', 'Bb', 'B', 'C', 'C#', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'G', 'G#']
  const options = keysWithNatMin.includes(currentKey) ? ['major', 'nat. minor', 'harm. minor'] : ['major']

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
