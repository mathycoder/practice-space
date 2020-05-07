import React from 'react'
import { connect } from 'react-redux'

const Voice = ({currentNote, currentKey, keyNote, scale, scaleIndex}) => {

  // const convertNote = note => {
  //   const name = note.split("/")[0]
  //   const octave = note.split("/")[1]
  //   return `${name.toUpperCase()}${octave}`
  // }

  const note = scaleIndex === 0 ? keyNote[scale[scaleIndex]] : currentNote
  const name = scaleIndex === 0 ? note.split("/")[0].toUpperCase() : note.split(/\d/)[0].toUpperCase()
  const octave = scaleIndex === 0 ? parseInt(note.split("/")[1])-1 : note.split(/\D/)[1]
  

  return (
    <div>
      <div>
        <span style={styles.noteStyle}>{name}</span>
        <span style={styles.octaveStyle}>{octave}</span>
      </div>
      {scaleIndex}
    </div>
  )
}

const styles = {
  wrapperStyle: {

  },
  noteStyle: {
    fontSize: "60px"
  },
  octaveStyle: {
    fontSize: "20px"
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
