import React, { useRef, useEffect, useState } from 'react'
import Vex from 'vexflow'
import Settings from './settings/Settings'
import { connect } from 'react-redux'
import { keys } from './keys.js'

const MusicNotation = ({ currentNote, currentKey }) => {
  const [VF, setVF] = useState(Vex.Flow)
  const rendererRef = useRef(null)
  const contextRef = useRef(null)

  useEffect(() => {
    const div = document.getElementById("music-canvas")
    rendererRef.current = new VF.Renderer(div, VF.Renderer.Backends.SVG)
    contextRef.current = rendererRef.current.getContext()
    rendererRef.current.resize(500,100)
  }, [])

  useEffect(() => {
    if (currentKey) renderKey(currentKey)
  }, [currentKey, currentNote])

  const renderKey = () => {
    if (contextRef.current.svg.firstChild) contextRef.current.svg.innerHTML = ''

    const stave1 = new VF.Stave(40, 0, 250);
    stave1.addClef("treble").addTimeSignature("4/4").addKeySignature(currentKey);
    stave1.setContext(contextRef.current).draw();

    const stave2 = new VF.Stave(40 + 250, 0, 200);
    stave2.setContext(contextRef.current).draw();

    const notes = keys(VF, currentKey, currentNote).slice(0,4)
    const notes2 = keys(VF, currentKey, currentNote).slice(4,8)

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
    currentKey: state.settings.key
  }
}

export default connect(mapStateToProps, null)(MusicNotation)
