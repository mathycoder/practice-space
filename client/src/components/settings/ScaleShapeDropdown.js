import React from 'react'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import './dropdown.css'

const ScaleShapeDropdown = ({ scaleShape, callback }) => {
  const options = ['Up and Down', 'Up Only', 'Down Only']

  return (
    <div className="scale-shape-dropdown" style={styles.dropdownWrapper}>
      <Dropdown
        className="custom-dropdown"
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
  }
}

export default ScaleShapeDropdown
