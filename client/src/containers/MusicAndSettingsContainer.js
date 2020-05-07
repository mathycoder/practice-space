import React, { useEffect, useRef } from 'react'
import MusicNotation from '../components/MusicNotation'
import Settings from '../components/settings/Settings'
import { connect } from 'react-redux'

const MusicAndSettingsContainer = ({guitarSamplerRef, pianoSamplerRef, instrument}) => {

  return (
    <div style={styles.wrapper}>
      <MusicNotation />
      <Settings guitarSamplerRef={guitarSamplerRef} pianoSamplerRef={pianoSamplerRef} />
    </div>
  )
}

const styles = {
  wrapper: {
    border: '1px solid black',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: '20px',
    alignSelf: 'center',
    minHeight: '200px',
    maxWidth: '900px'
  }
}

const mapStateToProps = state => {
  return {
    instrument: state.settings.instrument
  }
}

export default connect(mapStateToProps, null)(MusicAndSettingsContainer)
