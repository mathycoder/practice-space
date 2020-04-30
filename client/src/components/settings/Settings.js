import React, { useEffect, useRef } from 'react'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { setKey } from '../../actions/settingsActions.js'
import { connect } from 'react-redux'
import * as Tone from 'tone'
import { sampler } from '../sampler.js'
import BigButton from '../elements/BigButton'

const Settings = ({ currentKey, setKey }) => {
  const samplerRef = useRef(null)

  useEffect(() => {
    samplerRef.current = sampler.toMaster()
  }, [])




  const renderKeyDropdown = () => {
    const options = [
      'C', 'G', 'D', 'A', 'E'
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
      <div style={styles.buttonWrapper}>
        <BigButton title="Start"/>
      </div>
    </div>
  )
}

const styles = {
  settingsWrapper: {
    flex: 1,
    display: 'flex',
    backgroundColor: 'gray',
    alignSelf: 'stretch',
    justifyContent: 'space-around',
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
  },
  buttonWrapper: {
    marginTop: '16px'
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
