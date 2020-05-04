import React, { useRef, useEffect, useState } from 'react'
import Vex from 'vexflow'
import Settings from './settings/Settings'
import { connect } from 'react-redux'
// import { keys } from './keys.js'
import useWindowDimensions from '../hooks/useWindowDimensions.js'

const MusicNotation = ({ currentNote, currentKey, scale, keyNotes, scaleIndex }) => {
  const [VF, setVF] = useState(Vex.Flow)
  const rendererRef = useRef(null)
  const rendererRef2 = useRef(null)
  const contextRef = useRef(null)
  const contextRef2 = useRef(null)
  const { height, width } = useWindowDimensions();
  const factor = useRef((width < 800 ? 7 : 8) / 8)

  // useEffect(() => {
  //   factor.current = 800 / 800
  // }, [width])

  useEffect(() => {
    const div = document.getElementById("music-canvas")
    rendererRef.current = new VF.Renderer(div, VF.Renderer.Backends.SVG)
    contextRef.current = rendererRef.current.getContext()
    contextRef.current.scale(factor.current, factor.current)
    rendererRef.current.resize((factor.current === 1 ? 455 : 350), 120*factor.current)

    const div2 = document.getElementById("music-canvas2")
    rendererRef2.current = new VF.Renderer(div2, VF.Renderer.Backends.SVG)
    contextRef2.current = rendererRef2.current.getContext()
    contextRef2.current.scale(factor.current, factor.current)
    rendererRef2.current.resize((factor.current === 1 ? 455 : 350), 120*factor.current)
  }, [])

  useEffect(() => {
    if (currentKey) renderKey(currentKey)
  }, [currentKey, currentNote])


  const generateNotes = () => {
    return scale.map((el, index) => {
      const currentNote = keyNotes[el]
      const myNote = new VF.StaveNote({clef: "treble", keys: [currentNote], duration: '4'})

      if (index === scaleIndex) myNote.setStyle({fillStyle: "rgb(48, 140, 223)", strokeStyle: "rgb(48, 140, 223)"});

      return myNote
    })
  }

  const renderKey = () => {
    // erase svg canvases
    if (contextRef.current.svg.firstChild) contextRef.current.svg.innerHTML = ''
    if (contextRef2.current.svg.firstChild) contextRef2.current.svg.innerHTML = ''

    // create each stave, which functions as a measure
    const stave1 = new VF.Stave(0, 0, 250*factor.current);
    stave1.addClef("treble").addTimeSignature("4/4").addKeySignature(currentKey);
    stave1.setContext(contextRef.current).draw();

    const stave2 = new VF.Stave(250*factor.current, 0, 200*factor.current);
    stave2.setContext(contextRef.current).draw();

    const stave3 = new VF.Stave(0, 0, 250*factor.current);
    stave3.addClef("treble").addTimeSignature("4/4").addKeySignature(currentKey);
    stave3.setContext(contextRef2.current).draw();

    const stave4 = new VF.Stave(250*factor.current, 0, 200*factor.current).addTimeSignature("2/4");
    stave4.setContext(contextRef2.current).draw();

    // grab the notes for each stave from keys()
    const notesArray = generateNotes()

    const notes = notesArray.slice(0,4)
    const notes2 = notesArray.slice(4,8)
    const notes3 = notesArray.slice(8, 12)
    const notes4 = notesArray.slice(12, 14)

    // draw notes on each stave/measure
    let voice = new VF.Voice({num_beats: 4,  beat_value: 4});
    voice.addTickables(notes);
    let formatter = new VF.Formatter().joinVoices([voice]).format([voice], 150*factor.current);
    voice.draw(contextRef.current, stave1)

    voice = new VF.Voice({num_beats: 4,  beat_value: 4});
    voice.addTickables(notes2);
    formatter = new VF.Formatter().joinVoices([voice]).format([voice], 150*factor.current);
    voice.draw(contextRef.current, stave2)

    voice = new VF.Voice({num_beats: 4,  beat_value: 4});
    voice.addTickables(notes3);
    formatter = new VF.Formatter().joinVoices([voice]).format([voice], 150*factor.current);
    voice.draw(contextRef2.current, stave3)

    voice = new VF.Voice({num_beats: 2,  beat_value: 4});
    voice.addTickables(notes4);
    formatter = new VF.Formatter().joinVoices([voice]).format([voice], 150*factor.current);
    voice.draw(contextRef2.current, stave4)
  }

  return (
    <div style={styles.musicAndSettingsStyle}>
      <div style={styles.staffWrapper}>
        <div id="music-canvas" style={styles.canvasStyle}></div>
        <div id="music-canvas2" style={styles.canvasStyle2}></div>
      </div>
      <Settings />
    </div>
  )
}

const styles = {
  musicAndSettingsStyle: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignSelf: 'stretch'
  },
  staffWrapper: {
    // backgroundColor: 'red',
    alignSelf: 'stretch',
    flex: 2,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5px'
  },
  canvasStyle: {
    // alignSelf: 'stretch',
    // backgroundColor: 'blue'
  },
  canvasStyle2: {
    // alignSelf: 'stretch',
    // backgroundColor: 'red'
  }
}

const mapStateToProps = state => {
  return {
    currentNote: state.currentNote,
    currentKey: state.settings.key,
    scale: state.settings.scale,
    keyNotes: state.settings.keyNotes,
    scaleIndex: state.settings.scaleIndex
  }
}

export default connect(mapStateToProps, null)(MusicNotation)
