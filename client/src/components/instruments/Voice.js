import React from 'react'
import { connect } from 'react-redux'

const Voice = ({currentNote, currentKey, keyNote, scale, scaleIndex}) => {
  const note = scaleIndex === 0 ? keyNote[scale[scaleIndex]] : currentNote
  const name = scaleIndex === 0 ? note.split("/")[0].toUpperCase() : note.split(/\d/)[0].toUpperCase()
  const octave = scaleIndex === 0 ? parseInt(note.split("/")[1])-1 : note.split(/\D/)[1]

  const calculateScaleTone = () => {
    if (scaleIndex === 0) return 1
    return scale[(scaleIndex - 1)%scale.length] + 1
  }

  return (
    <div style={styles.wrapperStyle}>
      <div>
        <span style={styles.noteStyle}>{name}</span>
        <span style={styles.octaveStyle}>{octave}</span>
      </div>
      <div style={styles.scaleToneStyle}>
        {calculateScaleTone()}
      </div>
    </div>
  )
}

const styles = {
  wrapperStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  noteStyle: {
    fontSize: "60px"
  },
  octaveStyle: {
    fontSize: "20px"
  },
  scaleToneStyle: {
    fontSize: "40px",
    fontWeight: 'bold'
  }
}


const mapStateToProps = state => {
  return {
    currentNote: state.currentNote.current,
    currentKey: state.settings.key,
    keyNote: state.settings.keyNotes,
    scale: state.settings.scale,
    scaleIndex: state.settings.scaleIndex
  }
}

export default connect(mapStateToProps, null)(Voice)
