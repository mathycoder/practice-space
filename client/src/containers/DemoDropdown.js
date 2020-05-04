import React from 'react'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

const DemoDropdown = ({ value, callback}) => {
  const options = ['guitar', 'piano']

  return (
    <div style={styles.dropdownWrapper}>
      <div style={styles.dropdownLabel}>Instrument</div>
      <Dropdown
        style={{maxHeight: '100px'}}
        options={options}
        onChange={callback}
        value={value}
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

export default DemoDropdown
