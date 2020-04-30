import React, { useState, useEffect, useRef } from 'react'
import './css/fretboard.css'
import * as Tone from 'tone'
import { connect } from 'react-redux'
import { setCurrentNote } from '../actions/currentNoteActions.js'
import { sampler } from './sampler.js'

const Fretboard = ({ setCurrentNote }) => {
  const [overFret, setOverFret] = useState({string: null, fret: null})
  const samplerRef = useRef(null)
  const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
  const STRING_INDICES = [40, 35, 31, 26, 21, 16]

  useEffect(() => {
    samplerRef.current = sampler.toMaster()
  }, [])

  const currentNote = (withOctave = false) => {
    if (!overFret) return null
    const rawStringIndex= STRING_INDICES[overFret.string]
    const fretIndex = (rawStringIndex + overFret.fret) % 12
    const octave = Math.floor((rawStringIndex + overFret.fret) / 12) + 1
    return `${NOTES[fretIndex]}${withOctave ? octave : ''}`
  }

  const clickNote = () => {
    const currNote = currentNote(true)
    samplerRef.current.triggerAttackRelease(currNote, '4n');
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
              className={`fret ${fretNum === 0 ? 'base' : null}
                         ${stringNum === 3 && (fretNum === 3 || fretNum === 5 || fretNum === 7 || fretNum === 9) ? 'single-fretmark' : ''}`}
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
