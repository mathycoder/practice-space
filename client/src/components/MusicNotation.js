import React, { useRef, useEffect, useState } from 'react'
import Vex from 'vexflow'
import { connect } from 'react-redux'

const MusicNotation = ({ currentNote }) => {
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
    staveRef.current = new VF.Stave(40, 0, 500);
    staveRef.current.addClef("treble").addTimeSignature("4/4");
    staveRef.current.setContext(contextRef.current).draw();
  }, [])

  useEffect(() => {
    if (currentNote) renderNote(currentNote)
  }, [currentNote])


  const deleteNote = () => {
    contextRef.current.svg.removeChild(contextRef.current.svg.lastChild)
  }

  const renderNote = (note="c/4") => {
    let accidental = false
    !firstRef.current ? firstRef.current = true : deleteNote()

    if (note !== "c/4") {
      const key = note.split(/[0-9]/)[0]
      const octaveIndex = note.search(/[0-9]/)
      const octave = note[octaveIndex]
      note = `${key}/${octave}`
      if (key[1]) accidental = true
    }


    const notes = accidental ?
      [
        new VF.StaveNote({clef: "treble", keys: [note], duration: 'w'}).
        addAccidental(0, new VF.Accidental("#"))
      ]
      :
      [
        new VF.StaveNote({clef: "treble", keys: [note], duration: 'w'})
      ]

    const voice = new VF.Voice({num_beats: 4,  beat_value: 4});
    voice.addTickables(notes)
    const formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400)
    voice.draw(contextRef.current, staveRef.current)
  }

  return (
    <>
      <div id="music-canvas" style={styles.canvasStyle}></div>
      <div
        style={styles.rightStyle}
        onClick={() => renderNote()}
        >
        <button>Do Things</button>
      </div>
    </>
  )
}

const styles = {
  canvasStyle: {
    flex: 1,
    alignSelf: 'stretch',
  },
  rightStyle: {
    flex: 1,
    display: 'flex',
    backgroundColor: 'gray',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

const mapStateToProps = state => {
  return {
    currentNote: state.currentNote
  }
}

export default connect(mapStateToProps, null)(MusicNotation)
