import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import './css/voice.css'

const Voice = ({currentNote, currentKey, keyNotes, scale,
                scaleIndex, currentScaleTone, scaleType}) => {
  const name = () => {
    const note = scaleIndex === 0
      ? (scaleType === 'chromatic' ? keyNotes[scale[0]][0] : keyNotes[scale[0]]).split("/")[0]
      : currentNote.split(/\d/)[0]
    return `${note.slice(0,1).toUpperCase()}${note.slice(1)}`
  }

  const calculateScaleTone = () => {
    const scaleTones = {
      'major': { 0: '1', 2: '2', 4: '3', 5: '4', 7: '5', 9: '6', 11: '7', 12: '1' },
      'nat. minor': { 0: '1', 2: '2', 3: '3', 5: '4', 7: '5', 8: '6', 10: '7', 12: '1' },
      'harm. minor': { 0: '1', 2: '2', 3: '3', 5: '4', 7: '5', 8: '6', 11: '7', 12: '1' },
    }
    const scaleHalfStep = scaleIndex === 0 ? 0 : scale[(scaleIndex-1)% scale.length]
    return scaleTones[scaleType][scaleHalfStep]
  }

  return (
    <div className="voice-wrapper">
      <div className="note-name">{name()}</div>
      <div className="scale-tone">
        {scaleType !== 'chromatic' ? calculateScaleTone() : null}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentNote: state.currentNote.current,
    currentKey: state.settings.key,
    currentScaleTone: state.currentNote.scaleTone,
    keyNotes: state.settings.keyNotes,
    scale: state.settings.scale,
    scaleIndex: state.settings.scaleIndex,
    scaleType: state.settings.scaleType
  }
}

export default connect(mapStateToProps, null)(Voice)
