import React from 'react'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { setKey } from '../../actions/settingsActions.js'
import { connect } from 'react-redux'

const Settings = ({ currentKey, setKey }) => {
  const renderKeyDropdown = () => {
    const options = [
      'C', 'G', 'D'
    ]

    return (
      <div style={styles.dropdownWrapper}>
        <div style={styles.dropdownLabel}>Key</div>
        <Dropdown
          options={options}
          onChange={(obj) => setKey(obj.value)}
          value={currentKey}
          placeholder="Select an option"
        />
      </div>
    )
  }

  return (
    <div style={styles.settingsWrapper}>
      {renderKeyDropdown()}
    </div>
  )
}

const styles = {
  settingsWrapper: {
    flex: 1,
    display: 'flex',
    backgroundColor: 'gray',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '20px'
  },
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
    currentKey: state.settings
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setKey: key => dispatch(setKey(key))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
