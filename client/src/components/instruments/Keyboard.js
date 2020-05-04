import React from 'react'
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';
import useWindowDimensions from '../../hooks/useWindowDimensions.js'
import { connect } from 'react-redux'

const Keyboard = ({currentNote, currentKey, currentCategory}) => {
  const firstNote = MidiNumbers.fromNote('c2');
  const lastNote = MidiNumbers.fromNote('f4');
  const { width } = useWindowDimensions();
  const componentWidth = width > 900 ? 900*0.8 : width*0.8

  return (
    <div>
      <Piano
        noteRange={{ first: firstNote, last: lastNote }}
        playNote={(midiNumber) => {
          // Play a given note - see notes below
        }}
        stopNote={(midiNumber) => {
          // Stop playing a given note - see notes below
        }}
        width={componentWidth}
        activeNotes={currentNote ? [MidiNumbers.fromNote(currentNote)] : []}
        // keyboardShortcuts={keyboardShortcuts}
      />
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

export default connect(mapStateToProps, null)(Keyboard)
