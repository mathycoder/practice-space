import React from 'react'
import Fretboard from '../components/Fretboard'

const DemoContainer = () => {
  return (
    <div style={styles.demoWrapper}>
      <Fretboard />
    </div>
  )
}

const styles = {
  demoWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: '20px'
  }
}

export default DemoContainer
