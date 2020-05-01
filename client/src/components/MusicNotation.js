import React, { useRef, useEffect, useState } from 'react'
import Vex from 'vexflow'
import Settings from './settings/Settings'
import { connect } from 'react-redux'
import { keys } from './keys.js'

const MusicNotation = ({ currentNote, currentKey }) => {
  const [VF, setVF] = useState(Vex.Flow)
  const rendererRef = useRef(null)
  const rendererRef2 = useRef(null)
  const contextRef = useRef(null)
  const contextRef2 = useRef(null)

  useEffect(() => {
    const div = document.getElementById("music-canvas")
    rendererRef.current = new VF.Renderer(div, VF.Renderer.Backends.SVG)
    contextRef.current = rendererRef.current.getContext()
    rendererRef.current.resize(250,120)

    const div2 = document.getElementById("music-canvas2")
    rendererRef2.current = new VF.Renderer(div2, VF.Renderer.Backends.SVG)
    contextRef2.current = rendererRef2.current.getContext()
    rendererRef2.current.resize(200,120)
  }, [])

  useEffect(() => {
    if (currentKey) renderKey(currentKey)
  }, [currentKey, currentNote])

  const renderKey = () => {
    if (contextRef.current.svg.firstChild) contextRef.current.svg.innerHTML = ''
    if (contextRef2.current.svg.firstChild) contextRef2.current.svg.innerHTML = ''

    const stave1 = new VF.Stave(0, 0, 250);
    stave1.addClef("treble").addTimeSignature("4/4").addKeySignature(currentKey);
    stave1.setContext(contextRef.current).draw();

    const stave2 = new VF.Stave(0, 0, 200);
    stave2.setContext(contextRef2.current).draw();

    const notes = keys(VF, currentKey, currentNote).slice(0,4)
    const notes2 = keys(VF, currentKey, currentNote).slice(4,8)

    let voice = new VF.Voice({num_beats: 4,  beat_value: 4});
    voice.addTickables(notes);
    let formatter = new VF.Formatter().joinVoices([voice]).format([voice], 150);
    voice.draw(contextRef.current, stave1)

    voice = new VF.Voice({num_beats: 4,  beat_value: 4});
    voice.addTickables(notes2);
    formatter = new VF.Formatter().joinVoices([voice]).format([voice], 150);
    voice.draw(contextRef2.current, stave2)
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
    currentKey: state.settings.key
  }
}

export default connect(mapStateToProps, null)(MusicNotation)
