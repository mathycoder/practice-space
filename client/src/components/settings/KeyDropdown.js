import React from 'react'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import './dropdown.css'

const KeyDropdown = ({ currentKey, scaleType, callback}) => {
  const options = scaleType === 'major'
    ? ['Ab', 'A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'G']
    : ['Ab', 'A', 'Bb', 'B', 'C', 'D', 'Eb', 'E', 'F', 'G']


  return (
    <div style={styles.dropdownWrapper}>
      <div style={styles.dropdownLabel}>Key</div>
      <Dropdown
        style={{maxHeight: '100px'}}
        options={options}
        onChange={callback}
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

export default KeyDropdown
