import React, { useRef, useEffect, useState } from 'react'
import Vex from 'vexflow'
import { connect } from 'react-redux'
import useWindowDimensions from '../../hooks/useWindowDimensions.js'

const MusicNotation = ({ currentNote, currentKey, scale, currentCategory,
                         keyNotes, scaleIndex, accidentals, scaleType,
                         repeatTopNote, scaleShape }) => {
  const [VF] = useState(Vex.Flow)
  const rendererRefs = useRef([])
  const contextRefs = useRef([])
  const { width } = useWindowDimensions();

  // constants
  const factor = width < 800 ? 0.65 : 1
  const measureWidth = 160
  const accidentalWidth = accidentals ?
                            (currentCategory === 'sharps' ? (10 + 11*accidentals)*1.1 : (10 + 8*accidentals)*1.12)
                            : 0
  const trebleKeyWidth = 60
  const trebleWidth = 30
  const timeSignatureWidth = 30
  // const canvasWidth = (accidentalWidth + trebleKeyWidth + measureWidth*2)*1.1
  const canvasWidth = 445

  useEffect(() => {
    // for (let i = 0; i < rendererRefs.current.length; i++){
    //   const div = document.getElementById(`music-canvas${i+1}`)
    //   div.innerHTML = ''
    //   div.innerText = ''
    // }
    // rendererRefs.current = []
    // contextRefs.current = []

    for (let i = 0; i <= 1; i++){
      const div = document.getElementById(`music-canvas${i+1}`)
      rendererRefs.current.push(new VF.Renderer(div, VF.Renderer.Backends.SVG))
      contextRefs.current.push(rendererRefs.current[i].getContext())
      contextRefs.current[i].scale(factor, factor)
      rendererRefs.current[i].resize(canvasWidth*factor, 120*factor)
    }
  }, [])

  useEffect(() => {
    if (currentKey) {
      // erase svg canvases
      rendererRefs.current.forEach((rendererRef, i) => {
        if (contextRefs.current[i].svg.firstChild) contextRefs.current[i].svg.innerHTML = ''
        // canvasWidth currently changes based on the size of the key signature
        if (rendererRef) rendererRef.resize(canvasWidth*factor, 120*factor)
      })
      renderKey()
    }
     // eslint-disable-next-line
  }, [currentKey, scaleIndex, scaleType, scaleShape, scale, repeatTopNote])


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

      if (index === ((scaleIndex-1)%scale.length)) myNote.setStyle({fillStyle: "rgb(48, 140, 223)", strokeStyle: "rgb(48, 140, 223)"});

      return myNote
    })
  }

  const renderKey = () => {
    const keySignature = `${currentKey}${scaleType.includes('minor') ? 'm' :''}`
    const currentNoteIndex = scaleIndex === 0 ? 0 : (scaleIndex-1) % (scale.length)
    const pageNumber = Math.floor(currentNoteIndex / 16)
    const totalPages = Math.ceil(scale.length / 16)
    const lastPage = pageNumber+1 === totalPages
    const notesArray = generateNotes().slice(pageNumber*16, pageNumber*16 + 16)

    for (let i=0; i<=1; i++){
      // generate variables
      const context = contextRefs.current[i]
      const notes = notesArray.slice(0 + 8*i, 8+8*i)
      const notesWidth = (canvasWidth - accidentalWidth - trebleWidth)*(notes.length/8)
      const staveWidth = notes.length === 8
        ? canvasWidth - 5
        : notesWidth + accidentalWidth + trebleWidth

      if (notes.length > 0){
        const lastMeasure = Math.floor((notesArray.length-1) / 8) === i && lastPage ? true : false
        const stave = new VF.Stave(0, 0, staveWidth)
        stave.addClef("treble").addKeySignature(keySignature)
        if (lastMeasure) stave.setEndBarType(VF.Barline.type.REPEAT_END)

        // build and draw the notes
        const voice = new VF.Voice({num_beats: notes.length,  beat_value: 4});
        voice.addTickables(notes);
        const formatter = new VF.Formatter().joinVoices([voice]).format([voice], notesWidth);
        stave.setContext(context).draw()
        voice.draw(context, stave)
      }
    }
  }

  return (
    <div style={styles.staffWrapper}>
      <div id="music-canvas1" style={styles.canvasStyle}></div>
      <div id="music-canvas2" style={styles.canvasStyle}></div>
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
