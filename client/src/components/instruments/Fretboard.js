import React, { useState, useEffect, useRef } from 'react'
import './css/fretboard.css'
import { connect } from 'react-redux'
import { setCurrentNote } from '../../actions/currentNoteActions.js'
import { sampler } from './sampler.js'

const Fretboard = ({ setCurrentNote, currentNote, currentKey, currentCategory }) => {
  const [overFret, setOverFret] = useState({string: null, fret: null})
  const samplerRef = useRef(null)
  const NOTES = currentCategory === 'sharps' ? ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
                                             : ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
  const STRING_INDICES = [40, 35, 31, 26, 21, 16]

  useEffect(() => {
    samplerRef.current = sampler.toMaster()
  }, [])

  const calculateCurrentNote = (string, fret, uppercase = false) => {
    const rawStringIndex= STRING_INDICES[string]
    const fretIndex = (rawStringIndex + fret) % 12
    const octave = Math.floor((rawStringIndex + fret) / 12) + 1
    return uppercase ? `${NOTES[fretIndex]}${octave}` : `${NOTES[fretIndex].toLowerCase()}${octave}`
  }

  const clickNote = () => {
    const currNote = calculateCurrentNote(overFret.string, overFret.fret, true)
    samplerRef.current.triggerAttackRelease(currNote, '4n');
    setCurrentNote(currNote)
  }

  return (
    <div className="fretboard-wrapper noselect">
      {[0,1,2,3,4,5].map(stringNum => (
        <div className="string" key={stringNum}>
          {[0,1,2,3,4,5,6,7,8,9,10,11,12].map(fretNum => {
            return <div
              key={`${stringNum}${fretNum}`}
              onMouseEnter={() => setOverFret({string: stringNum, fret: fretNum})}
              onMouseLeave={() => setOverFret({string: null, fret: null})}
              className={`fret ${fretNum === 0 ? 'base' : null}
                         ${stringNum === 3 && (fretNum === 3 || fretNum === 5 || fretNum === 7 || fretNum === 9 || fretNum === 12) ? 'single-fretmark' : ''}`}
              onClick={() => clickNote()}
            >
              {(stringNum === 1 || stringNum === 4) && fretNum === 12 && !(overFret.string === stringNum && overFret.fret === fretNum)? <div className="double-fretmark"></div> : null}
              {
                <div className={`note ${(overFret.string === stringNum && overFret.fret === fretNum) || (calculateCurrentNote(stringNum, fretNum) === currentNote) ? 'show-note' : 'hide-note'}`}>
                  <div className="note-text">
                    {calculateCurrentNote(stringNum, fretNum, true)}
                  </div>
                </div>
              }
            </div>
          })}
        </div>
      ))}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentNote: state.currentNote,
    currentKey: state.settings.key,
    currentCategory: state.settings.category
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentNote: note => dispatch(setCurrentNote(note))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Fretboard)
