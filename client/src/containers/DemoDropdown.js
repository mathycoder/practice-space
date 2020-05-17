import React from 'react'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { setLooping } from '../actions/settingsActions.js'
import { connect } from 'react-redux'
import './dropdown.css'

const DemoDropdown = ({ value, callback, looping }) => {
  const options = ['Piano', 'Guitar']
  return (
    <div className="demo-dropdown">
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

const mapStateToProps = state => {
  return {
    looping: state.settings.looping
  }
}

export default connect(mapStateToProps, null)(DemoDropdown)
