import React from 'react'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import './dropdown.css'

const ScaleShapeDropdown = ({ scaleShape, callback }) => {
  const options = ['Ascending and Descending', 'Ascending', 'Descending']

  return (
    <div className="scale-dropdown" style={styles.dropdownWrapper}>
      <div style={styles.dropdownLabel}>Shape</div>
      <Dropdown
        style={{maxHeight: '100px'}}
        options={options}
        onChange={callback}
          value={scaleShape}
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

export default ScaleShapeDropdown
