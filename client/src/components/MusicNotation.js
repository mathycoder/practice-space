import React, { useRef, useEffect, useState } from 'react'
import Vex from 'vexflow'
import { connect } from 'react-redux'
import useWindowDimensions from '../hooks/useWindowDimensions.js'

const MusicNotation = ({ currentNote, currentKey, scale, currentCategory,
                         keyNotes, scaleIndex, accidentals, scaleType }) => {
  const [VF] = useState(Vex.Flow)
  const rendererRef = useRef(null)
  const rendererRef2 = useRef(null)
  const contextRef = useRef(null)
  const contextRef2 = useRef(null)
  const { width } = useWindowDimensions();

  // constants
  const factor = width < 800 ? 0.65 : 1
  const measureWidth = 160
  const accidentalWidth = accidentals ?
                            (currentCategory === 'sharps' ? 10 + 11*accidentals : 10 + 8*accidentals)
                            : 0
  const trebleKeyWidth = 60
  const trebleWidth = 30
  const timeSignatureWidth = 30
  const canvasWidth = (accidentalWidth + trebleKeyWidth + measureWidth*2) + 10

  useEffect(() => {
    const div = document.getElementById("music-canvas")
    rendererRef.current = new VF.Renderer(div, VF.Renderer.Backends.SVG)
    contextRef.current = rendererRef.current.getContext()
    contextRef.current.scale(factor, factor)
    rendererRef.current.resize(canvasWidth*factor, 120*factor)

    const div2 = document.getElementById("music-canvas2")
    rendererRef2.current = new VF.Renderer(div2, VF.Renderer.Backends.SVG)
    contextRef2.current = rendererRef2.current.getContext()
    contextRef2.current.scale(factor, factor)
    rendererRef2.current.resize(canvasWidth, 120*factor)
     // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (currentKey) renderKey(currentKey)
     // eslint-disable-next-line
  }, [currentKey, currentNote, scaleType])


  const generateNotes = () => {
    return scale.map((el, index) => {
      let currentNote = keyNotes[el]
      let accidental = null

      if (el === 6 && scaleType === 'harm. minor'){
        const letter = currentNote.split("/")[0]
        accidental = letter.length === 1 ? '#'
          : letter[1] === '#' ? '##' : 'n'
      }

      const myNote = !accidental
        ? new VF.StaveNote({clef: "treble", keys: [currentNote], duration: '4'})
        : new VF.StaveNote({clef: "treble", keys: [currentNote], duration: '4'}).
            addAccidental(0, new VF.Accidental(accidental))


      if (index === (scaleIndex%scale.length)) myNote.setStyle({fillStyle: "rgb(48, 140, 223)", strokeStyle: "rgb(48, 140, 223)"});

      return myNote
    })
  }

  const renderKey = () => {
    // erase svg canvases
    if (contextRef.current.svg.firstChild) contextRef.current.svg.innerHTML = ''
    if (contextRef2.current.svg.firstChild) contextRef2.current.svg.innerHTML = ''

    const keySignature = `${currentKey}${scaleType.includes('minor') ? 'm' :''}`

    rendererRef.current.resize(canvasWidth*factor, 120*factor)
    rendererRef2.current.resize(canvasWidth*factor, 120*factor)

    // create each stave, which functions as a measure
    const stave1 = new VF.Stave(0, 0, measureWidth + accidentalWidth + trebleWidth + timeSignatureWidth);
    stave1.addClef("treble").addTimeSignature("4/4").addKeySignature(keySignature);
    stave1.setContext(contextRef.current).draw();

    const stave2 = new VF.Stave(measureWidth + accidentalWidth + trebleWidth + timeSignatureWidth, 0, measureWidth);
    stave2.setContext(contextRef.current).draw();

    const stave3 = new VF.Stave(0, 0, measureWidth + accidentalWidth + trebleWidth);
    stave3.addClef("treble").addKeySignature(keySignature);
    stave3.setContext(contextRef2.current).draw();

    const stave4 = new VF.Stave(measureWidth + accidentalWidth + trebleWidth, 0, (measureWidth/2)*1.3).addTimeSignature("2/4");
    stave4.setEndBarType(VF.Barline.type.REPEAT_END)
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
    // eslint-disable-next-line
    let formatter = new VF.Formatter().joinVoices([voice]).format([voice], measureWidth);
    voice.draw(contextRef.current, stave1)

    voice = new VF.Voice({num_beats: 4,  beat_value: 4});
    voice.addTickables(notes2);
    formatter = new VF.Formatter().joinVoices([voice]).format([voice], measureWidth);
    voice.draw(contextRef.current, stave2)

    voice = new VF.Voice({num_beats: 4,  beat_value: 4});
    voice.addTickables(notes3);
    formatter = new VF.Formatter().joinVoices([voice]).format([voice], measureWidth);
    voice.draw(contextRef2.current, stave3)

    voice = new VF.Voice({num_beats: 2,  beat_value: 4});
    voice.addTickables(notes4);
    formatter = new VF.Formatter().joinVoices([voice]).format([voice], measureWidth*0.9/2);
    voice.draw(contextRef2.current, stave4)
  }

  return (
    <div style={styles.staffWrapper}>
      <div id="music-canvas" style={styles.canvasStyle}></div>
      <div id="music-canvas2" style={styles.canvasStyle2}></div>
    </div>
  )
}

const styles = {
  staffWrapper: {
    // backgroundColor: 'red',
    alignSelf: 'stretch',
    flex: 3,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
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
    currentNote: state.currentNote.current,
    currentKey: state.settings.key,
    currentCategory: state.settings.category,
    scale: state.settings.scale,
    keyNotes: state.settings.keyNotes,
    scaleIndex: state.settings.scaleIndex,
    accidentals: state.settings.accidentals,
    scaleType: state.settings.scaleType
  }
}

export default connect(mapStateToProps, null)(MusicNotation)
