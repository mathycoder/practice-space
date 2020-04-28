import React, { useState } from 'react'
import './css/fretboard.css'
import * as Tone from 'tone'
import { connect } from 'react-redux'
import { setCurrentNote } from '../actions/currentNoteActions.js'

const Fretboard = ({ setCurrentNote }) => {
  const [overFret, setOverFret] = useState({string: null, fret: null})
  const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
  const STRING_INDICES = [40, 35, 31, 26, 21, 16]
  const synth = new Tone.Synth().toMaster();

// E2, A2, D3, G3, B3, E4
// C1 = 0
// C2 = 12
// C3 = 24
// C4 = 36

  const currentNote = (withOctave = false) => {
    if (!overFret) return null
    const rawStringIndex= STRING_INDICES[overFret.string]
    const fretIndex = (rawStringIndex + overFret.fret) % 12
    const octave = Math.floor((rawStringIndex + overFret.fret) / 12) + 1
    return `${NOTES[fretIndex]}${withOctave ? octave : ''}`
  }

  const clickNote = () => {
    const currNote = currentNote(true)
    synth.triggerAttackRelease(currNote, '8n')
    setCurrentNote(currNote)
  }

  return (
    <div className="fretboard-wrapper noselect">
      {[0,1,2,3,4,5].map(stringNum => (
        <div className="string">
          {[0,1,2,3,4,5,6,7,8,9,10,11,12].map(fretNum => (
            <div
              onMouseEnter={() => setOverFret({string: stringNum, fret: fretNum})}
              onMouseLeave={() => setOverFret({string: null, fret: null})}
              className={`fret ${fretNum === 0 ? 'base' : null}`}
              onClick={() => clickNote()}
            >
              {overFret.string === stringNum && overFret.fret === fretNum
                ? <div className="note">
                    <div className="note-text">
                      {currentNote()}
                    </div>
                  </div>
                : null
              }
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentNote: note => dispatch(setCurrentNote(note))
  }
}

export default connect(null, mapDispatchToProps)(Fretboard)
