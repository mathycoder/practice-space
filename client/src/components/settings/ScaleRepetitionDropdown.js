import React from 'react'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import './dropdown.css'

const ScaleRepetitionDropdown = ({ scaleRepetition, callback }) => {
  const options = ['None', 'Top and Bottom', 'All 2x', 'All 3x', 'All 4x']

  return (
    <div className="scale-dropdown" style={styles.dropdownWrapper}>
      <div style={styles.dropdownLabel}>Scale Repetition</div>
      <Dropdown
        style={{maxHeight: '100px'}}
        options={options}
        onChange={callback}
          value={scaleRepetition}
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

export default ScaleRepetitionDropdown
