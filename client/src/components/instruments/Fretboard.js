import React, { useState, useEffect, useRef } from 'react'
import './css/fretboard.css'
import { connect } from 'react-redux'
import { setCurrentNote } from '../../actions/currentNoteActions.js'
// import { sampler } from './sampler.js'
import {Animated} from "react-animated-css";

const Fretboard = ({ setCurrentNote, currentNote, currentKey, guitarSamplerRef,
                     currentCategory, nextNote, tempo, looping, accidentals }) => {
  const [overFret, setOverFret] = useState({string: null, fret: null, prevString: null, prevFret: null})
  const STRING_INDICES = [40, 35, 31, 26, 21, 16]

  useEffect(() => {
    guitarSamplerRef.current.toMaster()
  }, [])

  const notesArray = () => {
    
    if (currentCategory === 'sharps'){
      if (accidentals <=5){
        return ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
      } else if (accidentals === 6){
        return ['C', 'C#', 'D', 'D#', 'E', 'E#', 'F#', 'G', 'G#', 'A', 'A#', 'B']
      } else {
        return ['B#', 'C#', 'D', 'D#', 'E', 'E#', 'F#', 'G', 'G#', 'A', 'A#', 'B']
      }
    } else {
      if (accidentals <=5){
        return ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
      } else if (accidentals === 6){
        return ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'Cb']
      } else {
        return ['C', 'Db', 'D', 'Eb', 'Fb', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'Cb']
      }
    }
  }

  const calculateCurrentNote = (string, fret, uppercase = false) => {
    const rawStringIndex= STRING_INDICES[string]
    const fretIndex = (rawStringIndex + fret) % 12
    let octave = Math.floor((rawStringIndex + fret) / 12) + 1
    if (notesArray()[fretIndex] === 'Cb') octave+=1
    if (notesArray()[fretIndex] === 'B#') octave-=1
    return uppercase ? `${notesArray()[fretIndex]}${octave}` : `${notesArray()[fretIndex].toLowerCase()}${octave}`
  }

  const clickNote = () => {
    const currNote = calculateCurrentNote(overFret.string, overFret.fret, true)
    guitarSamplerRef.current.triggerAttackRelease(currNote, '4n');
    setCurrentNote(currNote)
  }

  return (
    <div className="fretboard-wrapper noselect">
      {[0,1,2,3,4,5].map(stringNum => (
        <div className="string" key={stringNum}>
          {[0,1,2,3,4,5,6,7,8,9,10,11,12].map(fretNum => {
            return <div
              key={`${stringNum}${fretNum}`}
              onMouseEnter={() => setOverFret(prev => {
                return {string: stringNum, fret: fretNum, prevString: prev.prevString, prevFret: prev.prevFret}
              })}
              onMouseLeave={() => setOverFret(prev => {
                return {string: null, fret: null, prevString: prev.string, prevFret: prev.fret}
              })}
              className={`fret ${fretNum === 0 ? 'base' : null}
                         ${stringNum === 3 && (fretNum === 3 || fretNum === 5 || fretNum === 7 || fretNum === 9 || fretNum === 12) ? 'single-fretmark' : ''}`}
              onClick={() => clickNote()}
            >
              {(stringNum === 1 || stringNum === 4) && fretNum === 12 && !(overFret.string === stringNum && overFret.fret === fretNum)? <div className="double-fretmark"></div> : null}
              { calculateCurrentNote(stringNum, fretNum) === nextNote && looping ?
                <Animated
                  className="note fadein"
                  style={{zIndex: 2}}
                  animationIn="fadeIn"
                  animationOut="fadeOut"
                  animationInDuration={200000/tempo}
                  isVisible={true}>
                  <div>{calculateCurrentNote(stringNum, fretNum, true)}</div>
                </Animated>
                :
                <div
                  className={`note ${!looping ?
                        (overFret.string === stringNum && overFret.fret === fretNum ? 'display-note'
                        : overFret.prevString === stringNum && overFret.prevFret === fretNum ? 'hide-note-nofade' : 'hide-note')
                         : calculateCurrentNote(stringNum, fretNum) === currentNote ? 'display-note' : 'hide-note'}`}
                  >
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
    currentNote: state.currentNote.current,
    nextNote: state.currentNote.next,
    currentKey: state.settings.key,
    currentCategory: state.settings.category,
    accidentals: state.settings.accidentals,
    tempo: state.settings.bpm,
    looping: state.settings.looping
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentNote: note => dispatch(setCurrentNote(note))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Fretboard)
