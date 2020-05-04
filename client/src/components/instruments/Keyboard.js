import React, { useRef, useEffect } from 'react'
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';
import useWindowDimensions from '../../hooks/useWindowDimensions.js'
import { connect } from 'react-redux'
import { sampler } from './sampler.js'
import { setCurrentNote } from '../../actions/currentNoteActions.js'

const Keyboard = ({currentNote, currentKey, currentCategory,
                   setCurrentNote, looping }) => {
  const { width } = useWindowDimensions();
  const componentWidth = width > 900 ? 900*0.8 : width*0.8
  const samplerRef = useRef(null)
  const NOTES = currentCategory === 'sharps' ? ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
                                             : ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']

  useEffect(() => {
    samplerRef.current = sampler('piano').toMaster()
  }, [])

  const calculateCurrentNote = midiNumber => {
    const letter = NOTES[midiNumber % 12].toLowerCase()
    const octave = Math.floor(midiNumber / 12)
    return `${letter}${octave}`
  }

  const playSoloNote = midiNumber => {
    if (!looping){
      const currNote = calculateCurrentNote(midiNumber)
      samplerRef.current.triggerAttackRelease(currNote, '4n');
      setCurrentNote(currNote)
    }
  }

  return (
    <div>
      <Piano
        noteRange={{ first: MidiNumbers.fromNote('c2'), last: MidiNumbers.fromNote('f4') }}
        onClick={(e) => console.log(e)}
        playNote={(midiNumber) => playSoloNote(midiNumber)}
        stopNote={(midiNumber) => {
          // Stop playing a given note - see notes below
        }}
        width={componentWidth}
        activeNotes={currentNote && looping ? [MidiNumbers.fromNote(currentNote)] : null}
        // keyboardShortcuts={keyboardShortcuts}
      />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentNote: state.currentNote,
    currentKey: state.settings.key,
    currentCategory: state.settings.category,
    looping: state.settings.looping
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentNote: note => dispatch(setCurrentNote(note))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Keyboard)
