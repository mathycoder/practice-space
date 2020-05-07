import React from 'react'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { setLooping } from '../actions/settingsActions.js'
import { connect } from 'react-redux'

const DemoDropdown = ({ value, callback, looping }) => {
  const options = ['guitar', 'piano']
  return (
    <div style={styles.dropdownWrapper}>
      <div style={styles.dropdownLabel}>Instrument</div>
      <Dropdown
        
        style={{maxHeight: '100px'}}
        options={options}
        onChange={value => {
          callback(value.value)
        }}
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

const mapStateToProps = state => {
  return {
    looping: state.settings.looping
  }
}

export default connect(mapStateToProps, null)(DemoDropdown)
