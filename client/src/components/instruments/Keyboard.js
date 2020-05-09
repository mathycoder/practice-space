import React, { useRef, useEffect } from 'react'
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';
import useWindowDimensions from '../../hooks/useWindowDimensions.js'
import { connect } from 'react-redux'
import { setCurrentNote } from '../../actions/currentNoteActions.js'
import './css/keyboard.css'

const Keyboard = ({currentNote, currentKey, currentCategory,
                   setCurrentNote, looping, loading, pianoSamplerRef }) => {
  const { width } = useWindowDimensions();
  const componentWidth = width > 900 ? 900*0.8 : width*0.8
  const NOTES = currentCategory === 'sharps' ? ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
                                             : ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']

  useEffect(() => {
    pianoSamplerRef.current.toMaster()
  }, [])

  const calculateCurrentNote = (midiNumber, capitalize=false) => {
    const letter = capitalize ? NOTES[midiNumber % 12] : NOTES[midiNumber % 12].toLowerCase()
    const octave = Math.floor(midiNumber / 12)
    return `${letter}${octave}`
  }

  const playSoloNote = midiNumber => {
    if (!looping){
      const currNote = calculateCurrentNote(midiNumber)
      pianoSamplerRef.current.triggerAttackRelease(currNote, '4n');
      setCurrentNote(currNote)
    }
  }

  const midiFriendlyNote = currNote => {
    const letter = currNote.split(/\d/)[0]
    const octave = parseInt(currNote.slice(-1))
    if (letter === 'cb') return `b${octave-1}`
    if (letter === 'fb') return `e${octave}`
    if (letter === 'e#') return `f${octave}`
    if (letter === 'b#') return `c${octave+1}`
    return currNote
  }

  return (
    <div>
      <Piano
        noteRange={{ first: MidiNumbers.fromNote('c2'), last: MidiNumbers.fromNote('f4') }}
        playNote={(midiNumber) => playSoloNote(midiNumber)}
        stopNote={(midiNumber) => {
          // Stop playing a given note - see notes below
        }}
        disabled={loading}
        width={componentWidth}
        activeNotes={currentNote && looping ? [MidiNumbers.fromNote(midiFriendlyNote(currentNote))] : null}
        renderNoteLabel={({ keyboardShortcut, midiNumber, isActive, isAccidental }) => {
          if (isActive){
            return (
              <div className="note">
                <div className="note-text">
                  {calculateCurrentNote(midiNumber, true)}
                </div>
              </div>
            )
          }
        }}

      />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentNote: state.currentNote.current,
    currentKey: state.settings.key,
    currentCategory: state.settings.category,
    looping: state.settings.looping,
    loading: state.settings.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentNote: note => dispatch(setCurrentNote(note))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Keyboard)
