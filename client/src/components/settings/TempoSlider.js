import React, { useState } from 'react'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const TempoSlider = ({ callback, value }) => {
  const [localTempo, setLocalTempo] = useState(value)
  return (
    <div style={styles.sliderWrapper}>
      <div style={styles.sliderLabel}>Tempo</div>
      <Slider
        min={30}
        max={180}
        value={localTempo}
        onChange={newValue => setLocalTempo(newValue)}
        onAfterChange={newValue => callback(newValue)}
      />
    <div style={styles.bpmStyle}>{`${localTempo} bpm`}</div>
    </div>
  )
}

const styles = {
  sliderWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '150px',
    marginTop: '10px',
    marginLeft: '5px',
    marginRight: '5px'
  },
  sliderLabel: {
    fontWeight: 'bold',
    marginBottom: '10px',
    alignSelf: 'center',
  },
  bpmStyle: {
    marginTop: '7px',
  }
}

export default TempoSlider
