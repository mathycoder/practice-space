import React from 'react'
import { connect } from 'react-redux'

const Voice = ({currentNote, currentKey, keyNote, scale, scaleIndex}) => {

  // const octave = scaleIndex === 0 ? parseInt(note.split("/")[1])-1 : note.split(/\D/)[1]

  const name = () => {
    const note = scaleIndex === 0
      ? keyNote[scale[0]].split("/")[0]
      : keyNote[scale[(scaleIndex - 1)%scale.length]].split("/")[0]
    return `${note.slice(0,1).toUpperCase()}${note.slice(1)}`
  }

  const octave = () => {
    return scaleIndex === 0
      ? parseInt(keyNote[scale[0]].slice(-1)) - 1
      : parseInt(keyNote[scale[(scaleIndex - 1)%scale.length]].slice(-1)) - 1
  }

  const calculateScaleTone = () => {
    if (scaleIndex === 0) return 1
    return scale[(scaleIndex - 1)%scale.length] + 1
  }

  return (
    <div style={styles.wrapperStyle}>
      <div>
        <span style={styles.noteStyle}>{name()}</span>
        <span style={styles.octaveStyle}>{octave()}</span>
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
