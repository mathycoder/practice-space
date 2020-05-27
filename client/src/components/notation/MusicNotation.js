import React, { useRef, useEffect, useState } from 'react'
import Vex from 'vexflow'
import { connect } from 'react-redux'
import useWindowDimensions from '../../hooks/useWindowDimensions.js'

const MusicNotation = ({ currentNote, currentKey, scale, currentCategory,
                         keyNotes, scaleIndex, accidentals, scaleType,
                         repeatTopNote, scaleShape, scaleRepetition }) => {
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
  const canvasWidth = 450

  useEffect(() => {
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


  const scaleAscending = index => {
    const multiplier = scaleRepetition.includes('4')
      ? 4
      : scaleRepetition.includes('3')
        ? 3
        : scaleRepetition.includes('2')
          ? 2
          : 1
    return index === 0 || scale[index] - scale[index-1*multiplier] > 0
  }

  const generateNotes = () => {
    const noteType = scaleRepetition === 'All 2x' || scaleRepetition === 'All 3x'
      ? 8
      : scaleRepetition === 'All 4x'
        ? 16 : 4

    return scale.map((el, index) => {
      let currentNote = keyNotes[el]
      let accidental = null

      // adds accidentals to chromatic key

      if (scaleType === 'chromatic') {
        currentNote = !scaleAscending(index) && currentNote.length > 1
          ? currentNote[1]
          : currentNote[0]
        let letter = currentNote.split("/")[0]
        let octave = currentNote.slice(-1)
        if (letter.length === 2){
          if (letter[1] === '#'){
            if (index === 0 || scale[index-1] !== scale[index]) accidental = '#'
          } else {
            if (index === 0 || scale[index-1] !== scale[index]) accidental = 'b'
          }
        } else {
          accidental = 'n'
        }
      }

      // adds accidental to 7th scale tone of harm. minor
      if (el === 11 && scaleType === 'harm. minor'){
        let letter = currentNote.split("/")[0]
        let octave = currentNote.slice(-1)
        if (currentCategory === 'flats' && letter.length === 1){
          if (scale[index-1] !== 11) accidental = 'n'
        } else if (currentCategory === 'sharps' && letter[1] === '#'){
          if (scale[index-1] !== 11) accidental = '#'
        } else {
          if (scale[index-1] !== 11) accidental = '##'
          currentNote = `${letter[0]}/${octave}`
        }
      }

      const myNote = !accidental
        ? new VF.StaveNote({clef: "treble", keys: [currentNote], duration: `${noteType}`})
        : new VF.StaveNote({clef: "treble", keys: [currentNote], duration: `${noteType}`}).
            addAccidental(0, new VF.Accidental(accidental))

      if (index === ((scaleIndex-1)%scale.length)) myNote.setStyle({fillStyle: "rgb(48, 140, 223)", strokeStyle: "rgb(48, 140, 223)"});

      return myNote
    })
  }

  const renderKey = () => {
    const keySignature = scaleType !== 'chromatic'
      ? `${currentKey}${scaleType.includes('minor') ? 'm' :''}`
      : 'C'
    const notesPerMeasure = scaleRepetition === 'All 2x'
      ? 16
      : scaleRepetition === 'All 4x'
        ? 16
        : scaleRepetition === 'All 3x'
          ? 12
          : 8
    const notesPerPage = notesPerMeasure*2
    const currentNoteIndex = scaleIndex === 0 ? 0 : (scaleIndex-1) % scale.length
    const pageNumber = Math.floor(currentNoteIndex / notesPerPage)
    const totalPages = Math.ceil(scale.length / notesPerPage)
    const lastPage = pageNumber+1 === totalPages
    const notesArray = generateNotes().slice(pageNumber*notesPerPage, (pageNumber+1)*notesPerPage)

    for (let i=0; i<=1; i++){
      // generate variables
      const context = contextRefs.current[i]
      const notes = notesArray.slice(0 + notesPerMeasure*i, notesPerMeasure*(1+i))
      const notesWidth = (canvasWidth - accidentalWidth - trebleWidth - (notesPerMeasure-8))*(notes.length/notesPerMeasure)
      const staveWidth = notes.length === notesPerMeasure
        ? canvasWidth - 5
        : notesWidth + accidentalWidth + trebleWidth + (notesPerMeasure-8)
      const triplets = []

      if (notes.length > 0){
        const lastMeasure = Math.floor((notesArray.length-1) / notesPerMeasure) === i && lastPage ? true : false
        const stave = new VF.Stave(0, 0, staveWidth)
        stave.addClef("treble").addKeySignature(keySignature)
        if (lastMeasure) stave.setEndBarType(VF.Barline.type.REPEAT_END)

        // build and draw triplets
        if (scaleRepetition === 'All 3x'){
          for (let i=0; i < notes.length/3; i++){
            const eighthNoteTriplet = new VF.Tuplet(notes.slice(3*i,3*(i+1)), {
              num_notes: 3, notes_occupied: 2, location: 1
            });
            triplets.push(eighthNoteTriplet)
          }
        }

        // beatValue formats VF.voice
        const beatValue = scaleRepetition === 'All 2x'
          ? 8
          : scaleRepetition === 'All 4x'
            ? 16
            : scaleRepetition === 'All 3x'
              ? 12
              : 4

        // build and draw triplets
        const voice = new VF.Voice({num_beats: notes.length,  beat_value: beatValue});
        voice.addTickables(notes);
        const beams = VF.Beam.generateBeams(notes,
          {
            stem_direction: 1,
            groups: [new VF.Fraction(2, 8)]
          })
        {
        const formatter = new VF.Formatter().joinVoices([voice]).format([voice], notesWidth);
        stave.setContext(context).draw()
        voice.draw(context, stave)

        triplets.forEach((tuplet, index) => {
          tuplet.setContext(context).draw();
        });
}

        beams.forEach(function(beam) {
          beam.setContext(context).draw();
        })
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
    backgroundColor: 'white',
    flex: 3,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '3px',
    height: '100%'
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
    scaleRepetition: state.settings.scaleRepetition,
    repeatTopNote: state.settings.repeatTopNote
  }
}

export default connect(mapStateToProps, null)(MusicNotation)
