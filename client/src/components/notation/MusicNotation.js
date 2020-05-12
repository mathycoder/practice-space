import React, { useRef, useEffect, useState } from 'react'
import Vex from 'vexflow'
import { connect } from 'react-redux'
import useWindowDimensions from '../../hooks/useWindowDimensions.js'

const MusicNotation = ({ currentNote, currentKey, scale, currentCategory,
                         keyNotes, scaleIndex, accidentals, scaleType,
                         repeatTopNote, scaleShape }) => {
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
  const canvasWidth = (accidentalWidth + trebleKeyWidth + measureWidth*2)*1.1
  // const canvasWidth = 500

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
    rendererRef2.current.resize(canvasWidth*factor, 120*factor)
     // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (currentKey) {
      // erase svg canvases
      if (contextRef.current.svg.firstChild) contextRef.current.svg.innerHTML = ''
      if (contextRef2.current.svg.firstChild) contextRef2.current.svg.innerHTML = ''
      rendererRef.current.resize(canvasWidth*factor, 120*factor)
      rendererRef2.current.resize(canvasWidth*factor, 120*factor)
      renderKey()
    }
     // eslint-disable-next-line
  }, [currentKey, currentNote, scaleType, scaleShape, repeatTopNote])


  const generateNotes = () => {
    return scale.map((el, index) => {
      let currentNote = keyNotes[el]
      let accidental = null

      if (el === 6 && scaleType === 'harm. minor'){
        let letter = currentNote.split("/")[0]
        let octave = currentNote.slice(-1)
        if (currentCategory === 'flats' && letter.length === 1){
          accidental = 'n'
        } else if (currentCategory === 'sharps' && letter[1] === '#'){
          accidental = '#'
        } else {
          accidental = '##'
          currentNote = `${letter[0]}/${octave}`
        }
      }

      const myNote = !accidental
        ? new VF.StaveNote({clef: "treble", keys: [currentNote], duration: '4'})
        : new VF.StaveNote({clef: "treble", keys: [currentNote], duration: '4'}).
            addAccidental(0, new VF.Accidental(accidental))

      if (index === (scaleIndex%scale.length)) myNote.setStyle({fillStyle: "rgb(48, 140, 223)", strokeStyle: "rgb(48, 140, 223)"});

      return myNote
    })
  }

  const calculateStaveWidth = (i, notes) => {
    return i === 0
      ? measureWidth*(notes.length/4) + accidentalWidth + trebleWidth + timeSignatureWidth
      : i % 2 === 0
        ? measureWidth*(notes.length/4) + accidentalWidth + trebleWidth
        : measureWidth*(notes.length/4)
  }

  const calculateStaveOffsetX = i => {
    return i === 1
      ? measureWidth + accidentalWidth + trebleWidth + timeSignatureWidth
      : i % 2 === 1
        ? measureWidth + accidentalWidth + trebleWidth
        : 0
  }

  const renderKey = () => {
    const keySignature = `${currentKey}${scaleType.includes('minor') ? 'm' :''}`
    const notesArray = generateNotes()

    for (let i=0; 4*i < notesArray.length; i++){
      // generate variables
      const context = (i / 2 < 1) ? contextRef : contextRef2
      const notes = notesArray.slice(0 + 4*i, 4+4*i)
      const lastMeasure = (i+1)*4 >= notesArray.length ? true : false
      let staveWidth = calculateStaveWidth(i, notes)
      if (lastMeasure) staveWidth *= 1.1
      const staveOffsetX = calculateStaveOffsetX(i)

      // build and draw the stave/measure
      const stave = new VF.Stave(staveOffsetX, 0, staveWidth)
      if (i % 2 === 0) stave.addClef("treble").addKeySignature(keySignature)
      if (i === 0) stave.addTimeSignature("4/4")
      if (lastMeasure) stave.setEndBarType(VF.Barline.type.REPEAT_END)

      // build and draw the notes
      const voice = new VF.Voice({num_beats: notes.length,  beat_value: 4});
      voice.addTickables(notes);
      const formatter = new VF.Formatter().joinVoices([voice]).format([voice], measureWidth*(notes.length/4))
      stave.setContext(context.current).draw()
      voice.draw(context.current, stave)
    }
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
    scaleType: state.settings.scaleType,
    scaleShape: state.settings.scaleShape,
    repeatTopNote: state.settings.repeatTopNote
  }
}

export default connect(mapStateToProps, null)(MusicNotation)
