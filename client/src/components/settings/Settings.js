import React from 'react'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const Settings = () => {
  const renderKeyDropdown = () => {
    const options = [
      'C', 'G', 'D'
    ]
    const defaultOption = options[0]
    return (
      <div style={styles.dropdownWrapper}>
        <div style={styles.dropdownLabel}>Key</div>
        <Dropdown
          options={options}
          onChange={() => console.log("hi")}
          value={defaultOption}
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

export default Settings
