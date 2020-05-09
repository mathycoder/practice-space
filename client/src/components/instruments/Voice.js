import React from 'react'
import { connect } from 'react-redux'
import './css/voice.css'

const Voice = ({currentNote, currentKey, keyNote, scale, scaleIndex}) => {
  const name = () => {
    const note = scaleIndex === 0
      ? keyNote[scale[0]].split("/")[0]
      : currentNote.split(/\d/)[0]
    return `${note.slice(0,1).toUpperCase()}${note.slice(1)}`
  }

  const calculateScaleTone = () => {
    if (scaleIndex%8 === 0) return 1
    return scale[(scaleIndex - 1)%scale.length] + 1
  }

  return (
    <div className="voice-wrapper">
      <div className="note-name">{name()}</div>
      <div className="scale-tone">
        {calculateScaleTone()}
      </div>
    </div>
  )
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
