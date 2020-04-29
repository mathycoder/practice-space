import React, { useRef, useEffect, useState } from 'react'
import Vex from 'vexflow'
import Settings from './settings/Settings'
import { connect } from 'react-redux'
import { keys } from './keys.js'

const MusicNotation = ({ currentNote, currentKey }) => {
  const [VF, setVF] = useState(Vex.Flow)
  const rendererRef = useRef(null)
  const contextRef = useRef(null)
  const staveRef = useRef(null)
  const firstRef = useRef(false)

  useEffect(() => {
    const div = document.getElementById("music-canvas")
    rendererRef.current = new VF.Renderer(div, VF.Renderer.Backends.SVG)
    contextRef.current = rendererRef.current.getContext()
    rendererRef.current.resize(600,250)
    // staveRef.current = new VF.Stave(40, 0, 500);
    // staveRef.current.addClef("treble").addTimeSignature("4/4");
    // staveRef.current.setContext(contextRef.current).draw();
  }, [])

  // useEffect(() => {
  //   if (currentNote) renderNote(currentNote)
  // }, [currentNote])

  useEffect(() => {
    if (currentKey) renderKey(currentKey)
  }, [currentKey])

  const deleteNote = () => {
    contextRef.current.svg.removeChild(contextRef.current.svg.lastChild)
  }

  const renderNote = (note="c/4") => {
    let accidental = false
    !firstRef.current ? firstRef.current = true : deleteNote()

    if (note !== "c/4") {
      const key = note.split(/[0-9]/)[0]
      const octaveIndex = note.search(/[0-9]/)
      const octave = parseInt(note[octaveIndex]) + 1
      note = `${key}/${octave}`
      if (key[1]) accidental = true
    }

    const notes = accidental
      ? [new VF.StaveNote({clef: "treble", keys: [note], duration: 'w'}).
        addAccidental(0, new VF.Accidental("#"))]
      : [new VF.StaveNote({clef: "treble", keys: [note], duration: 'w'})]

    const voice = new VF.Voice({num_beats: 4,  beat_value: 4});
    voice.addTickables(notes)
    const formatter = new VF.Formatter().joinVoices([voice]).format([voice], 200)
    voice.draw(contextRef.current, staveRef.current)
  }

  const renderKey = () => {
    if (contextRef.current.svg.firstChild) contextRef.current.svg.innerHTML = ''
    const stave1 = new VF.Stave(40, 0, 250);
    stave1.addClef("treble").addTimeSignature("4/4").addKeySignature(currentKey);
    stave1.setContext(contextRef.current).draw();

    const stave2 = new VF.Stave(40 + 250, 0, 220);
    stave2.setContext(contextRef.current).draw();

    const notes = keys(VF, currentKey).slice(0,4)
    const notes2 = keys(VF, currentKey).slice(4,8)

    let voice = new VF.Voice({num_beats: 4,  beat_value: 4});
    voice.addTickables(notes);
    let formatter = new VF.Formatter().joinVoices([voice]).format([voice], 150);
    voice.draw(contextRef.current, stave1)

    voice = new VF.Voice({num_beats: 4,  beat_value: 4});
    voice.addTickables(notes2);
    formatter = new VF.Formatter().joinVoices([voice]).format([voice], 150);
    voice.draw(contextRef.current, stave2)
  }

  return (
    <>
      <div id="music-canvas" style={styles.canvasStyle}></div>
      <Settings />
    </>
  )
}

const styles = {
  canvasStyle: {
    flex: 1,
    alignSelf: 'stretch',
  }
}

const mapStateToProps = state => {
  return {
    currentNote: state.currentNote,
    currentKey: state.settings
  }
}

export default connect(mapStateToProps, null)(MusicNotation)
