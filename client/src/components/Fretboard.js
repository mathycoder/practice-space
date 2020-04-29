import React, { useState, useEffect, useRef } from 'react'
import './css/fretboard.css'
import * as Tone from 'tone'
import { connect } from 'react-redux'
import { setCurrentNote } from '../actions/currentNoteActions.js'
import { SampleLibrary } from '../tonejs-instruments/Tonejs-Instruments'

const Fretboard = ({ setCurrentNote }) => {
  const [overFret, setOverFret] = useState({string: null, fret: null})
  const samplerRef = useRef(null)
  const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
  const STRING_INDICES = [40, 35, 31, 26, 21, 16]
  //const synth = new Tone.Synth().toMaster();

  useEffect(() => {
    const samples = {
        'F#2': 'Fs2.wav',
        'F#3': 'Fs3.wav',
        'F#4': 'Fs4.wav',
        'F#5': 'Fs5.wav',
        'G3': 'G3.wav',
        'G5': 'G3.wav',
        'G#2': 'Gs2.wav',
        'G#4': 'Gs4.wav',
        'G#5': 'Gs5.wav',
        'A2': 'A2.wav',
        'A3': 'A3.wav',
        'A4': 'A4.wav',
        'A5': 'A5.wav',
        'A#5': 'As5.wav',
        'B1': 'B1.wav',
        'B2': 'B2.wav',
        'B3': 'B3.wav',
        'B4': 'B4.wav',
        'C#3': 'Cs3.wav',
        'C#4': 'Cs4.wav',
        'C#5': 'Cs5.wav',
        'D2': 'D2.wav',
        'D3': 'D3.wav',
        'D5': 'D5.wav',
        'D#4': 'Ds4.wav',
        'E2': 'E2.wav',
        'E3': 'E3.wav',
        'E4': 'E4.wav',
        'E5': 'E5.wav'
    }

    samplerRef.current = new Tone.Sampler(samples, [ null ], [ '/samples/guitar-nylon/']).toMaster()
  }, [])

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
    //synth.triggerAttackRelease(currNote, '8n')
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
