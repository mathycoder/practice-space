import React from 'react'
import MusicNotation from '../components/MusicNotation'

const MusicNotationContainer = () => {
  return (
    <div style={styles.wrapper}>
      <MusicNotation />
    </div>
  )
}

const styles = {
  wrapper: {
    flex: 1,
    border: '1px solid black',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: '20px'
  }
}

export default MusicNotationContainer
