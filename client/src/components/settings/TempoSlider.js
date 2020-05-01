import React from 'react'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const TempoSlider = ({ callback, value }) => {
  return (
    <div style={styles.sliderWrapper}>
      <div style={styles.sliderLabel}>Tempo</div>
      <Slider
        min={30}
        max={180}
        value={value}
        onChange={newValue => callback(newValue)}
      />
      <div style={styles.bpmStyle}>{`${value} bpm`}</div>
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
    marginTop: '10px'
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
