import React from 'react'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import './dropdown.css'

const ScaleTypeDropdown = ({ scaleType, callback}) => {
  const options = ['major', 'minor']

  return (
    <div style={styles.dropdownWrapper}>
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
